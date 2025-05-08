import { dateTime, DataQuery } from '@grafana/data';
import store from 'app/core/store';

import { RichHistoryQuery } from '../../types';
import RichHistoryStorage, { RichHistoryStorageWarning } from '../history/RichHistoryStorage';

import {
  addToRichHistory,
  updateStarredInRichHistory,
  updateCommentInRichHistory,
  mapNumbertoTimeInSlider,
  createDateStringFromTs,
  createQueryHeading,
  deleteAllFromRichHistory,
  deleteQueryInRichHistory,
  filterAndSortQueries,
  SortOrder,
} from './richHistory';

const richHistoryStorageMock: RichHistoryStorage = {} as RichHistoryStorage;

jest.mock('../history/richHistoryStorageProvider', () => {
  return {
    getRichHistoryStorage: () => richHistoryStorageMock,
  };
});

interface MockQuery extends DataQuery {
  expr: string;
  maxLines?: number | null;
}

const storedHistory: Array<RichHistoryQuery<MockQuery>> = [
  {
    id: '1',
    createdAt: 1,
    comment: '',
    datasourceUid: 'datasource uid',
    datasourceName: 'datasource history name',
    queries: [
      { expr: 'query1', maxLines: null, refId: '1' },
      { expr: 'query2', refId: '2' },
    ],
    starred: true,
  },
];

const mock: any = {
  testComment: '',
  testDatasourceUid: 'datasourceUid',
  testDatasourceName: 'datasourceName',
  testQueries: [
    { expr: 'query3', refId: 'B' },
    { expr: 'query4', refId: 'C' },
  ],
  testSessionName: '',
  testStarred: false,
};

const key = 'grafana.explore.richHistory';

describe('richHistory', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(1970, 0, 1));

    richHistoryStorageMock.addToRichHistory = jest.fn((r) => {
      return Promise.resolve({ richHistoryQuery: { ...r, id: 'GENERATED ID', createdAt: Date.now() } });
    });
    richHistoryStorageMock.deleteAll = jest.fn().mockResolvedValue({});
    richHistoryStorageMock.deleteRichHistory = jest.fn().mockResolvedValue({});
    richHistoryStorageMock.getRichHistory = jest.fn().mockResolvedValue({});
    richHistoryStorageMock.updateComment = jest.fn((id, comment) => {
      return {
        ...mock,
        comment,
      };
    });
    richHistoryStorageMock.updateStarred = jest.fn((id, starred) => {
      return {
        ...mock,
        starred,
      };
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('addToRichHistory', () => {
    beforeEach(() => {
      deleteAllFromRichHistory();
      expect(store.exists(key)).toBeFalsy();
    });

    it('should append query to query history', async () => {
      Date.now = jest.fn(() => 2);
      const { limitExceeded, richHistoryStorageFull } = await addToRichHistory(
        mock.testDatasourceUid,
        mock.testDatasourceName,
        mock.testQueries,
        mock.testStarred,
        mock.testComment,
        true,
        true
      );
      expect(limitExceeded).toBeFalsy();
      expect(richHistoryStorageFull).toBeFalsy();
      expect(richHistoryStorageMock.addToRichHistory).toBeCalledWith({
        datasourceUid: mock.testDatasourceUid,
        datasourceName: mock.testDatasourceName,
        starred: mock.testStarred,
        comment: mock.testComment,
        queries: mock.testQueries,
      });
    });

    it('it should return a flag indicating that the limit has been exceed', async () => {
      Date.now = jest.fn(() => 2);

      richHistoryStorageMock.addToRichHistory = jest.fn((query) => {
        return Promise.resolve({
          richHistoryQuery: { ...query, id: 'GENERATED ID', createdAt: Date.now() },
          warning: {
            type: RichHistoryStorageWarning.LimitExceeded,
            message: 'Limit exceeded',
          },
        });
      });

      const { richHistoryStorageFull, limitExceeded } = await addToRichHistory(
        mock.testDatasourceUid,
        mock.testDatasourceName,
        mock.testQueries,
        mock.testStarred,
        mock.testComment,
        true,
        true
      );
      expect(richHistoryStorageFull).toBeFalsy();
      expect(limitExceeded).toBeTruthy();
    });
  });

  describe('updateStarredInRichHistory', () => {
    it('should update starred in query in history', async () => {
      const updatedStarred = await updateStarredInRichHistory('1', !mock.starred);
      expect(updatedStarred!.starred).toEqual(!mock.starred);
    });
  });

  describe('updateCommentInRichHistory', () => {
    it('should update comment in query in history', async () => {
      const updatedComment = await updateCommentInRichHistory('1', 'new comment');
      expect(updatedComment!.comment).toEqual('new comment');
    });
  });

  describe('deleteQueryInRichHistory', () => {
    it('should delete query in query in history', async () => {
      const deletedHistoryId = await deleteQueryInRichHistory('1');
      expect(deletedHistoryId).toEqual('1');
    });
  });

  describe('mapNumbertoTimeInSlider', () => {
    it('should correctly map number to value', () => {
      const value = mapNumbertoTimeInSlider(25);
      expect(value).toEqual('25 days ago');
    });
  });

  describe('createDateStringFromTs', () => {
    it('should correctly create string value from timestamp', () => {
      const value = createDateStringFromTs(1583932327000);
      expect(value).toEqual('March 11');
    });
  });

  describe('filterQueries', () => {
    it('should filter out queries based on data source filter', () => {
      const filteredQueries = filterAndSortQueries(
        storedHistory,
        SortOrder.Ascending,
        ['not provided data source'],
        ''
      );
      expect(filteredQueries).toHaveLength(0);
    });
    it('should keep queries based on data source filter', () => {
      const filteredQueries = filterAndSortQueries(storedHistory, SortOrder.Ascending, ['datasource history name'], '');
      expect(filteredQueries).toHaveLength(1);
    });
    it('should filter out all queries based on search filter', () => {
      const filteredQueries = filterAndSortQueries(storedHistory, SortOrder.Ascending, [], 'i do not exist in query');
      expect(filteredQueries).toHaveLength(0);
    });
    it('should include queries based on search filter', () => {
      const filteredQueries = filterAndSortQueries(storedHistory, SortOrder.Ascending, [], 'query1');
      expect(filteredQueries).toHaveLength(1);
    });
  });

  describe('createQueryHeading', () => {
    it('should correctly create heading for queries when sort order is ascending ', () => {
      // Have to offset the timezone of a 1 microsecond epoch, and then reverse the changes
      storedHistory[0].createdAt = 1 + -1 * dateTime().utcOffset() * 60 * 1000;
      const heading = createQueryHeading(storedHistory[0], SortOrder.Ascending);
      expect(heading).toEqual('January 1');
    });
    it('should correctly create heading for queries when sort order is datasourceAZ ', () => {
      const heading = createQueryHeading(storedHistory[0], SortOrder.DatasourceAZ);
      expect(heading).toEqual(storedHistory[0].datasourceName);
    });
  });
});
