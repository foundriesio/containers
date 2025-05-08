import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { IconName } from '@grafana/ui';
import EmptyListCTA from 'app/core/components/EmptyListCTA/EmptyListCTA';
import Page from 'app/core/components/Page/Page';
import PageActionBar from 'app/core/components/PageActionBar/PageActionBar';
import { contextSrv } from 'app/core/core';
import { getNavModel } from 'app/core/selectors/navModel';
import { StoreState, AccessControlAction } from 'app/types';

import DataSourcesList from './DataSourcesList';
import { loadDataSources } from './state/actions';
import { setDataSourcesLayoutMode, setDataSourcesSearchQuery } from './state/reducers';
import {
  getDataSources,
  getDataSourcesCount,
  getDataSourcesLayoutMode,
  getDataSourcesSearchQuery,
} from './state/selectors';

function mapStateToProps(state: StoreState) {
  return {
    navModel: getNavModel(state.navIndex, 'datasources'),
    dataSources: getDataSources(state.dataSources),
    layoutMode: getDataSourcesLayoutMode(state.dataSources),
    dataSourcesCount: getDataSourcesCount(state.dataSources),
    searchQuery: getDataSourcesSearchQuery(state.dataSources),
    hasFetched: state.dataSources.hasFetched,
  };
}

const mapDispatchToProps = {
  loadDataSources,
  setDataSourcesSearchQuery,
  setDataSourcesLayoutMode,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type Props = ConnectedProps<typeof connector>;

const emptyListModel = {
  title: 'No data sources defined',
  buttonIcon: 'database' as IconName,
  buttonLink: 'datasources/new',
  buttonTitle: 'Add data source',
  proTip: 'You can also define data sources through configuration files.',
  proTipLink: 'http://docs.grafana.org/administration/provisioning/#datasources?utm_source=grafana_ds_list',
  proTipLinkTitle: 'Learn more',
  proTipTarget: '_blank',
};

export class DataSourcesListPage extends PureComponent<Props> {
  componentDidMount() {
    this.props.loadDataSources();
  }

  render() {
    const { dataSources, dataSourcesCount, navModel, layoutMode, searchQuery, setDataSourcesSearchQuery, hasFetched } =
      this.props;

    const canCreateDataSource =
      contextSrv.hasPermission(AccessControlAction.DataSourcesCreate) &&
      contextSrv.hasPermission(AccessControlAction.DataSourcesWrite);

    const linkButton = {
      href: 'datasources/new',
      title: 'Add data source',
      disabled: !canCreateDataSource,
    };

    const emptyList = {
      ...emptyListModel,
      buttonDisabled: !canCreateDataSource,
    };

    return (
      <Page navModel={navModel}>
        <Page.Contents isLoading={!hasFetched}>
          <>
            {hasFetched && dataSourcesCount === 0 && <EmptyListCTA {...emptyList} />}
            {hasFetched &&
              dataSourcesCount > 0 && [
                <PageActionBar
                  searchQuery={searchQuery}
                  setSearchQuery={(query) => setDataSourcesSearchQuery(query)}
                  linkButton={linkButton}
                  key="action-bar"
                />,
                <DataSourcesList dataSources={dataSources} layoutMode={layoutMode} key="list" />,
              ]}
          </>
        </Page.Contents>
      </Page>
    );
  }
}

export default connector(DataSourcesListPage);
