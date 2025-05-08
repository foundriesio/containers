import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

// Utils
import { rangeUtil } from '@grafana/data';
import { InlineField, InlineSwitch, VerticalGroup } from '@grafana/ui';
import appEvents from 'app/core/app_events';
import EmptyListCTA from 'app/core/components/EmptyListCTA/EmptyListCTA';
import Page from 'app/core/components/Page/Page';
import config from 'app/core/config';
import { contextSrv } from 'app/core/core';
import { getNavModel } from 'app/core/selectors/navModel';
import { getTimeZone } from 'app/features/profile/state/selectors';
import { AccessControlAction, ApiKey, NewApiKey, StoreState } from 'app/types';
import { ShowModalReactEvent } from 'app/types/events';

import { ApiKeysActionBar } from './ApiKeysActionBar';
import { ApiKeysAddedModal } from './ApiKeysAddedModal';
import { ApiKeysController } from './ApiKeysController';
import { ApiKeysForm } from './ApiKeysForm';
import { ApiKeysTable } from './ApiKeysTable';
import { addApiKey, deleteApiKey, loadApiKeys, toggleIncludeExpired } from './state/actions';
import { setSearchQuery } from './state/reducers';
import { getApiKeys, getApiKeysCount, getIncludeExpired, getIncludeExpiredDisabled } from './state/selectors';

function mapStateToProps(state: StoreState) {
  const canRead = contextSrv.hasAccess(AccessControlAction.ActionAPIKeysRead, true);
  const canCreate = contextSrv.hasAccess(AccessControlAction.ActionAPIKeysCreate, true);
  const canDelete = contextSrv.hasAccess(AccessControlAction.ActionAPIKeysDelete, true);

  return {
    navModel: getNavModel(state.navIndex, 'apikeys'),
    apiKeys: getApiKeys(state.apiKeys),
    searchQuery: state.apiKeys.searchQuery,
    apiKeysCount: getApiKeysCount(state.apiKeys),
    hasFetched: state.apiKeys.hasFetched,
    timeZone: getTimeZone(state.user),
    includeExpired: getIncludeExpired(state.apiKeys),
    includeExpiredDisabled: getIncludeExpiredDisabled(state.apiKeys),
    canRead: canRead,
    canCreate: canCreate,
    canDelete: canDelete,
  };
}

const mapDispatchToProps = {
  loadApiKeys,
  deleteApiKey,
  setSearchQuery,
  toggleIncludeExpired,
  addApiKey,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

interface OwnProps {}

export type Props = OwnProps & ConnectedProps<typeof connector>;

interface State {
  isAdding: boolean;
}

export class ApiKeysPageUnconnected extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.fetchApiKeys();
  }

  async fetchApiKeys() {
    await this.props.loadApiKeys();
  }

  onDeleteApiKey = (key: ApiKey) => {
    this.props.deleteApiKey(key.id!);
  };

  onSearchQueryChange = (value: string) => {
    this.props.setSearchQuery(value);
  };

  onIncludeExpiredChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    this.props.toggleIncludeExpired();
  };

  onAddApiKey = (newApiKey: NewApiKey) => {
    const openModal = (apiKey: string) => {
      const rootPath = window.location.origin + config.appSubUrl;

      appEvents.publish(
        new ShowModalReactEvent({
          props: {
            apiKey,
            rootPath,
          },
          component: ApiKeysAddedModal,
        })
      );
    };

    const secondsToLive = newApiKey.secondsToLive;
    try {
      const secondsToLiveAsNumber = secondsToLive ? rangeUtil.intervalToSeconds(secondsToLive) : null;
      const apiKey: ApiKey = {
        ...newApiKey,
        secondsToLive: secondsToLiveAsNumber,
      };
      this.props.addApiKey(apiKey, openModal);
      this.setState((prevState: State) => {
        return {
          ...prevState,
          isAdding: false,
        };
      });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const {
      hasFetched,
      navModel,
      apiKeysCount,
      apiKeys,
      searchQuery,
      timeZone,
      includeExpired,
      includeExpiredDisabled,
      canRead,
      canCreate,
      canDelete,
    } = this.props;

    if (!hasFetched) {
      return (
        <Page navModel={navModel}>
          <Page.Contents isLoading={true}>{}</Page.Contents>
        </Page>
      );
    }

    return (
      <Page navModel={navModel}>
        <Page.Contents isLoading={false}>
          <ApiKeysController>
            {({ isAdding, toggleIsAdding }) => {
              const showCTA = !isAdding && apiKeysCount === 0;
              const showTable = apiKeysCount > 0;
              return (
                <>
                  {showCTA ? (
                    <EmptyListCTA
                      title="You haven't added any API keys yet."
                      buttonIcon="key-skeleton-alt"
                      onClick={toggleIsAdding}
                      buttonTitle="New API key"
                      proTip="Remember, you can provide view-only API access to other applications."
                      buttonDisabled={!canCreate}
                    />
                  ) : null}
                  {showTable ? (
                    <ApiKeysActionBar
                      searchQuery={searchQuery}
                      disabled={isAdding || !canCreate}
                      onAddClick={toggleIsAdding}
                      onSearchChange={this.onSearchQueryChange}
                    />
                  ) : null}
                  <ApiKeysForm
                    show={isAdding}
                    onClose={toggleIsAdding}
                    onKeyAdded={this.onAddApiKey}
                    disabled={!canCreate}
                  />
                  {showTable ? (
                    <VerticalGroup>
                      <InlineField disabled={includeExpiredDisabled} label="Include expired keys">
                        <InlineSwitch id="showExpired" value={includeExpired} onChange={this.onIncludeExpiredChange} />
                      </InlineField>
                      <ApiKeysTable
                        apiKeys={apiKeys}
                        timeZone={timeZone}
                        onDelete={this.onDeleteApiKey}
                        canRead={canRead}
                        canDelete={canDelete}
                      />
                    </VerticalGroup>
                  ) : null}
                </>
              );
            }}
          </ApiKeysController>
        </Page.Contents>
      </Page>
    );
  }
}

const ApiKeysPage = connector(ApiKeysPageUnconnected);
export default ApiKeysPage;
