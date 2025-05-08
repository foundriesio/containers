import React, { lazy, PureComponent, RefObject, Suspense } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { DataSourceInstanceSettings, RawTimeRange } from '@grafana/data';
import { config, DataSourcePicker } from '@grafana/runtime';
import { PageToolbar, SetInterval, ToolbarButton, ToolbarButtonRow } from '@grafana/ui';
import { createAndCopyShortLink } from 'app/core/utils/shortLinks';
import { ExploreId } from 'app/types/explore';
import { StoreState } from 'app/types/store';

import { DashNavButton } from '../dashboard/components/DashNav/DashNavButton';
import { updateFiscalYearStartMonthForSession, updateTimeZoneForSession } from '../profile/state/reducers';
import { getFiscalYearStartMonth, getTimeZone } from '../profile/state/selectors';

import { ExploreTimeControls } from './ExploreTimeControls';
import { LiveTailButton } from './LiveTailButton';
import { RunButton } from './RunButton';
import { changeDatasource } from './state/datasource';
import { splitClose, splitOpen } from './state/main';
import { cancelQueries, runQueries } from './state/query';
import { isSplit } from './state/selectors';
import { syncTimes, changeRefreshInterval } from './state/time';
import { LiveTailControls } from './useLiveTailControls';

const AddToDashboard = lazy(() =>
  import('./AddToDashboard').then(({ AddToDashboard }) => ({ default: AddToDashboard }))
);

interface OwnProps {
  exploreId: ExploreId;
  onChangeTime: (range: RawTimeRange, changedByScanner?: boolean) => void;
  topOfExploreViewRef?: RefObject<HTMLDivElement>;
}

type Props = OwnProps & ConnectedProps<typeof connector>;

class UnConnectedExploreToolbar extends PureComponent<Props> {
  onChangeDatasource = async (dsSettings: DataSourceInstanceSettings) => {
    this.props.changeDatasource(this.props.exploreId, dsSettings.uid, { importQueries: true });
  };

  onRunQuery = (loading = false) => {
    const { runQueries, cancelQueries, exploreId } = this.props;
    if (loading) {
      return cancelQueries(exploreId);
    } else {
      return runQueries(exploreId);
    }
  };

  onChangeRefreshInterval = (item: string) => {
    const { changeRefreshInterval, exploreId } = this.props;
    changeRefreshInterval(exploreId, item);
  };

  onChangeTimeSync = () => {
    const { syncTimes, exploreId } = this.props;
    syncTimes(exploreId);
  };

  render() {
    const {
      datasourceMissing,
      closeSplit,
      exploreId,
      loading,
      range,
      timeZone,
      fiscalYearStartMonth,
      splitted,
      syncedTimes,
      refreshInterval,
      onChangeTime,
      split,
      hasLiveOption,
      isLive,
      isPaused,
      containerWidth,
      onChangeTimeZone,
      onChangeFiscalYearStartMonth,
      topOfExploreViewRef,
    } = this.props;

    const showSmallDataSourcePicker = (splitted ? containerWidth < 700 : containerWidth < 800) || false;
    const showSmallTimePicker = splitted || containerWidth < 1210;

    return (
      <div ref={topOfExploreViewRef}>
        <PageToolbar
          aria-label="Explore toolbar"
          title={exploreId === ExploreId.left ? 'Explore' : undefined}
          pageIcon={exploreId === ExploreId.left ? 'compass' : undefined}
          leftItems={[
            exploreId === ExploreId.left && (
              <DashNavButton
                key="share"
                tooltip="Copy shortened link"
                icon="share-alt"
                onClick={() => createAndCopyShortLink(window.location.href)}
                aria-label="Copy shortened link"
              />
            ),
            !datasourceMissing && (
              <DataSourcePicker
                key={`${exploreId}-ds-picker`}
                onChange={this.onChangeDatasource}
                current={this.props.datasourceName}
                hideTextValue={showSmallDataSourcePicker}
                width={showSmallDataSourcePicker ? 8 : undefined}
              />
            ),
          ].filter(Boolean)}
        >
          <ToolbarButtonRow>
            {!splitted ? (
              <ToolbarButton title="Split" onClick={() => split()} icon="columns" disabled={isLive}>
                Split
              </ToolbarButton>
            ) : (
              <ToolbarButton title="Close split pane" onClick={() => closeSplit(exploreId)} icon="times">
                Close
              </ToolbarButton>
            )}

            {config.featureToggles.explore2Dashboard && (
              <Suspense fallback={null}>
                <AddToDashboard exploreId={exploreId} />
              </Suspense>
            )}

            {!isLive && (
              <ExploreTimeControls
                exploreId={exploreId}
                range={range}
                timeZone={timeZone}
                fiscalYearStartMonth={fiscalYearStartMonth}
                onChangeTime={onChangeTime}
                splitted={splitted}
                syncedTimes={syncedTimes}
                onChangeTimeSync={this.onChangeTimeSync}
                hideText={showSmallTimePicker}
                onChangeTimeZone={onChangeTimeZone}
                onChangeFiscalYearStartMonth={onChangeFiscalYearStartMonth}
              />
            )}

            <RunButton
              refreshInterval={refreshInterval}
              onChangeRefreshInterval={this.onChangeRefreshInterval}
              isSmall={splitted || showSmallTimePicker}
              isLive={isLive}
              loading={loading || (isLive && !isPaused)}
              onRun={this.onRunQuery}
              showDropdown={!isLive}
            />

            {refreshInterval && <SetInterval func={this.onRunQuery} interval={refreshInterval} loading={loading} />}

            {hasLiveOption && (
              <LiveTailControls exploreId={exploreId}>
                {(controls) => (
                  <LiveTailButton
                    splitted={splitted}
                    isLive={isLive}
                    isPaused={isPaused}
                    start={controls.start}
                    pause={controls.pause}
                    resume={controls.resume}
                    stop={controls.stop}
                  />
                )}
              </LiveTailControls>
            )}
          </ToolbarButtonRow>
        </PageToolbar>
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState, { exploreId }: OwnProps) => {
  const { syncedTimes } = state.explore;
  const exploreItem = state.explore[exploreId]!;
  const { datasourceInstance, datasourceMissing, range, refreshInterval, loading, isLive, isPaused, containerWidth } =
    exploreItem;

  const hasLiveOption = !!datasourceInstance?.meta?.streaming;

  return {
    datasourceMissing,
    datasourceName: datasourceInstance?.name,
    loading,
    range,
    timeZone: getTimeZone(state.user),
    fiscalYearStartMonth: getFiscalYearStartMonth(state.user),
    splitted: isSplit(state),
    refreshInterval,
    hasLiveOption,
    isLive,
    isPaused,
    syncedTimes,
    containerWidth,
  };
};

const mapDispatchToProps = {
  changeDatasource,
  changeRefreshInterval,
  cancelQueries,
  runQueries,
  closeSplit: splitClose,
  split: splitOpen,
  syncTimes,
  onChangeTimeZone: updateTimeZoneForSession,
  onChangeFiscalYearStartMonth: updateFiscalYearStartMonthForSession,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export const ExploreToolbar = connector(UnConnectedExploreToolbar);
