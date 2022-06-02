import { cloneDeep, upperFirst } from 'lodash';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  DataFrame,
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  LoadingState,
  ScopedVars,
} from '@grafana/data';
import { getTemplateSrv, TemplateSrv } from 'app/features/templating/template_srv';

import AzureLogAnalyticsDatasource from './azure_log_analytics/azure_log_analytics_datasource';
import AzureMonitorDatasource from './azure_monitor/azure_monitor_datasource';
import AzureResourceGraphDatasource from './azure_resource_graph/azure_resource_graph_datasource';
import AppInsightsDatasource from './components/deprecated/app_insights/app_insights_datasource';
import InsightsAnalyticsDatasource from './components/deprecated/insights_analytics/insights_analytics_datasource';
import { getAzureCloud } from './credentials';
import ResourcePickerData from './resourcePicker/resourcePickerData';
import {
  AzureDataSourceJsonData,
  AzureMonitorQuery,
  AzureQueryType,
  DatasourceValidationResult,
  DeprecatedAzureQueryType,
} from './types';
import migrateAnnotation from './utils/migrateAnnotation';
import { datasourceMigrations } from './utils/migrateQuery';
import { VariableSupport } from './variables';

export default class Datasource extends DataSourceApi<AzureMonitorQuery, AzureDataSourceJsonData> {
  annotations = {
    prepareAnnotation: migrateAnnotation,
  };

  azureMonitorDatasource: AzureMonitorDatasource;
  azureLogAnalyticsDatasource: AzureLogAnalyticsDatasource;
  resourcePickerData: ResourcePickerData;
  azureResourceGraphDatasource: AzureResourceGraphDatasource;
  /** @deprecated */
  appInsightsDatasource?: AppInsightsDatasource;
  /** @deprecated */
  insightsAnalyticsDatasource?: InsightsAnalyticsDatasource;

  pseudoDatasource: {
    [key in AzureQueryType | DeprecatedAzureQueryType]?:
      | AzureMonitorDatasource
      | AzureLogAnalyticsDatasource
      | AzureResourceGraphDatasource
      | AppInsightsDatasource
      | InsightsAnalyticsDatasource;
  } = {};

  declare optionsKey: Record<AzureQueryType, string>;

  constructor(
    instanceSettings: DataSourceInstanceSettings<AzureDataSourceJsonData>,
    private readonly templateSrv: TemplateSrv = getTemplateSrv()
  ) {
    super(instanceSettings);
    this.azureMonitorDatasource = new AzureMonitorDatasource(instanceSettings);
    this.azureLogAnalyticsDatasource = new AzureLogAnalyticsDatasource(instanceSettings);
    this.azureResourceGraphDatasource = new AzureResourceGraphDatasource(instanceSettings);
    this.resourcePickerData = new ResourcePickerData(instanceSettings);

    this.pseudoDatasource = {
      [AzureQueryType.AzureMonitor]: this.azureMonitorDatasource,
      [AzureQueryType.LogAnalytics]: this.azureLogAnalyticsDatasource,
      [AzureQueryType.AzureResourceGraph]: this.azureResourceGraphDatasource,
    };

    const cloud = getAzureCloud(instanceSettings);
    if (cloud === 'azuremonitor' || cloud === 'chinaazuremonitor') {
      // AppInsights and InsightAnalytics are only supported for Public and Azure China clouds
      this.appInsightsDatasource = new AppInsightsDatasource(instanceSettings);
      this.insightsAnalyticsDatasource = new InsightsAnalyticsDatasource(instanceSettings);
      this.pseudoDatasource[DeprecatedAzureQueryType.ApplicationInsights] = this.appInsightsDatasource;
      this.pseudoDatasource[DeprecatedAzureQueryType.InsightsAnalytics] = this.insightsAnalyticsDatasource;
    }

    this.variables = new VariableSupport(this);
  }

  filterQuery(item: AzureMonitorQuery): boolean {
    if (!item.queryType) {
      return true;
    }
    const ds = this.pseudoDatasource[item.queryType];
    return ds?.filterQuery?.(item) ?? true;
  }

  query(options: DataQueryRequest<AzureMonitorQuery>): Observable<DataQueryResponse> {
    const byType = new Map<AzureQueryType | DeprecatedAzureQueryType, DataQueryRequest<AzureMonitorQuery>>();

    for (const baseTarget of options.targets) {
      // Migrate old query structures
      const target = datasourceMigrations(baseTarget);

      // Skip hidden or invalid queries or ones without properties
      if (!target.queryType || target.hide || !hasQueryForType(target)) {
        continue;
      }

      // Initialize the list of queries
      if (!byType.has(target.queryType)) {
        const queryForType = cloneDeep(options);
        queryForType.requestId = `${queryForType.requestId}-${target.refId}`;
        queryForType.targets = [];
        byType.set(target.queryType, queryForType);
      }

      const queryForType = byType.get(target.queryType);
      queryForType?.targets.push(target);
    }

    const observables: Array<Observable<DataQueryResponse>> = Array.from(byType.entries()).map(([queryType, req]) => {
      const ds = this.pseudoDatasource[queryType];
      if (!ds) {
        throw new Error('Data source not created for query type ' + queryType);
      }

      return ds.query(req);
    });

    // Single query can skip merge
    if (observables.length === 1) {
      return observables[0];
    }

    if (observables.length > 1) {
      return forkJoin(observables).pipe(
        map((results: DataQueryResponse[]) => {
          const data: DataFrame[] = [];
          for (const result of results) {
            for (const frame of result.data) {
              data.push(frame);
            }
          }

          return { state: LoadingState.Done, data };
        })
      );
    }

    return of({ state: LoadingState.Done, data: [] });
  }

  targetContainsTemplate(query: AzureMonitorQuery) {
    if (query.subscription && this.templateSrv.containsTemplate(query.subscription)) {
      return true;
    }

    let subQuery;
    if (query.queryType === AzureQueryType.AzureMonitor) {
      subQuery = JSON.stringify(query.azureMonitor);
    } else if (query.queryType === AzureQueryType.LogAnalytics) {
      subQuery = JSON.stringify(query.azureLogAnalytics);
    } else if (query.queryType === AzureQueryType.AzureResourceGraph) {
      subQuery = JSON.stringify([query.azureResourceGraph, query.subscriptions]);
    }

    return !!subQuery && this.templateSrv.containsTemplate(subQuery);
  }

  async annotationQuery(options: any) {
    return this.azureLogAnalyticsDatasource.annotationQuery(options);
  }

  async testDatasource(): Promise<DatasourceValidationResult> {
    const promises: Array<Promise<DatasourceValidationResult>> = [];

    promises.push(this.azureMonitorDatasource.testDatasource());
    promises.push(this.azureLogAnalyticsDatasource.testDatasource());

    if (this.appInsightsDatasource?.isConfigured()) {
      promises.push(this.appInsightsDatasource.testDatasource());
    }

    return await Promise.all(promises).then((results) => {
      let status: 'success' | 'error' = 'success';
      let message = '';

      for (let i = 0; i < results.length; i++) {
        if (results[i].status !== 'success') {
          status = results[i].status;
        }
        message += `${i + 1}. ${results[i].message} `;
      }

      return {
        status: status,
        message: message,
        title: upperFirst(status),
      };
    });
  }

  /* Azure Monitor REST API methods */
  getResourceGroups(subscriptionId: string) {
    return this.azureMonitorDatasource.getResourceGroups(this.replaceTemplateVariable(subscriptionId));
  }

  getMetricDefinitions(subscriptionId: string, resourceGroup: string) {
    return this.azureMonitorDatasource.getMetricDefinitions(
      this.replaceTemplateVariable(subscriptionId),
      this.replaceTemplateVariable(resourceGroup)
    );
  }

  getResourceNames(subscriptionId: string, resourceGroup: string, metricDefinition: string) {
    return this.azureMonitorDatasource.getResourceNames(
      this.replaceTemplateVariable(subscriptionId),
      this.replaceTemplateVariable(resourceGroup),
      this.replaceTemplateVariable(metricDefinition)
    );
  }

  getMetricNames(
    subscriptionId: string,
    resourceGroup: string,
    metricDefinition: string,
    resourceName: string,
    metricNamespace: string
  ) {
    return this.azureMonitorDatasource.getMetricNames(
      this.replaceTemplateVariable(subscriptionId),
      this.replaceTemplateVariable(resourceGroup),
      this.replaceTemplateVariable(metricDefinition),
      this.replaceTemplateVariable(resourceName),
      this.replaceTemplateVariable(metricNamespace)
    );
  }

  getMetricNamespaces(subscriptionId: string, resourceGroup: string, metricDefinition: string, resourceName: string) {
    return this.azureMonitorDatasource.getMetricNamespaces(
      this.replaceTemplateVariable(subscriptionId),
      this.replaceTemplateVariable(resourceGroup),
      this.replaceTemplateVariable(metricDefinition),
      this.replaceTemplateVariable(resourceName)
    );
  }

  getMetricMetadata(
    subscriptionId: string,
    resourceGroup: string,
    metricDefinition: string,
    resourceName: string,
    metricNamespace: string,
    metricName: string
  ) {
    return this.azureMonitorDatasource.getMetricMetadata(
      this.replaceTemplateVariable(subscriptionId),
      this.replaceTemplateVariable(resourceGroup),
      this.replaceTemplateVariable(metricDefinition),
      this.replaceTemplateVariable(resourceName),
      this.replaceTemplateVariable(metricNamespace),
      this.replaceTemplateVariable(metricName)
    );
  }

  /* Application Insights API method */
  getAppInsightsMetricNames() {
    return this.appInsightsDatasource?.getMetricNames();
  }

  getAppInsightsMetricMetadata(metricName: string) {
    return this.appInsightsDatasource?.getMetricMetadata(metricName);
  }

  getAppInsightsColumns(refId: string | number) {
    return this.appInsightsDatasource?.logAnalyticsColumns[refId];
  }

  /*Azure Log Analytics */
  getAzureLogAnalyticsWorkspaces(subscriptionId: string) {
    return this.azureLogAnalyticsDatasource.getWorkspaces(subscriptionId);
  }

  getSubscriptions() {
    return this.azureMonitorDatasource.getSubscriptions();
  }

  interpolateVariablesInQueries(queries: AzureMonitorQuery[], scopedVars: ScopedVars): AzureMonitorQuery[] {
    const mapped = queries.map((query) => {
      if (!query.queryType) {
        return query;
      }

      const ds = this.pseudoDatasource[query.queryType];
      return ds?.applyTemplateVariables(query, scopedVars) ?? query;
    });

    return mapped;
  }

  replaceTemplateVariable(variable: string) {
    return this.templateSrv.replace(variable);
  }

  getVariables() {
    return this.templateSrv.getVariables().map((v) => `$${v.name}`);
  }

  isTemplateVariable(value: string) {
    return this.getVariables().includes(value);
  }
}

function hasQueryForType(query: AzureMonitorQuery): boolean {
  switch (query.queryType) {
    case AzureQueryType.AzureMonitor:
      return !!query.azureMonitor;

    case AzureQueryType.LogAnalytics:
      return !!query.azureLogAnalytics;

    case AzureQueryType.AzureResourceGraph:
      return !!query.azureResourceGraph;

    case AzureQueryType.GrafanaTemplateVariableFn:
      return !!query.grafanaTemplateVariableFn;

    case DeprecatedAzureQueryType.ApplicationInsights:
      return !!query.appInsights;

    case DeprecatedAzureQueryType.InsightsAnalytics:
      return !!query.insightsAnalytics;

    default:
      return false;
  }
}
