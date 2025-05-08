import { render, screen } from '@testing-library/react';
// @ts-ignore
import RCCascader from 'rc-cascader';
import React from 'react';

import { DataSourceInstanceSettings, PanelData, LoadingState, DataFrame } from '@grafana/data';

import PromQlLanguageProvider from '../language_provider';
import { PromOptions } from '../types';

import PromQueryField from './PromQueryField';

// the monaco-based editor uses lazy-loading and that does not work
// well with this test, and we do not need the monaco-related
// functionality in this test anyway, so we mock it out.
jest.mock('./monaco-query-field/MonacoQueryFieldWrapper', () => {
  const fakeQueryField = () => <div>prometheus query field</div>;
  return {
    MonacoQueryFieldWrapper: fakeQueryField,
  };
});

describe('PromQueryField', () => {
  beforeAll(() => {
    // @ts-ignore
    window.getSelection = () => {};
  });

  it('renders metrics chooser regularly if lookups are not disabled in the datasource settings', () => {
    const datasource = {
      languageProvider: {
        start: () => Promise.resolve([]),
        syntax: () => {},
        getLabelKeys: () => [],
        metrics: [],
      },
      getInitHints: () => [],
    } as unknown as DataSourceInstanceSettings<PromOptions>;

    const queryField = render(
      <PromQueryField
        // @ts-ignore
        datasource={datasource}
        query={{ expr: '', refId: '' }}
        onRunQuery={() => {}}
        onChange={() => {}}
        history={[]}
      />
    );

    expect(queryField.getAllByRole('button')).toHaveLength(1);
  });

  it('renders a disabled metrics chooser if lookups are disabled in datasource settings', () => {
    const datasource = {
      languageProvider: {
        start: () => Promise.resolve([]),
        syntax: () => {},
        getLabelKeys: () => [],
        metrics: [],
      },
      getInitHints: () => [],
    } as unknown as DataSourceInstanceSettings<PromOptions>;
    const queryField = render(
      <PromQueryField
        // @ts-ignore
        datasource={{ ...datasource, lookupsDisabled: true }}
        query={{ expr: '', refId: '' }}
        onRunQuery={() => {}}
        onChange={() => {}}
        history={[]}
      />
    );

    const bcButton = queryField.getByRole('button');
    expect(bcButton).toBeDisabled();
  });

  it('renders an initial hint if no data and initial hint provided', () => {
    const datasource = {
      languageProvider: {
        start: () => Promise.resolve([]),
        syntax: () => {},
        getLabelKeys: () => [],
        metrics: [],
      },
      getInitHints: () => [{ label: 'Initial hint', type: 'INFO' }],
    } as unknown as DataSourceInstanceSettings<PromOptions>;
    render(
      <PromQueryField
        // @ts-ignore
        datasource={{ ...datasource, lookupsDisabled: true }}
        query={{ expr: '', refId: '' }}
        onRunQuery={() => {}}
        onChange={() => {}}
        history={[]}
      />
    );
    expect(screen.getByText('Initial hint')).toBeInTheDocument();
  });

  it('renders query hint if data, query hint and initial hint provided', () => {
    const datasource = {
      languageProvider: {
        start: () => Promise.resolve([]),
        syntax: () => {},
        getLabelKeys: () => [],
        metrics: [],
      },
      getInitHints: () => [{ label: 'Initial hint', type: 'INFO' }],
      getQueryHints: () => [{ label: 'Query hint', type: 'INFO' }],
    } as unknown as DataSourceInstanceSettings<PromOptions>;
    render(
      <PromQueryField
        // @ts-ignore
        datasource={{ ...datasource }}
        query={{ expr: '', refId: '' }}
        onRunQuery={() => {}}
        onChange={() => {}}
        history={[]}
        data={
          {
            series: [{ name: 'test name' }] as DataFrame[],
            state: LoadingState.Done,
          } as PanelData
        }
      />
    );
    expect(screen.getByText('Query hint')).toBeInTheDocument();
    expect(screen.queryByText('Initial hint')).not.toBeInTheDocument();
  });

  it('refreshes metrics when the data source changes', async () => {
    const defaultProps = {
      query: { expr: '', refId: '' },
      onRunQuery: () => {},
      onChange: () => {},
      history: [],
    };
    const metrics = ['foo', 'bar'];
    const queryField = render(
      <PromQueryField
        // @ts-ignore
        datasource={{
          languageProvider: makeLanguageProvider({ metrics: [metrics] }),
          getInitHints: () => [],
        }}
        {...defaultProps}
      />
    );

    const changedMetrics = ['baz', 'moo'];
    queryField.rerender(
      <PromQueryField
        // @ts-ignore
        datasource={{
          languageProvider: makeLanguageProvider({ metrics: [changedMetrics] }),
        }}
        {...defaultProps}
      />
    );

    // If we check the label browser right away it should be in loading state
    let labelBrowser = screen.getByRole('button');
    expect(labelBrowser.textContent).toContain('Loading');
  });
});

function makeLanguageProvider(options: { metrics: string[][] }) {
  const metricsStack = [...options.metrics];
  return {
    histogramMetrics: [] as any,
    metrics: [],
    metricsMetadata: {},
    lookupsDisabled: false,
    getLabelKeys: () => [],
    start() {
      this.metrics = metricsStack.shift();
      return Promise.resolve([]);
    },
  } as any as PromQlLanguageProvider;
}
