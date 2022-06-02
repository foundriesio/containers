import memoizeOne from 'memoize-one';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { DataQuery, ExploreUrlState, EventBusExtended, EventBusSrv } from '@grafana/data';
import { selectors } from '@grafana/e2e-selectors';
import store from 'app/core/store';
import {
  DEFAULT_RANGE,
  ensureQueries,
  getTimeRange,
  getTimeRangeFromUrl,
  lastUsedDatasourceKeyForOrgId,
  parseUrlState,
} from 'app/core/utils/explore';
import { StoreState } from 'app/types';
import { ExploreId } from 'app/types/explore';

import { getFiscalYearStartMonth, getTimeZone } from '../profile/state/selectors';

import Explore from './Explore';
import { initializeExplore, refreshExplore } from './state/explorePane';
import { lastSavedUrl, cleanupPaneAction } from './state/main';

interface OwnProps {
  exploreId: ExploreId;
  urlQuery: string;
  split: boolean;
}

interface Props extends OwnProps, ConnectedProps<typeof connector> {}

/**
 * This component is responsible for handling initialization of an Explore pane and triggering synchronization
 * of state based on URL changes and preventing any infinite loops.
 */
class ExplorePaneContainerUnconnected extends React.PureComponent<Props> {
  el: any;
  exploreEvents: EventBusExtended;

  constructor(props: Props) {
    super(props);
    this.exploreEvents = new EventBusSrv();
    this.state = {
      openDrawer: undefined,
    };
  }

  componentDidMount() {
    const { initialized, exploreId, initialDatasource, initialQueries, initialRange, panelsState } = this.props;
    const width = this.el?.offsetWidth ?? 0;

    // initialize the whole explore first time we mount and if browser history contains a change in datasource
    if (!initialized) {
      this.props.initializeExplore(
        exploreId,
        initialDatasource,
        initialQueries,
        initialRange,
        width,
        this.exploreEvents,
        panelsState
      );
    }
  }

  componentWillUnmount() {
    this.exploreEvents.removeAllListeners();
    this.props.cleanupPaneAction({ exploreId: this.props.exploreId });
  }

  componentDidUpdate(prevProps: Props) {
    this.refreshExplore(prevProps.urlQuery);
  }

  refreshExplore = (prevUrlQuery: string) => {
    const { exploreId, urlQuery } = this.props;

    // Update state from url only if it changed and only if the change wasn't initialised by redux to prevent any loops
    if (urlQuery !== prevUrlQuery && urlQuery !== lastSavedUrl[exploreId]) {
      this.props.refreshExplore(exploreId, urlQuery);
    }
  };

  getRef = (el: any) => {
    this.el = el;
  };

  render() {
    const exploreClass = this.props.split ? 'explore explore-split' : 'explore';
    return (
      <div className={exploreClass} ref={this.getRef} data-testid={selectors.pages.Explore.General.container}>
        {this.props.initialized && <Explore exploreId={this.props.exploreId} />}
      </div>
    );
  }
}

const ensureQueriesMemoized = memoizeOne(ensureQueries);
const getTimeRangeFromUrlMemoized = memoizeOne(getTimeRangeFromUrl);

function mapStateToProps(state: StoreState, props: OwnProps) {
  const urlState = parseUrlState(props.urlQuery);
  const timeZone = getTimeZone(state.user);
  const fiscalYearStartMonth = getFiscalYearStartMonth(state.user);

  const { datasource, queries, range: urlRange, panelsState } = (urlState || {}) as ExploreUrlState;
  const initialDatasource = datasource || store.get(lastUsedDatasourceKeyForOrgId(state.user.orgId));
  const initialQueries: DataQuery[] = ensureQueriesMemoized(queries);
  const initialRange = urlRange
    ? getTimeRangeFromUrlMemoized(urlRange, timeZone, fiscalYearStartMonth)
    : getTimeRange(timeZone, DEFAULT_RANGE, fiscalYearStartMonth);

  return {
    initialized: state.explore[props.exploreId]?.initialized,
    initialDatasource,
    initialQueries,
    initialRange,
    panelsState,
  };
}

const mapDispatchToProps = {
  initializeExplore,
  refreshExplore,
  cleanupPaneAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export const ExplorePaneContainer = connector(ExplorePaneContainerUnconnected);
