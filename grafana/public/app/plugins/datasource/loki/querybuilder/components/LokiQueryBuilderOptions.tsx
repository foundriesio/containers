import React from 'react';

import { SelectableValue } from '@grafana/data';
import { EditorRow, EditorField } from '@grafana/experimental';
import { RadioButtonGroup, Select } from '@grafana/ui';
import { AutoSizeInput } from 'app/plugins/datasource/prometheus/querybuilder/shared/AutoSizeInput';
import { QueryOptionGroup } from 'app/plugins/datasource/prometheus/querybuilder/shared/QueryOptionGroup';

import { preprocessMaxLines, queryTypeOptions, RESOLUTION_OPTIONS } from '../../components/LokiOptionFields';
import { isMetricsQuery } from '../../datasource';
import { LokiQuery, LokiQueryType } from '../../types';

export interface Props {
  query: LokiQuery;
  onChange: (update: LokiQuery) => void;
  onRunQuery: () => void;
}

export const LokiQueryBuilderOptions = React.memo<Props>(({ query, onChange, onRunQuery }) => {
  const onQueryTypeChange = (value: LokiQueryType) => {
    onChange({ ...query, queryType: value });
    onRunQuery();
  };

  const onResolutionChange = (option: SelectableValue<number>) => {
    onChange({ ...query, resolution: option.value });
    onRunQuery();
  };

  const onLegendFormatChanged = (evt: React.FormEvent<HTMLInputElement>) => {
    onChange({ ...query, legendFormat: evt.currentTarget.value });
    onRunQuery();
  };

  function onMaxLinesChange(e: React.SyntheticEvent<HTMLInputElement>) {
    const newMaxLines = preprocessMaxLines(e.currentTarget.value);
    if (query.maxLines !== newMaxLines) {
      onChange({ ...query, maxLines: newMaxLines });
      onRunQuery();
    }
  }

  let queryType = query.queryType ?? (query.instant ? LokiQueryType.Instant : LokiQueryType.Range);
  let showMaxLines = !isMetricsQuery(query.expr);

  return (
    <EditorRow>
      <QueryOptionGroup title="Options" collapsedInfo={getCollapsedInfo(query, queryType, showMaxLines)}>
        <EditorField
          label="Legend"
          tooltip="Series name override or template. Ex. {{hostname}} will be replaced with label value for hostname."
        >
          <AutoSizeInput
            placeholder="{{label}}"
            id="loki-query-editor-legend-format"
            type="string"
            minWidth={14}
            defaultValue={query.legendFormat}
            onCommitChange={onLegendFormatChanged}
          />
        </EditorField>
        <EditorField label="Type">
          <RadioButtonGroup options={queryTypeOptions} value={queryType} onChange={onQueryTypeChange} />
        </EditorField>
        {showMaxLines && (
          <EditorField label="Line limit" tooltip="Upper limit for number of log lines returned by query.">
            <AutoSizeInput
              className="width-4"
              placeholder="auto"
              type="number"
              min={0}
              defaultValue={query.maxLines?.toString() ?? ''}
              onCommitChange={onMaxLinesChange}
            />
          </EditorField>
        )}
        <EditorField label="Resolution">
          <Select
            isSearchable={false}
            onChange={onResolutionChange}
            options={RESOLUTION_OPTIONS}
            value={query.resolution || 1}
            aria-label="Select resolution"
            menuShouldPortal
          />
        </EditorField>
      </QueryOptionGroup>
    </EditorRow>
  );
});

function getCollapsedInfo(query: LokiQuery, queryType: LokiQueryType, showMaxLines: boolean): string[] {
  const queryTypeLabel = queryTypeOptions.find((x) => x.value === queryType);
  const resolutionLabel = RESOLUTION_OPTIONS.find((x) => x.value === (query.resolution ?? 1));

  const items: string[] = [];

  if (query.legendFormat) {
    items.push(`Legend: ${query.legendFormat}`);
  }

  if (query.resolution) {
    items.push(`Resolution: ${resolutionLabel?.label}`);
  }

  items.push(`Type: ${queryTypeLabel?.label}`);

  if (showMaxLines && query.maxLines) {
    items.push(`Line limit: ${query.maxLines}`);
  }

  return items;
}

LokiQueryBuilderOptions.displayName = 'LokiQueryBuilderOptions';
