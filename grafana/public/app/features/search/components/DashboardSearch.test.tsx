import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { selectors } from '@grafana/e2e-selectors';
import { locationService, setEchoSrv } from '@grafana/runtime';
import { selectOptionInTest } from '@grafana/ui';
import * as MockSearchSrv from 'app/core/services/__mocks__/search_srv';
import { Echo } from 'app/core/services/echo/Echo';
import * as SearchSrv from 'app/core/services/search_srv';

import { searchResults } from '../testData';
import { SearchLayout } from '../types';

import { DashboardSearch, Props } from './DashboardSearch';

jest.mock('app/core/services/search_srv');
// Typecast the mock search so the mock import is correctly recognised by TS
// https://stackoverflow.com/a/53222290
const { mockSearch } = SearchSrv as typeof MockSearchSrv;

beforeEach(() => {
  jest.useFakeTimers('modern');
  mockSearch.mockClear();
});

afterEach(() => {
  jest.useRealTimers();
});

const setup = (testProps?: Partial<Props>) => {
  const props: any = {
    onCloseSearch: () => {},
    ...testProps,
  };
  render(<DashboardSearch {...props} />);
  jest.runOnlyPendingTimers();
};

/**
 * Need to wrap component render in async act and use jest.runAllTimers to test
 * calls inside useDebounce hook
 */
describe('DashboardSearch', () => {
  beforeAll(() => {
    setEchoSrv(new Echo());
  });

  it('should call search api with default query when initialised', async () => {
    locationService.push('/');
    setup();

    await waitFor(() => screen.getByPlaceholderText('Search dashboards by name'));

    expect(mockSearch).toHaveBeenCalledTimes(1);
    expect(mockSearch).toHaveBeenCalledWith({
      query: '',
      tag: [],
      skipRecent: false,
      skipStarred: false,
      starred: false,
      folderIds: [],
      layout: SearchLayout.Folders,
      sort: undefined,
      prevSort: null,
    });
  });

  it('should call api with updated query on query change', async () => {
    locationService.push('/');
    setup();

    const input = await screen.findByPlaceholderText('Search dashboards by name');
    await act((async () => {
      await fireEvent.input(input, { target: { value: 'Test' } });
      jest.runOnlyPendingTimers();
    }) as any);

    expect(mockSearch).toHaveBeenCalledWith({
      query: 'Test',
      skipRecent: false,
      skipStarred: false,
      tag: [],
      starred: false,
      folderIds: [],
      layout: SearchLayout.Folders,
      sort: undefined,
      prevSort: null,
    });
  });

  it("should render 'No results' message when there are no dashboards", async () => {
    locationService.push('/');
    setup();

    const message = await screen.findByText('No dashboards matching your query were found.');
    expect(message).toBeInTheDocument();
  });

  it('should render search results', async () => {
    mockSearch.mockResolvedValueOnce(searchResults);

    locationService.push('/');
    setup();

    const section = await screen.findAllByTestId(selectors.components.Search.sectionV2);
    expect(section).toHaveLength(2);
    expect(screen.getAllByTestId(selectors.components.Search.itemsV2)).toHaveLength(1);
  });

  it('should call search with selected tags', async () => {
    locationService.push('/');
    setup();

    await waitFor(() => screen.getByLabelText('Tag filter'));

    const tagComponent = screen.getByLabelText('Tag filter');
    await selectOptionInTest(tagComponent, 'tag1');

    expect(tagComponent).toBeInTheDocument();

    await waitFor(() =>
      expect(mockSearch).toHaveBeenCalledWith({
        query: '',
        skipRecent: false,
        skipStarred: false,
        tag: ['tag1'],
        starred: false,
        folderIds: [],
        layout: SearchLayout.Folders,
        sort: undefined,
        prevSort: null,
      })
    );
  });

  it('should call search api with provided search params', async () => {
    locationService.partial({ query: 'test query', tag: ['tag1'], sort: 'asc' });
    setup({});

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledTimes(1);
      expect(mockSearch).toHaveBeenCalledWith(
        expect.objectContaining({
          query: 'test query',
          tag: ['tag1'],
          sort: 'asc',
        })
      );
    });
  });
});
