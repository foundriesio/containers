import { css } from '@emotion/css';
import React, { useMemo, useRef, useState } from 'react';

import {
  CartesianCoords2D,
  compareDataFrameStructures,
  DataFrame,
  getFieldDisplayName,
  GrafanaTheme2,
  PanelProps,
  TimeRange,
  VizOrientation,
} from '@grafana/data';
import { PanelDataErrorView } from '@grafana/runtime';
import { LegendDisplayMode } from '@grafana/schema';
import {
  GraphNG,
  GraphNGProps,
  measureText,
  PlotLegend,
  Portal,
  UPlotConfigBuilder,
  UPLOT_AXIS_FONT_SIZE,
  usePanelContext,
  useStyles2,
  useTheme2,
  VizLayout,
  VizLegend,
  VizTooltipContainer,
} from '@grafana/ui';
import { PropDiffFn } from '@grafana/ui/src/components/GraphNG/GraphNG';
import { CloseButton } from 'app/core/components/CloseButton/CloseButton';

import { DataHoverView } from '../geomap/components/DataHoverView';
import { getFieldLegendItem } from '../state-timeline/utils';

import { HoverEvent, setupConfig } from './config';
import { PanelOptions } from './models.gen';
import { prepareBarChartDisplayValues, preparePlotConfigBuilder } from './utils';

const TOOLTIP_OFFSET = 10;

/**
 * @alpha
 */
export interface BarChartProps
  extends PanelOptions,
    Omit<GraphNGProps, 'prepConfig' | 'propsToDiff' | 'renderLegend' | 'theme'> {}

const propsToDiff: Array<string | PropDiffFn> = [
  'orientation',
  'barWidth',
  'barRadius',
  'xTickLabelRotation',
  'xTickLabelMaxLength',
  'xTickLabelSpacing',
  'groupWidth',
  'stacking',
  'showValue',
  'xField',
  'colorField',
  'legend',
  (prev: BarChartProps, next: BarChartProps) => next.text?.valueSize === prev.text?.valueSize,
];

interface Props extends PanelProps<PanelOptions> {}

export const BarChartPanel: React.FunctionComponent<Props> = ({ data, options, width, height, timeZone, id }) => {
  const theme = useTheme2();
  const styles = useStyles2(getStyles);
  const { eventBus } = usePanelContext();

  const oldConfig = useRef<UPlotConfigBuilder | undefined>(undefined);
  const isToolTipOpen = useRef<boolean>(false);

  const [hover, setHover] = useState<HoverEvent | undefined>(undefined);
  const [coords, setCoords] = useState<CartesianCoords2D | null>(null);
  const [focusedSeriesIdx, setFocusedSeriesIdx] = useState<number | null>(null);
  const [focusedPointIdx, setFocusedPointIdx] = useState<number | null>(null);
  const [shouldDisplayCloseButton, setShouldDisplayCloseButton] = useState<boolean>(false);

  const onCloseToolTip = () => {
    isToolTipOpen.current = false;
    setCoords(null);
    setShouldDisplayCloseButton(false);
  };

  const onUPlotClick = () => {
    isToolTipOpen.current = !isToolTipOpen.current;

    // Linking into useState required to re-render tooltip
    setShouldDisplayCloseButton(isToolTipOpen.current);
  };

  const frame0Ref = useRef<DataFrame>();
  const info = useMemo(() => prepareBarChartDisplayValues(data?.series, theme, options), [data, theme, options]);
  const structureRef = useRef(10000);
  useMemo(() => {
    structureRef.current++;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]); // change every time the options object changes (while editing)

  const structureRev = useMemo(() => {
    const f0 = info.viz[0];
    const f1 = frame0Ref.current;
    if (!(f0 && f1 && compareDataFrameStructures(f0, f1, true))) {
      structureRef.current++;
    }
    frame0Ref.current = f0;
    return (data.structureRev ?? 0) + structureRef.current;
  }, [info, data.structureRev]);

  const orientation = useMemo(() => {
    if (!options.orientation || options.orientation === VizOrientation.Auto) {
      return width < height ? VizOrientation.Horizontal : VizOrientation.Vertical;
    }
    return options.orientation;
  }, [width, height, options.orientation]);

  const xTickLabelMaxLength = useMemo(() => {
    // If no max length is set, limit the number of characters to a length where it will use a maximum of half of the height of the viz.
    if (!options.xTickLabelMaxLength) {
      const rotationAngle = options.xTickLabelRotation;
      const textSize = measureText('M', UPLOT_AXIS_FONT_SIZE).width; // M is usually the widest character so let's use that as an approximation.
      const maxHeightForValues = height / 2;

      return (
        maxHeightForValues /
          (Math.sin(((rotationAngle >= 0 ? rotationAngle : rotationAngle * -1) * Math.PI) / 180) * textSize) -
        3 //Subtract 3 for the "..." added to the end.
      );
    } else {
      return options.xTickLabelMaxLength;
    }
  }, [height, options.xTickLabelRotation, options.xTickLabelMaxLength]);

  if (!info.viz[0]?.fields.length) {
    return <PanelDataErrorView panelId={id} data={data} message={info.warn} needsNumberField={true} />;
  }

  const renderTooltip = (alignedFrame: DataFrame, seriesIdx: number | null, datapointIdx: number | null) => {
    const field = seriesIdx == null ? null : alignedFrame.fields[seriesIdx];
    if (field) {
      const disp = getFieldDisplayName(field, alignedFrame);
      seriesIdx = info.aligned.fields.findIndex((f) => disp === getFieldDisplayName(f, info.aligned));
    }

    return (
      <>
        {shouldDisplayCloseButton && (
          <>
            <CloseButton onClick={onCloseToolTip} />
            <div className={styles.closeButtonSpacer} />
          </>
        )}
        <DataHoverView
          data={info.aligned}
          rowIndex={datapointIdx}
          columnIndex={seriesIdx}
          sortOrder={options.tooltip.sort}
        />
      </>
    );
  };

  const renderLegend = (config: UPlotConfigBuilder) => {
    const { legend } = options;
    if (!config || legend.displayMode === LegendDisplayMode.Hidden) {
      return null;
    }

    if (info.colorByField) {
      const items = getFieldLegendItem([info.colorByField], theme);
      if (items?.length) {
        return (
          <VizLayout.Legend placement={legend.placement}>
            <VizLegend placement={legend.placement} items={items} displayMode={legend.displayMode} />
          </VizLayout.Legend>
        );
      }
    }

    return <PlotLegend data={info.viz} config={config} maxHeight="35%" maxWidth="60%" {...options.legend} />;
  };

  const rawValue = (seriesIdx: number, valueIdx: number) => {
    return frame0Ref.current!.fields[seriesIdx].values.get(valueIdx);
  };

  // Color by value
  let getColor: ((seriesIdx: number, valueIdx: number) => string) | undefined = undefined;

  let fillOpacity = 1;

  if (info.colorByField) {
    const colorByField = info.colorByField;
    const disp = colorByField.display!;
    fillOpacity = (colorByField.config.custom.fillOpacity ?? 100) / 100;
    // gradientMode? ignore?
    getColor = (seriesIdx: number, valueIdx: number) => disp(colorByField.values.get(valueIdx)).color!;
  }

  const prepConfig = (alignedFrame: DataFrame, allFrames: DataFrame[], getTimeRange: () => TimeRange) => {
    const {
      barWidth,
      barRadius = 0,
      showValue,
      groupWidth,
      stacking,
      legend,
      tooltip,
      text,
      xTickLabelRotation,
      xTickLabelSpacing,
    } = options;

    return preparePlotConfigBuilder({
      frame: alignedFrame,
      getTimeRange,
      theme,
      timeZone,
      eventBus,
      orientation,
      barWidth,
      barRadius,
      showValue,
      groupWidth,
      xTickLabelRotation,
      xTickLabelMaxLength,
      xTickLabelSpacing,
      stacking,
      legend,
      tooltip,
      text,
      rawValue,
      getColor,
      fillOpacity,
      allFrames: info.viz,
    });
  };

  return (
    <GraphNG
      theme={theme}
      frames={info.viz}
      prepConfig={prepConfig}
      propsToDiff={propsToDiff}
      preparePlotFrame={(f) => f[0]} // already processed in by the panel above!
      renderLegend={renderLegend}
      legend={options.legend}
      timeZone={timeZone}
      timeRange={{ from: 1, to: 1 } as unknown as TimeRange} // HACK
      structureRev={structureRev}
      width={width}
      height={height}
    >
      {(config) => {
        if (oldConfig.current !== config) {
          oldConfig.current = setupConfig({
            config,
            onUPlotClick,
            setFocusedSeriesIdx,
            setFocusedPointIdx,
            setCoords,
            setHover,
            isToolTipOpen,
          });
        }

        return (
          <Portal>
            {hover && coords && (
              <VizTooltipContainer
                position={{ x: coords.x, y: coords.y }}
                offset={{ x: TOOLTIP_OFFSET, y: TOOLTIP_OFFSET }}
                allowPointerEvents={isToolTipOpen.current}
              >
                {renderTooltip(info.aligned, focusedSeriesIdx, focusedPointIdx)}
              </VizTooltipContainer>
            )}
          </Portal>
        );
      }}
    </GraphNG>
  );
};

const getStyles = (theme: GrafanaTheme2) => ({
  closeButtonSpacer: css`
    margin-bottom: 15px;
  `,
});
