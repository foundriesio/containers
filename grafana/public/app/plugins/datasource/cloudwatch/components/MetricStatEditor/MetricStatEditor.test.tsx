import { fireEvent, render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import selectEvent from 'react-select-event';

import { MetricStatEditor } from '..';
import { setupMockedDataSource } from '../../__mocks__/CloudWatchDataSource';
import { CloudWatchMetricsQuery } from '../../types';

const ds = setupMockedDataSource({
  variables: [],
});

ds.datasource.getNamespaces = jest.fn().mockResolvedValue([]);
ds.datasource.getMetrics = jest.fn().mockResolvedValue([]);
ds.datasource.getDimensionKeys = jest.fn().mockResolvedValue([]);
ds.datasource.getVariables = jest.fn().mockReturnValue([]);
const q: CloudWatchMetricsQuery = {
  id: '',
  region: 'us-east-2',
  namespace: '',
  period: '',
  alias: '',
  metricName: '',
  dimensions: {},
  matchExact: true,
  statistic: '',
  expression: '',
  refId: '',
};

const props = {
  datasource: ds.datasource,
  query: q,
  onChange: jest.fn(),
  onRunQuery: jest.fn(),
};

describe('MetricStatEditor', () => {
  describe('statistics field', () => {
    test.each([['Average', 'p23.23', 'p34', '$statistic']])('should accept valid values', async (statistic) => {
      const onChange = jest.fn();
      const onRunQuery = jest.fn();
      props.datasource.getVariables = jest.fn().mockReturnValue(['$statistic']);

      render(<MetricStatEditor {...props} onChange={onChange} onRunQuery={onRunQuery} />);

      const statisticElement = await screen.findByLabelText('Statistic');
      expect(statisticElement).toBeInTheDocument();

      userEvent.type(statisticElement, statistic);
      fireEvent.keyDown(statisticElement, { keyCode: 13 });
      expect(onChange).toHaveBeenCalledWith({ ...props.query, statistic });
      expect(onRunQuery).toHaveBeenCalled();
    });

    test.each([['CustomStat', 'p23,23', '$statistic']])('should not accept invalid values', async (statistic) => {
      const onChange = jest.fn();
      const onRunQuery = jest.fn();

      render(<MetricStatEditor {...props} onChange={onChange} onRunQuery={onRunQuery} />);

      const statisticElement = await screen.findByLabelText('Statistic');
      expect(statisticElement).toBeInTheDocument();

      userEvent.type(statisticElement, statistic);
      fireEvent.keyDown(statisticElement, { keyCode: 13 });
      expect(onChange).not.toHaveBeenCalled();
      expect(onRunQuery).not.toHaveBeenCalled();
    });
  });

  describe('expressions', () => {
    it('should display match exact switch is not set', async () => {
      render(<MetricStatEditor {...props} />);
      expect(await screen.findByText('Match exact')).toBeInTheDocument();
    });

    it('should display match exact switch if prop is set to false', async () => {
      render(<MetricStatEditor {...props} disableExpressions={false} />);
      expect(await screen.findByText('Match exact')).toBeInTheDocument();
    });

    it('should not display match exact switch if prop is set to true', async () => {
      render(<MetricStatEditor {...props} disableExpressions={true} />);
      await waitFor(() => {
        expect(screen.queryByText('Match exact')).toBeNull();
      });
    });
  });

  describe('match exact', () => {
    it('should be checked when value is true', async () => {
      render(<MetricStatEditor {...props} disableExpressions={false} />);
      expect(await screen.findByLabelText('Match exact - optional')).toBeChecked();
    });

    it('should be unchecked when value is false', async () => {
      render(<MetricStatEditor {...props} query={{ ...props.query, matchExact: false }} disableExpressions={false} />);
      expect(await screen.findByLabelText('Match exact - optional')).not.toBeChecked();
    });
  });

  describe('validating Query namespace / metricName', () => {
    const namespaces = [
      { value: 'n1', label: 'n1', text: 'n1' },
      { value: 'n2', label: 'n2', text: 'n2' },
    ];
    const metrics = [
      { value: 'm1', label: 'm1', text: 'm1' },
      { value: 'm2', label: 'm2', text: 'm2' },
    ];
    const onChange = jest.fn();
    const onRunQuery = jest.fn();
    const propsNamespaceMetrics = {
      ...props,
      onChange,
      onRunQuery,
    };

    beforeEach(() => {
      propsNamespaceMetrics.datasource.getNamespaces = jest.fn().mockResolvedValue(namespaces);
      propsNamespaceMetrics.datasource.getMetrics = jest.fn().mockResolvedValue(metrics);
      onChange.mockClear();
      onRunQuery.mockClear();
    });

    it('should select namespace and metric name correctly', async () => {
      await act(async () => {
        render(<MetricStatEditor {...propsNamespaceMetrics} />);
      });

      const namespaceSelect = screen.getByLabelText('Namespace');
      const metricsSelect = screen.getByLabelText('Metric name');
      expect(namespaceSelect).toBeInTheDocument();
      expect(metricsSelect).toBeInTheDocument();

      await selectEvent.select(namespaceSelect, 'n1');
      await selectEvent.select(metricsSelect, 'm1');

      expect(onChange.mock.calls).toEqual([
        [{ ...propsNamespaceMetrics.query, namespace: 'n1' }], // First call, namespace select
        [{ ...propsNamespaceMetrics.query, metricName: 'm1' }], // Second call, metric select
      ]);
      expect(onRunQuery).toHaveBeenCalledTimes(2);
    });

    it('should remove metricName from query if it does not exist in new namespace', async () => {
      propsNamespaceMetrics.datasource.getMetrics = jest
        .fn()
        .mockImplementation((namespace: string, region: string) => {
          let mockMetrics =
            namespace === 'n1' && region === props.query.region
              ? metrics
              : [{ value: 'oldNamespaceMetric', label: 'oldNamespaceMetric', text: 'oldNamespaceMetric' }];
          return Promise.resolve(mockMetrics);
        });
      propsNamespaceMetrics.query.metricName = 'oldNamespaceMetric';
      propsNamespaceMetrics.query.namespace = 'n2';

      await act(async () => {
        render(<MetricStatEditor {...propsNamespaceMetrics} />);
      });
      const namespaceSelect = screen.getByLabelText('Namespace');
      expect(screen.getByText('n2')).toBeInTheDocument();
      expect(screen.getByText('oldNamespaceMetric')).toBeInTheDocument();

      await selectEvent.select(namespaceSelect, 'n1');

      expect(onChange.mock.calls).toEqual([[{ ...propsNamespaceMetrics.query, metricName: '', namespace: 'n1' }]]);
    });

    it('should not remove metricName from query if it does exist in new namespace', async () => {
      propsNamespaceMetrics.query.namespace = 'n1';
      propsNamespaceMetrics.query.metricName = 'm1';

      await act(async () => {
        render(<MetricStatEditor {...propsNamespaceMetrics} />);
      });
      const namespaceSelect = screen.getByLabelText('Namespace');
      expect(screen.getByText('n1')).toBeInTheDocument();
      expect(screen.getByText('m1')).toBeInTheDocument();

      await selectEvent.select(namespaceSelect, 'n2');

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls).toEqual([[{ ...propsNamespaceMetrics.query, metricName: 'm1', namespace: 'n2' }]]);
    });
  });
});
