import { css } from '@emotion/css';
import React, { useState } from 'react';

import { AbsoluteTimeRange, DataQueryError, DataQueryResponse, LoadingState, SplitOpen, TimeZone } from '@grafana/data';
import { Alert, Button, Collapse, InlineField, TooltipDisplayMode, useStyles2, useTheme2 } from '@grafana/ui';

import { ExploreGraph } from './ExploreGraph';

type Props = {
  logsVolumeData?: DataQueryResponse;
  absoluteRange: AbsoluteTimeRange;
  timeZone: TimeZone;
  splitOpen: SplitOpen;
  width: number;
  onUpdateTimeRange: (timeRange: AbsoluteTimeRange) => void;
  onLoadLogsVolume: () => void;
};

const SHORT_ERROR_MESSAGE_LIMIT = 100;

function ErrorAlert(props: { error: DataQueryError }) {
  const [isOpen, setIsOpen] = useState(false);
  // generic get-error-message-logic, taken from
  // /public/app/features/explore/ErrorContainer.tsx
  const message = props.error.message || props.error.data?.message || '';

  const showButton = !isOpen && message.length > SHORT_ERROR_MESSAGE_LIMIT;

  return (
    <Alert title="Failed to load log volume for this query" severity="warning">
      {showButton ? (
        <Button
          variant="secondary"
          size="xs"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Show details
        </Button>
      ) : (
        message
      )}
    </Alert>
  );
}

export function LogsVolumePanel(props: Props) {
  const { width, logsVolumeData, absoluteRange, timeZone, splitOpen, onUpdateTimeRange, onLoadLogsVolume } = props;
  const theme = useTheme2();
  const styles = useStyles2(getStyles);
  const spacing = parseInt(theme.spacing(2).slice(0, -2), 10);
  const height = 150;

  let LogsVolumePanelContent;

  if (!logsVolumeData) {
    return null;
  } else if (logsVolumeData?.error) {
    return <ErrorAlert error={logsVolumeData?.error} />;
  } else if (logsVolumeData?.state === LoadingState.Loading) {
    LogsVolumePanelContent = <span>Log volume is loading...</span>;
  } else if (logsVolumeData?.data) {
    if (logsVolumeData.data.length > 0) {
      LogsVolumePanelContent = (
        <ExploreGraph
          graphStyle="lines"
          loadingState={LoadingState.Done}
          data={logsVolumeData.data}
          height={height}
          width={width - spacing}
          absoluteRange={absoluteRange}
          onChangeTime={onUpdateTimeRange}
          timeZone={timeZone}
          splitOpenFn={splitOpen}
          tooltipDisplayMode={TooltipDisplayMode.Multi}
        />
      );
    } else {
      LogsVolumePanelContent = <span>No volume data.</span>;
    }
  }

  const zoomRatio = logsLevelZoomRatio(logsVolumeData, absoluteRange);
  let zoomLevelInfo;

  if (zoomRatio !== undefined && zoomRatio < 1) {
    zoomLevelInfo = (
      <InlineField label="Reload log volume" transparent>
        <Button size="xs" icon="sync" variant="secondary" onClick={onLoadLogsVolume} id="reload-volume" />
      </InlineField>
    );
  }

  return (
    <Collapse label="Log volume" isOpen={true} loading={logsVolumeData?.state === LoadingState.Loading}>
      <div style={{ height }} className={styles.contentContainer}>
        {LogsVolumePanelContent}
      </div>
      <div className={styles.zoomInfoContainer}>{zoomLevelInfo}</div>
    </Collapse>
  );
}

const getStyles = () => {
  return {
    zoomInfoContainer: css`
      display: flex;
      justify-content: end;
      position: absolute;
      right: 5px;
      top: 5px;
    `,
    contentContainer: css`
      display: flex;
      align-items: center;
      justify-content: center;
    `,
  };
};

function logsLevelZoomRatio(
  logsVolumeData: DataQueryResponse | undefined,
  selectedTimeRange: AbsoluteTimeRange
): number | undefined {
  const dataRange = logsVolumeData && logsVolumeData.data[0] && logsVolumeData.data[0].meta?.custom?.absoluteRange;
  return dataRange ? (selectedTimeRange.from - selectedTimeRange.to) / (dataRange.from - dataRange.to) : undefined;
}
