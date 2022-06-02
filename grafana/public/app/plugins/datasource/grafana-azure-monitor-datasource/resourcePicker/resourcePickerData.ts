import { DataSourceWithBackend } from '@grafana/runtime';

import { DataSourceInstanceSettings } from '../../../../../../packages/grafana-data/src';
import {
  locationDisplayNames,
  logsSupportedLocationsKusto,
  logsSupportedResourceTypesKusto,
  resourceTypeDisplayNames,
} from '../azureMetadata';
import { ResourceRowGroup, ResourceRowType } from '../components/ResourcePicker/types';
import { parseResourceURI } from '../components/ResourcePicker/utils';
import {
  AzureDataSourceJsonData,
  AzureGraphResponse,
  AzureMonitorQuery,
  AzureResourceGraphOptions,
  AzureResourceSummaryItem,
  RawAzureResourceGroupItem,
  RawAzureResourceItem,
  RawAzureSubscriptionItem,
} from '../types';
import { routeNames } from '../utils/common';

const RESOURCE_GRAPH_URL = '/providers/Microsoft.ResourceGraph/resources?api-version=2021-03-01';

export default class ResourcePickerData extends DataSourceWithBackend<AzureMonitorQuery, AzureDataSourceJsonData> {
  private resourcePath: string;

  constructor(instanceSettings: DataSourceInstanceSettings<AzureDataSourceJsonData>) {
    super(instanceSettings);
    this.resourcePath = `${routeNames.resourceGraph}`;
  }

  async getSubscriptions(): Promise<ResourceRowGroup> {
    const query = `
    resources
    | join kind=inner (
              ResourceContainers
                | where type == 'microsoft.resources/subscriptions'
                | project subscriptionName=name, subscriptionURI=id, subscriptionId
              ) on subscriptionId
    | summarize count() by subscriptionName, subscriptionURI, subscriptionId
    | order by subscriptionName desc
  `;

    let resources: RawAzureSubscriptionItem[] = [];

    let allFetched = false;
    let $skipToken = undefined;
    while (!allFetched) {
      // The response may include several pages
      let options: Partial<AzureResourceGraphOptions> = {};
      if ($skipToken) {
        options = {
          $skipToken,
        };
      }
      const resourceResponse = await this.makeResourceGraphRequest<RawAzureSubscriptionItem[]>(query, 1, options);
      if (!resourceResponse.data.length) {
        throw new Error('No subscriptions were found');
      }
      resources = resources.concat(resourceResponse.data);
      $skipToken = resourceResponse.$skipToken;
      allFetched = !$skipToken;
    }

    return resources.map((subscription) => ({
      name: subscription.subscriptionName,
      id: subscription.subscriptionId,
      uri: `/subscriptions/${subscription.subscriptionId}`,
      typeLabel: 'Subscription',
      type: ResourceRowType.Subscription,
      children: [],
    }));
  }

  async getResourceGroupsBySubscriptionId(subscriptionId: string): Promise<ResourceRowGroup> {
    const query = `
    resources
     | join kind=inner (
       ResourceContainers
       | where type == 'microsoft.resources/subscriptions/resourcegroups'
       | project resourceGroupURI=id, resourceGroupName=name, resourceGroup, subscriptionId
     ) on resourceGroup, subscriptionId

     | where type in (${logsSupportedResourceTypesKusto})
     | where subscriptionId == '${subscriptionId}'
     | summarize count() by resourceGroupName, resourceGroupURI
     | order by resourceGroupURI asc`;

    let resourceGroups: RawAzureResourceGroupItem[] = [];
    let allFetched = false;
    let $skipToken = undefined;
    while (!allFetched) {
      // The response may include several pages
      let options: Partial<AzureResourceGraphOptions> = {};
      if ($skipToken) {
        options = {
          $skipToken,
        };
      }
      const resourceResponse = await this.makeResourceGraphRequest<RawAzureResourceGroupItem[]>(query, 1, options);
      resourceGroups = resourceGroups.concat(resourceResponse.data);
      $skipToken = resourceResponse.$skipToken;
      allFetched = !$skipToken;
    }

    return resourceGroups.map((r) => {
      const parsedUri = parseResourceURI(r.resourceGroupURI);
      if (!parsedUri || !parsedUri.resourceGroup) {
        throw new Error('unable to fetch resource groups');
      }
      return {
        name: r.resourceGroupName,
        uri: r.resourceGroupURI,
        id: parsedUri.resourceGroup,
        type: ResourceRowType.ResourceGroup,
        typeLabel: 'Resource Group',
        children: [],
      };
    });
  }

  async getResourcesForResourceGroup(resourceGroupId: string): Promise<ResourceRowGroup> {
    const { data: response } = await this.makeResourceGraphRequest<RawAzureResourceItem[]>(`
      resources
      | where id hasprefix "${resourceGroupId}"
      | where type in (${logsSupportedResourceTypesKusto}) and location in (${logsSupportedLocationsKusto})
    `);

    return response.map((item) => {
      const parsedUri = parseResourceURI(item.id);
      if (!parsedUri || !parsedUri.resource) {
        throw new Error('unable to fetch resource details');
      }
      return {
        name: item.name,
        id: parsedUri.resource,
        uri: item.id,
        resourceGroupName: item.resourceGroup,
        type: ResourceRowType.Resource,
        typeLabel: resourceTypeDisplayNames[item.type] || item.type,
        location: locationDisplayNames[item.location] || item.location,
      };
    });
  }

  // used to make the select resource button that launches the resource picker show a nicer file path to users
  async getResourceURIDisplayProperties(resourceURI: string): Promise<AzureResourceSummaryItem> {
    const { subscriptionID, resourceGroup, resource } = parseResourceURI(resourceURI) ?? {};

    if (!subscriptionID) {
      throw new Error('Invalid resource URI passed');
    }

    // resourceGroupURI and resourceURI could be invalid values, but that's okay because the join
    // will just silently fail as expected
    const subscriptionURI = `/subscriptions/${subscriptionID}`;
    const resourceGroupURI = `${subscriptionURI}/resourceGroups/${resourceGroup}`;

    const query = `
    resourcecontainers
    | where type == "microsoft.resources/subscriptions"
    | where id =~ "${subscriptionURI}"
    | project subscriptionName=name, subscriptionId

    | join kind=leftouter (
      resourcecontainers            
            | where type == "microsoft.resources/subscriptions/resourcegroups"
            | where id =~ "${resourceGroupURI}"
            | project resourceGroupName=name, resourceGroup, subscriptionId
        ) on subscriptionId

        | join kind=leftouter (
          resources
            | where id =~ "${resourceURI}"
            | project resourceName=name, subscriptionId
        ) on subscriptionId

        | project subscriptionName, resourceGroupName, resourceName
    `;

    const { data: response } = await this.makeResourceGraphRequest<AzureResourceSummaryItem[]>(query);

    if (!response.length) {
      throw new Error('unable to fetch resource details');
    }

    const { subscriptionName, resourceGroupName, resourceName } = response[0];
    // if the name is undefined it could be because the id is undefined or because we are using a template variable.
    // Either way we can use it as a fallback. We don't really want to interpolate these variables because we want
    // to show the user when they are using template variables `$sub/$rg/$resource`
    return {
      subscriptionName: subscriptionName || subscriptionID,
      resourceGroupName: resourceGroupName || resourceGroup,
      resourceName: resourceName || resource,
    };
  }

  async getResourceURIFromWorkspace(workspace: string) {
    const { data: response } = await this.makeResourceGraphRequest<RawAzureResourceItem[]>(`
      resources
      | where properties['customerId'] == "${workspace}"
      | project id
    `);

    if (!response.length) {
      throw new Error('unable to find resource for workspace ' + workspace);
    }

    return response[0].id;
  }

  async makeResourceGraphRequest<T = unknown>(
    query: string,
    maxRetries = 1,
    reqOptions?: Partial<AzureResourceGraphOptions>
  ): Promise<AzureGraphResponse<T>> {
    try {
      return await this.postResource(this.resourcePath + RESOURCE_GRAPH_URL, {
        query: query,
        options: {
          resultFormat: 'objectArray',
          ...reqOptions,
        },
      });
    } catch (error) {
      if (maxRetries > 0) {
        return this.makeResourceGraphRequest(query, maxRetries - 1);
      }

      throw error;
    }
  }
}
