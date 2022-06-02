import { cloneDeep, find, findLast, isEmpty, isString, set } from 'lodash';
import React from 'react';
import { from, lastValueFrom, merge, Observable, of, throwError, zip } from 'rxjs';
import { catchError, concatMap, finalize, map, mergeMap, repeat, scan, share, takeWhile, tap } from 'rxjs/operators';

import {
  DataFrame,
  DataQueryError,
  DataQueryErrorType,
  DataQueryRequest,
  DataQueryResponse,
  DataSourceInstanceSettings,
  DataSourceWithLogsContextSupport,
  dateMath,
  FieldType,
  LoadingState,
  LogRowModel,
  rangeUtil,
  ScopedVars,
  TableData,
  TimeRange,
  toLegacyResponseData,
} from '@grafana/data';
import { DataSourceWithBackend, FetchError, getBackendSrv, toDataQueryResponse } from '@grafana/runtime';
import { RowContextOptions } from '@grafana/ui/src/components/Logs/LogRowContextProvider';
import { notifyApp } from 'app/core/actions';
import { createErrorNotification } from 'app/core/copy/appNotification';
import { getTimeSrv, TimeSrv } from 'app/features/dashboard/services/TimeSrv';
import { getTemplateSrv, TemplateSrv } from 'app/features/templating/template_srv';
import { VariableWithMultiSupport } from 'app/features/variables/types';
import { store } from 'app/store/store';
import { AppNotificationTimeout } from 'app/types';

import { SQLCompletionItemProvider } from './cloudwatch-sql/completion/CompletionItemProvider';
import { ThrottlingErrorMessage } from './components/ThrottlingErrorMessage';
import { CloudWatchLanguageProvider } from './language_provider';
import memoizedDebounce from './memoizedDebounce';
import { MetricMathCompletionItemProvider } from './metric-math/completion/CompletionItemProvider';
import {
  CloudWatchJsonData,
  CloudWatchLogsQuery,
  CloudWatchLogsQueryStatus,
  CloudWatchLogsRequest,
  CloudWatchMetricsQuery,
  CloudWatchQuery,
  DescribeLogGroupsRequest,
  Dimensions,
  GetLogEventsRequest,
  GetLogGroupFieldsRequest,
  GetLogGroupFieldsResponse,
  isCloudWatchLogsQuery,
  LogAction,
  MetricEditorMode,
  MetricQuery,
  MetricQueryType,
  MetricRequest,
  StartQueryRequest,
  TSDBResponse,
} from './types';
import { addDataLinksToLogsResponse } from './utils/datalinks';
import { runWithRetry } from './utils/logsRetry';
import { increasingInterval } from './utils/rxjs/increasingInterval';
import { CloudWatchVariableSupport } from './variables';

const DS_QUERY_ENDPOINT = '/api/ds/query';

// Constants also defined in tsdb/cloudwatch/cloudwatch.go
const LOG_IDENTIFIER_INTERNAL = '__log__grafana_internal__';
const LOGSTREAM_IDENTIFIER_INTERNAL = '__logstream__grafana_internal__';

const displayAlert = (datasourceName: string, region: string) =>
  store.dispatch(
    notifyApp(
      createErrorNotification(
        `CloudWatch request limit reached in ${region} for data source ${datasourceName}`,
        '',
        undefined,
        React.createElement(ThrottlingErrorMessage, { region }, null)
      )
    )
  );

const displayCustomError = (title: string, message: string) =>
  store.dispatch(notifyApp(createErrorNotification(title, message)));

export class CloudWatchDatasource
  extends DataSourceWithBackend<CloudWatchQuery, CloudWatchJsonData>
  implements DataSourceWithLogsContextSupport
{
  proxyUrl: any;
  defaultRegion: any;
  datasourceName: string;
  languageProvider: CloudWatchLanguageProvider;
  sqlCompletionItemProvider: SQLCompletionItemProvider;

  metricMathCompletionItemProvider: MetricMathCompletionItemProvider;

  tracingDataSourceUid?: string;
  logsTimeout: string;

  type = 'cloudwatch';
  standardStatistics = ['Average', 'Maximum', 'Minimum', 'Sum', 'SampleCount'];

  debouncedAlert: (datasourceName: string, region: string) => void = memoizedDebounce(
    displayAlert,
    AppNotificationTimeout.Error
  );
  debouncedCustomAlert: (title: string, message: string) => void = memoizedDebounce(
    displayCustomError,
    AppNotificationTimeout.Error
  );
  logQueries: Record<string, { id: string; region: string; statsQuery: boolean }> = {};

  constructor(
    instanceSettings: DataSourceInstanceSettings<CloudWatchJsonData>,
    private readonly templateSrv: TemplateSrv = getTemplateSrv(),
    private readonly timeSrv: TimeSrv = getTimeSrv()
  ) {
    super(instanceSettings);
    this.proxyUrl = instanceSettings.url;
    this.defaultRegion = instanceSettings.jsonData.defaultRegion;
    this.datasourceName = instanceSettings.name;
    this.languageProvider = new CloudWatchLanguageProvider(this);
    this.tracingDataSourceUid = instanceSettings.jsonData.tracingDatasourceUid;
    this.logsTimeout = instanceSettings.jsonData.logsTimeout || '15m';
    this.sqlCompletionItemProvider = new SQLCompletionItemProvider(this, this.templateSrv);
    this.metricMathCompletionItemProvider = new MetricMathCompletionItemProvider(this, this.templateSrv);
    this.variables = new CloudWatchVariableSupport(this, this.templateSrv);
  }

  query(options: DataQueryRequest<CloudWatchQuery>): Observable<DataQueryResponse> {
    options = cloneDeep(options);

    let queries = options.targets.filter((item) => item.id !== '' || item.hide !== true);
    const { logQueries, metricsQueries } = this.getTargetsByQueryMode(queries);

    const dataQueryResponses: Array<Observable<DataQueryResponse>> = [];
    if (logQueries.length > 0) {
      dataQueryResponses.push(this.handleLogQueries(logQueries, options));
    }

    if (metricsQueries.length > 0) {
      dataQueryResponses.push(this.handleMetricQueries(metricsQueries, options));
    }

    // No valid targets, return the empty result to save a round trip.
    if (isEmpty(dataQueryResponses)) {
      return of({
        data: [],
        state: LoadingState.Done,
      });
    }

    return merge(...dataQueryResponses);
  }

  /**
   * Handle log query. The log query works by starting the query on the CloudWatch and then periodically polling for
   * results.
   * @param logQueries
   * @param options
   */
  handleLogQueries = (
    logQueries: CloudWatchLogsQuery[],
    options: DataQueryRequest<CloudWatchQuery>
  ): Observable<DataQueryResponse> => {
    const validLogQueries = logQueries.filter((item) => item.logGroupNames?.length);
    if (logQueries.length > validLogQueries.length) {
      return of({ data: [], error: { message: 'Log group is required' } });
    }

    // No valid targets, return the empty result to save a round trip.
    if (isEmpty(validLogQueries)) {
      return of({ data: [], state: LoadingState.Done });
    }

    const queryParams = logQueries.map((target: CloudWatchLogsQuery) => ({
      queryString: target.expression || '',
      refId: target.refId,
      logGroupNames: target.logGroupNames,
      region: this.replace(this.getActualRegion(target.region), options.scopedVars, true, 'region'),
    }));

    const startTime = new Date();
    const timeoutFunc = () => {
      return Date.now() >= startTime.valueOf() + rangeUtil.intervalToMs(this.logsTimeout);
    };

    return runWithRetry(
      (targets: StartQueryRequest[]) => {
        return this.makeLogActionRequest('StartQuery', targets, {
          makeReplacements: true,
          scopedVars: options.scopedVars,
          skipCache: true,
        });
      },
      queryParams,
      timeoutFunc
    ).pipe(
      mergeMap(({ frames, error }: { frames: DataFrame[]; error?: DataQueryError }) =>
        // This queries for the results
        this.logsQuery(
          frames.map((dataFrame) => ({
            queryId: dataFrame.fields[0].values.get(0),
            region: dataFrame.meta?.custom?.['Region'] ?? 'default',
            refId: dataFrame.refId!,
            statsGroups: (logQueries.find((target) => target.refId === dataFrame.refId)! as CloudWatchLogsQuery)
              .statsGroups,
          })),
          timeoutFunc
        ).pipe(
          map((response: DataQueryResponse) => {
            if (!response.error && error) {
              response.error = error;
            }
            return response;
          })
        )
      ),
      mergeMap((dataQueryResponse) => {
        return from(
          (async () => {
            await addDataLinksToLogsResponse(
              dataQueryResponse,
              options,
              this.timeSrv.timeRange(),
              this.replace.bind(this),
              this.getActualRegion.bind(this),
              this.tracingDataSourceUid
            );

            return dataQueryResponse;
          })()
        );
      })
    );
  };

  filterQuery(query: CloudWatchQuery): boolean {
    if (query.queryMode === 'Logs') {
      return !!query.logGroupNames?.length;
    }
    const { region, metricQueryType, metricEditorMode, expression, metricName, namespace, sqlExpression, statistic } =
      query;
    if (!region) {
      return false;
    }
    if (metricQueryType === MetricQueryType.Search && metricEditorMode === MetricEditorMode.Builder) {
      return !!namespace && !!metricName && !!statistic;
    } else if (metricQueryType === MetricQueryType.Search && metricEditorMode === MetricEditorMode.Code) {
      return !!expression;
    } else if (metricQueryType === MetricQueryType.Query) {
      // still TBD how to validate the visual query builder for SQL
      return !!sqlExpression;
    }

    throw new Error('invalid metric editor mode');
  }

  handleMetricQueries = (
    metricQueries: CloudWatchMetricsQuery[],
    options: DataQueryRequest<CloudWatchQuery>
  ): Observable<DataQueryResponse> => {
    const validMetricsQueries = metricQueries
      .filter(this.filterQuery)
      .map((item: CloudWatchMetricsQuery): MetricQuery => {
        item.region = this.templateSrv.replace(this.getActualRegion(item.region), options.scopedVars);
        item.namespace = this.replace(item.namespace, options.scopedVars, true, 'namespace');
        item.metricName = this.replace(item.metricName, options.scopedVars, true, 'metric name');
        item.dimensions = this.convertDimensionFormat(item.dimensions ?? {}, options.scopedVars);
        item.statistic = this.templateSrv.replace(item.statistic, options.scopedVars);
        item.period = String(this.getPeriod(item, options)); // use string format for period in graph query, and alerting
        item.id = this.templateSrv.replace(item.id, options.scopedVars);
        item.expression = this.templateSrv.replace(item.expression, options.scopedVars);
        item.sqlExpression = this.templateSrv.replace(item.sqlExpression, options.scopedVars, 'raw');

        return {
          intervalMs: options.intervalMs,
          maxDataPoints: options.maxDataPoints,
          ...item,
          type: 'timeSeriesQuery',
          datasource: this.getRef(),
        };
      });

    // No valid targets, return the empty result to save a round trip.
    if (isEmpty(validMetricsQueries)) {
      return of({ data: [] });
    }

    const request = {
      from: options?.range?.from.valueOf().toString(),
      to: options?.range?.to.valueOf().toString(),
      queries: validMetricsQueries,
    };

    return this.performTimeSeriesQuery(request, options.range);
  };

  /**
   * Checks progress and polls data of a started logs query with some retry logic.
   * @param queryParams
   */
  logsQuery(
    queryParams: Array<{
      queryId: string;
      refId: string;
      limit?: number;
      region: string;
      statsGroups?: string[];
    }>,
    timeoutFunc: () => boolean
  ): Observable<DataQueryResponse> {
    this.logQueries = {};
    queryParams.forEach((param) => {
      this.logQueries[param.refId] = {
        id: param.queryId,
        region: param.region,
        statsQuery: (param.statsGroups?.length ?? 0) > 0 ?? false,
      };
    });

    const dataFrames = increasingInterval({ startPeriod: 100, endPeriod: 1000, step: 300 }).pipe(
      concatMap((_) => this.makeLogActionRequest('GetQueryResults', queryParams, { skipCache: true })),
      repeat(),
      share()
    );

    const consecutiveFailedAttempts = dataFrames.pipe(
      scan(
        ({ failures, prevRecordsMatched }, frames) => {
          failures++;
          for (const frame of frames) {
            const recordsMatched = frame.meta?.stats?.find((stat) => stat.displayName === 'Records scanned')?.value!;
            if (recordsMatched > (prevRecordsMatched[frame.refId!] ?? 0)) {
              failures = 0;
            }
            prevRecordsMatched[frame.refId!] = recordsMatched;
          }

          return { failures, prevRecordsMatched };
        },
        { failures: 0, prevRecordsMatched: {} as Record<string, number> }
      ),
      map(({ failures }) => failures),
      share()
    );

    const queryResponse: Observable<DataQueryResponse> = zip(dataFrames, consecutiveFailedAttempts).pipe(
      tap(([dataFrames]) => {
        for (const frame of dataFrames) {
          if (
            [
              CloudWatchLogsQueryStatus.Complete,
              CloudWatchLogsQueryStatus.Cancelled,
              CloudWatchLogsQueryStatus.Failed,
            ].includes(frame.meta?.custom?.['Status']) &&
            this.logQueries.hasOwnProperty(frame.refId!)
          ) {
            delete this.logQueries[frame.refId!];
          }
        }
      }),
      map(([dataFrames, failedAttempts]) => {
        if (timeoutFunc()) {
          for (const frame of dataFrames) {
            set(frame, 'meta.custom.Status', CloudWatchLogsQueryStatus.Cancelled);
          }
        }

        return {
          data: dataFrames,
          key: 'test-key',
          state: dataFrames.every((dataFrame) =>
            [
              CloudWatchLogsQueryStatus.Complete,
              CloudWatchLogsQueryStatus.Cancelled,
              CloudWatchLogsQueryStatus.Failed,
            ].includes(dataFrame.meta?.custom?.['Status'])
          )
            ? LoadingState.Done
            : LoadingState.Loading,
          error: timeoutFunc()
            ? {
                message: `error: query timed out after ${failedAttempts} attempts`,
                type: DataQueryErrorType.Timeout,
              }
            : undefined,
        };
      }),
      takeWhile(({ state }) => state !== LoadingState.Error && state !== LoadingState.Done, true)
    );

    return withTeardown(queryResponse, () => this.stopQueries());
  }

  stopQueries() {
    if (Object.keys(this.logQueries).length > 0) {
      this.makeLogActionRequest(
        'StopQuery',
        Object.values(this.logQueries).map((logQuery) => ({ queryId: logQuery.id, region: logQuery.region })),
        {
          makeReplacements: false,
          skipCache: true,
        }
      ).pipe(
        finalize(() => {
          this.logQueries = {};
        })
      );
    }
  }

  async describeLogGroups(params: DescribeLogGroupsRequest): Promise<string[]> {
    const dataFrames = await lastValueFrom(this.makeLogActionRequest('DescribeLogGroups', [params]));

    const logGroupNames = dataFrames[0]?.fields[0]?.values.toArray() ?? [];
    return logGroupNames;
  }

  async getLogGroupFields(params: GetLogGroupFieldsRequest): Promise<GetLogGroupFieldsResponse> {
    const dataFrames = await lastValueFrom(this.makeLogActionRequest('GetLogGroupFields', [params]));

    const fieldNames = dataFrames[0].fields[0].values.toArray();
    const fieldPercentages = dataFrames[0].fields[1].values.toArray();
    const getLogGroupFieldsResponse = {
      logGroupFields: fieldNames.map((val, i) => ({ name: val, percent: fieldPercentages[i] })) ?? [],
    };

    return getLogGroupFieldsResponse;
  }

  getLogRowContext = async (
    row: LogRowModel,
    { limit = 10, direction = 'BACKWARD' }: RowContextOptions = {}
  ): Promise<{ data: DataFrame[] }> => {
    let logStreamField = null;
    let logField = null;

    for (const field of row.dataFrame.fields) {
      if (field.name === LOGSTREAM_IDENTIFIER_INTERNAL) {
        logStreamField = field;
        if (logField !== null) {
          break;
        }
      } else if (field.name === LOG_IDENTIFIER_INTERNAL) {
        logField = field;
        if (logStreamField !== null) {
          break;
        }
      }
    }

    const requestParams: GetLogEventsRequest = {
      limit,
      startFromHead: direction !== 'BACKWARD',
      logGroupName: parseLogGroupName(logField!.values.get(row.rowIndex)),
      logStreamName: logStreamField!.values.get(row.rowIndex),
    };

    if (direction === 'BACKWARD') {
      requestParams.endTime = row.timeEpochMs;
    } else {
      requestParams.startTime = row.timeEpochMs;
    }

    const dataFrames = await lastValueFrom(this.makeLogActionRequest('GetLogEvents', [requestParams]));

    return {
      data: dataFrames,
    };
  };

  getVariables() {
    return this.templateSrv.getVariables().map((v) => `$${v.name}`);
  }

  getPeriod(target: CloudWatchMetricsQuery, options: any) {
    let period = this.templateSrv.replace(target.period, options.scopedVars) as any;
    if (period && period.toLowerCase() !== 'auto') {
      if (/^\d+$/.test(period)) {
        period = parseInt(period, 10);
      } else {
        period = rangeUtil.intervalToSeconds(period);
      }

      if (period < 1) {
        period = 1;
      }
    }

    return period || '';
  }

  performTimeSeriesQuery(request: MetricRequest, { from, to }: TimeRange): Observable<any> {
    return this.awsRequest(DS_QUERY_ENDPOINT, request).pipe(
      map((res) => {
        const dataframes: DataFrame[] = toDataQueryResponse({ data: res }).data;
        if (!dataframes || dataframes.length <= 0) {
          return { data: [] };
        }

        const lastError = findLast(res.results, (v) => !!v.error);

        dataframes.forEach((frame) => {
          frame.fields.forEach((field) => {
            if (field.type === FieldType.time) {
              // field.config.interval is populated in order for Grafana to fill in null values at frame intervals
              field.config.interval = frame.meta?.custom?.period * 1000;
            }
          });
        });

        return {
          data: dataframes,
          error: lastError ? { message: lastError.error } : null,
        };
      }),
      catchError((err) => {
        const isFrameError = err.data.results;

        // Error is not frame specific
        if (!isFrameError && err.data && err.data.message === 'Metric request error' && err.data.error) {
          err.message = err.data.error;
          return throwError(() => err);
        }

        // The error is either for a specific frame or for all the frames
        const results: Array<{ error?: string }> = Object.values(err.data.results);
        const firstErrorResult = results.find((r) => r.error);
        if (firstErrorResult) {
          err.message = firstErrorResult.error;
        }

        if (results.some((r) => r.error && /^Throttling:.*/.test(r.error))) {
          const failedRedIds = Object.keys(err.data.results);
          const regionsAffected = Object.values(request.queries).reduce(
            (res: string[], { refId, region }) =>
              (refId && !failedRedIds.includes(refId)) || res.includes(region) ? res : [...res, region],
            []
          ) as string[];
          regionsAffected.forEach((region) => {
            const actualRegion = this.getActualRegion(region);
            if (actualRegion) {
              this.debouncedAlert(this.datasourceName, actualRegion);
            }
          });
        }

        return throwError(() => err);
      })
    );
  }

  doMetricResourceRequest(subtype: string, parameters?: any): Promise<Array<{ text: any; label: any; value: any }>> {
    return this.getResource(subtype, parameters);
  }

  makeLogActionRequest(
    subtype: LogAction,
    queryParams: CloudWatchLogsRequest[],
    options: {
      scopedVars?: ScopedVars;
      makeReplacements?: boolean;
      skipCache?: boolean;
    } = {
      makeReplacements: true,
      skipCache: false,
    }
  ): Observable<DataFrame[]> {
    const range = this.timeSrv.timeRange();

    const requestParams = {
      from: range.from.valueOf().toString(),
      to: range.to.valueOf().toString(),
      queries: queryParams.map((param: CloudWatchLogsRequest) => ({
        refId: (param as StartQueryRequest).refId || 'A',
        intervalMs: 1, // dummy
        maxDataPoints: 1, // dummy
        datasource: this.getRef(),
        type: 'logAction',
        subtype: subtype,
        ...param,
      })),
    };

    if (options.makeReplacements) {
      requestParams.queries.forEach((query: CloudWatchLogsRequest) => {
        const fieldsToReplace: Array<
          keyof (GetLogEventsRequest & StartQueryRequest & DescribeLogGroupsRequest & GetLogGroupFieldsRequest)
        > = ['queryString', 'logGroupNames', 'logGroupName', 'logGroupNamePrefix'];

        const anyQuery: any = query;
        for (const fieldName of fieldsToReplace) {
          if (query.hasOwnProperty(fieldName)) {
            if (Array.isArray(anyQuery[fieldName])) {
              anyQuery[fieldName] = anyQuery[fieldName].map((val: string) =>
                this.replace(val, options.scopedVars, true, fieldName)
              );
            } else {
              anyQuery[fieldName] = this.replace(anyQuery[fieldName], options.scopedVars, true, fieldName);
            }
          }
        }
        // TODO: seems to be some sort of bug that we don't really send region with all queries. This means
        //  if you select different than default region in editor you will get results for autocomplete from wrong
        //  region.
        if (anyQuery.region) {
          anyQuery.region = this.replace(anyQuery.region, options.scopedVars, true, 'region');
          anyQuery.region = this.getActualRegion(anyQuery.region);
        }
      });
    }

    const resultsToDataFrames = (val: any): DataFrame[] => toDataQueryResponse(val).data || [];
    let headers = {};
    if (options.skipCache) {
      headers = {
        'X-Cache-Skip': true,
      };
    }

    return this.awsRequest(DS_QUERY_ENDPOINT, requestParams, headers).pipe(
      map((response) => resultsToDataFrames({ data: response })),
      catchError((err: FetchError) => {
        if (err.status === 400) {
          throw err;
        }

        if (err.data?.error) {
          throw err.data.error;
        } else if (err.data?.message) {
          // In PROD we do not supply .error
          throw err.data.message;
        }

        throw err;
      })
    );
  }

  getRegions(): Promise<Array<{ label: string; value: string; text: string }>> {
    return this.doMetricResourceRequest('regions').then((regions: any) => [
      { label: 'default', value: 'default', text: 'default' },
      ...regions,
    ]);
  }

  getNamespaces() {
    return this.doMetricResourceRequest('namespaces');
  }

  async getMetrics(namespace: string | undefined, region?: string) {
    if (!namespace) {
      return [];
    }

    return this.doMetricResourceRequest('metrics', {
      region: this.templateSrv.replace(this.getActualRegion(region)),
      namespace: this.templateSrv.replace(namespace),
    });
  }

  async getAllMetrics(region: string): Promise<Array<{ metricName: string; namespace: string }>> {
    const values = await this.doMetricResourceRequest('all-metrics', {
      region: this.templateSrv.replace(this.getActualRegion(region)),
    });

    return values.map((v) => ({ metricName: v.value, namespace: v.text }));
  }

  async getDimensionKeys(
    namespace: string | undefined,
    region: string,
    dimensionFilters: Dimensions = {},
    metricName = ''
  ) {
    if (!namespace) {
      return [];
    }

    return this.doMetricResourceRequest('dimension-keys', {
      region: this.templateSrv.replace(this.getActualRegion(region)),
      namespace: this.templateSrv.replace(namespace),
      dimensionFilters: JSON.stringify(this.convertDimensionFormat(dimensionFilters, {})),
      metricName,
    });
  }

  async getDimensionValues(
    region: string,
    namespace: string | undefined,
    metricName: string | undefined,
    dimensionKey: string,
    filterDimensions: {}
  ) {
    if (!namespace || !metricName) {
      return [];
    }

    const values = await this.doMetricResourceRequest('dimension-values', {
      region: this.templateSrv.replace(this.getActualRegion(region)),
      namespace: this.templateSrv.replace(namespace),
      metricName: this.templateSrv.replace(metricName.trim()),
      dimensionKey: this.templateSrv.replace(dimensionKey),
      dimensions: JSON.stringify(this.convertDimensionFormat(filterDimensions, {})),
    });

    return values;
  }

  getEbsVolumeIds(region: string, instanceId: string) {
    return this.doMetricResourceRequest('ebs-volume-ids', {
      region: this.templateSrv.replace(this.getActualRegion(region)),
      instanceId: this.templateSrv.replace(instanceId),
    });
  }

  getEc2InstanceAttribute(region: string, attributeName: string, filters: any) {
    return this.doMetricResourceRequest('ec2-instance-attribute', {
      region: this.templateSrv.replace(this.getActualRegion(region)),
      attributeName: this.templateSrv.replace(attributeName),
      filters: JSON.stringify(filters),
    });
  }

  getResourceARNs(region: string, resourceType: string, tags: any) {
    return this.doMetricResourceRequest('resource-arns', {
      region: this.templateSrv.replace(this.getActualRegion(region)),
      resourceType: this.templateSrv.replace(resourceType),
      tags: JSON.stringify(tags),
    });
  }

  annotationQuery(options: any) {
    const annotation = options.annotation;
    const statistic = this.templateSrv.replace(annotation.statistic);
    const defaultPeriod = annotation.prefixMatching ? '' : '300';
    let period = annotation.period || defaultPeriod;
    period = parseInt(period, 10);
    const parameters = {
      prefixMatching: annotation.prefixMatching,
      region: this.templateSrv.replace(this.getActualRegion(annotation.region)),
      namespace: this.templateSrv.replace(annotation.namespace),
      metricName: this.templateSrv.replace(annotation.metricName),
      dimensions: this.convertDimensionFormat(annotation.dimensions, {}),
      statistic: statistic,
      period: period,
      actionPrefix: annotation.actionPrefix || '',
      alarmNamePrefix: annotation.alarmNamePrefix || '',
    };

    return lastValueFrom(
      this.awsRequest(DS_QUERY_ENDPOINT, {
        from: options.range.from.valueOf().toString(),
        to: options.range.to.valueOf().toString(),
        queries: [
          {
            refId: 'annotationQuery',
            datasource: this.getRef(),
            type: 'annotationQuery',
            ...parameters,
          },
        ],
      }).pipe(
        map((r) => {
          const frames = toDataQueryResponse({ data: r }).data as DataFrame[];
          const table = toLegacyResponseData(frames[0]) as TableData;
          return table.rows.map((v) => ({
            annotation: annotation,
            time: Date.parse(v[0]),
            title: v[1],
            tags: [v[2]],
            text: v[3],
          }));
        })
      )
    );
  }

  targetContainsTemplate(target: any) {
    return (
      this.templateSrv.containsTemplate(target.region) ||
      this.templateSrv.containsTemplate(target.namespace) ||
      this.templateSrv.containsTemplate(target.metricName) ||
      this.templateSrv.containsTemplate(target.expression!) ||
      target.logGroupNames?.some((logGroup: string) => this.templateSrv.containsTemplate(logGroup)) ||
      find(target.dimensions, (v, k) => this.templateSrv.containsTemplate(k) || this.templateSrv.containsTemplate(v))
    );
  }

  awsRequest(url: string, data: MetricRequest, headers: Record<string, any> = {}): Observable<TSDBResponse> {
    const options = {
      method: 'POST',
      url,
      data,
      headers,
    };

    return getBackendSrv()
      .fetch<TSDBResponse>(options)
      .pipe(map((result) => result.data));
  }

  getDefaultRegion() {
    return this.defaultRegion;
  }

  getActualRegion(region?: string) {
    if (region === 'default' || region === undefined || region === '') {
      return this.getDefaultRegion();
    }
    return region;
  }

  showContextToggle() {
    return true;
  }

  convertToCloudWatchTime(date: any, roundUp: any) {
    if (isString(date)) {
      date = dateMath.parse(date, roundUp);
    }
    return Math.round(date.valueOf() / 1000);
  }

  convertDimensionFormat(dimensions: Dimensions, scopedVars: ScopedVars) {
    return Object.entries(dimensions).reduce((result, [key, value]) => {
      key = this.replace(key, scopedVars, true, 'dimension keys');

      if (Array.isArray(value)) {
        return { ...result, [key]: value };
      }

      if (!value) {
        return { ...result, [key]: null };
      }

      const valueVar = this.templateSrv
        .getVariables()
        .find(({ name }) => name === this.templateSrv.getVariableName(value));
      if (valueVar) {
        if ((valueVar as unknown as VariableWithMultiSupport).multi) {
          const values = this.templateSrv.replace(value, scopedVars, 'pipe').split('|');
          return { ...result, [key]: values };
        }
        return { ...result, [key]: [this.templateSrv.replace(value, scopedVars)] };
      }

      return { ...result, [key]: [value] };
    }, {});
  }

  replace(
    target?: string,
    scopedVars?: ScopedVars,
    displayErrorIfIsMultiTemplateVariable?: boolean,
    fieldName?: string
  ) {
    if (displayErrorIfIsMultiTemplateVariable && !!target) {
      const variable = this.templateSrv
        .getVariables()
        .find(({ name }) => name === this.templateSrv.getVariableName(target));
      if (variable && (variable as unknown as VariableWithMultiSupport).multi) {
        this.debouncedCustomAlert(
          'CloudWatch templating error',
          `Multi template variables are not supported for ${fieldName || target}`
        );
      }
    }

    return this.templateSrv.replace(target, scopedVars);
  }

  getQueryDisplayText(query: CloudWatchQuery) {
    if (query.queryMode === 'Logs') {
      return query.expression ?? '';
    } else {
      return JSON.stringify(query);
    }
  }

  getTargetsByQueryMode = (targets: CloudWatchQuery[]) => {
    const logQueries: CloudWatchLogsQuery[] = [];
    const metricsQueries: CloudWatchMetricsQuery[] = [];

    targets.forEach((query) => {
      const mode = query.queryMode ?? 'Metrics';
      if (mode === 'Logs') {
        logQueries.push(query as CloudWatchLogsQuery);
      } else {
        metricsQueries.push(query as CloudWatchMetricsQuery);
      }
    });

    return {
      logQueries,
      metricsQueries,
    };
  };

  interpolateVariablesInQueries(queries: CloudWatchQuery[], scopedVars: ScopedVars): CloudWatchQuery[] {
    if (!queries.length) {
      return queries;
    }

    return queries.map((query) => ({
      ...query,
      region: this.getActualRegion(this.replace(query.region, scopedVars)),
      expression: this.replace(query.expression, scopedVars),

      ...(!isCloudWatchLogsQuery(query) && this.interpolateMetricsQueryVariables(query, scopedVars)),
    }));
  }

  interpolateMetricsQueryVariables(
    query: CloudWatchMetricsQuery,
    scopedVars: ScopedVars
  ): Pick<CloudWatchMetricsQuery, 'alias' | 'metricName' | 'namespace' | 'period' | 'dimensions' | 'sqlExpression'> {
    return {
      alias: this.replace(query.alias, scopedVars),
      metricName: this.replace(query.metricName, scopedVars),
      namespace: this.replace(query.namespace, scopedVars),
      period: this.replace(query.period, scopedVars),
      sqlExpression: this.replace(query.sqlExpression, scopedVars),
      dimensions: Object.entries(query.dimensions ?? {}).reduce((prev, [key, value]) => {
        if (Array.isArray(value)) {
          return { ...prev, [key]: value };
        }

        return { ...prev, [this.replace(key, scopedVars)]: this.replace(value, scopedVars) };
      }, {}),
    };
  }
}

function withTeardown<T = any>(observable: Observable<T>, onUnsubscribe: () => void): Observable<T> {
  return new Observable<T>((subscriber) => {
    const innerSub = observable.subscribe({
      next: (val) => subscriber.next(val),
      error: (err) => subscriber.next(err),
      complete: () => subscriber.complete(),
    });

    return () => {
      innerSub.unsubscribe();
      onUnsubscribe();
    };
  });
}

function parseLogGroupName(logIdentifier: string): string {
  const colonIndex = logIdentifier.lastIndexOf(':');
  return logIdentifier.slice(colonIndex + 1);
}
