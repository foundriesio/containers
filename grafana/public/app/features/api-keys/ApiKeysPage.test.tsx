import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { NavModel } from '@grafana/data';
import { selectors } from '@grafana/e2e-selectors';
import { ApiKey, OrgRole } from 'app/types';

import { mockToolkitActionCreator } from '../../../test/core/redux/mocks';
import { silenceConsoleOutput } from '../../../test/core/utils/silenceConsoleOutput';

import { ApiKeysPageUnconnected, Props } from './ApiKeysPage';
import { getMultipleMockKeys } from './__mocks__/apiKeysMock';
import { setSearchQuery } from './state/reducers';

const setup = (propOverrides: Partial<Props>) => {
  const loadApiKeysMock = jest.fn();
  const deleteApiKeyMock = jest.fn();
  const addApiKeyMock = jest.fn();
  const toggleIncludeExpiredMock = jest.fn();
  const setSearchQueryMock = mockToolkitActionCreator(setSearchQuery);
  const props: Props = {
    navModel: {
      main: {
        text: 'Configuration',
      },
      node: {
        text: 'Api Keys',
      },
    } as NavModel,
    apiKeys: [] as ApiKey[],
    searchQuery: '',
    hasFetched: false,
    loadApiKeys: loadApiKeysMock,
    deleteApiKey: deleteApiKeyMock,
    setSearchQuery: setSearchQueryMock,
    addApiKey: addApiKeyMock,
    apiKeysCount: 0,
    timeZone: 'utc',
    includeExpired: false,
    includeExpiredDisabled: false,
    toggleIncludeExpired: toggleIncludeExpiredMock,
    canRead: true,
    canCreate: true,
    canDelete: true,
  };

  Object.assign(props, propOverrides);

  const { rerender } = render(<ApiKeysPageUnconnected {...props} />);
  return {
    rerender,
    props,
    loadApiKeysMock,
    setSearchQueryMock,
    deleteApiKeyMock,
    addApiKeyMock,
    toggleIncludeExpiredMock,
  };
};

describe('ApiKeysPage', () => {
  silenceConsoleOutput();
  describe('when mounted', () => {
    it('then it should call loadApiKeys', () => {
      const { loadApiKeysMock } = setup({});
      expect(loadApiKeysMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('when loading', () => {
    it('then should show Loading message', () => {
      setup({ hasFetched: false });
      expect(screen.getByText(/loading \.\.\./i)).toBeInTheDocument();
    });
  });

  describe('when there are no API keys', () => {
    it('then it should render CTA', () => {
      setup({ apiKeys: getMultipleMockKeys(0), apiKeysCount: 0, hasFetched: true });
      expect(screen.getByTestId(selectors.components.CallToActionCard.buttonV2('New API key'))).toBeInTheDocument();
    });
  });

  describe('when there are API keys', () => {
    it('then it should render API keys table', async () => {
      const apiKeys = [
        { id: 1, name: 'First', role: OrgRole.Admin, secondsToLive: 60, expiration: '2021-01-01' },
        { id: 2, name: 'Second', role: OrgRole.Editor, secondsToLive: 60, expiration: '2021-01-02' },
        { id: 3, name: 'Third', role: OrgRole.Viewer, secondsToLive: 0, expiration: undefined },
      ];
      setup({ apiKeys, apiKeysCount: apiKeys.length, hasFetched: true });
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getAllByRole('row').length).toBe(4);
      expect(screen.getByRole('row', { name: /first admin 2021-01-01 00:00:00/i })).toBeInTheDocument();
      expect(screen.getByRole('row', { name: /second editor 2021-01-02 00:00:00/i })).toBeInTheDocument();
      expect(screen.getByRole('row', { name: /third viewer no expiration date/i })).toBeInTheDocument();
    });
  });

  describe('when a user toggles the Show expired toggle', () => {
    it('then it should dispatch toggleIncludeExpired', async () => {
      const apiKeys = getMultipleMockKeys(3);
      const { toggleIncludeExpiredMock } = setup({ apiKeys, apiKeysCount: apiKeys.length, hasFetched: true });

      toggleShowExpired();
      expect(toggleIncludeExpiredMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('when a user searches for an API key', () => {
    it('then it should dispatch setSearchQuery with correct parameters', async () => {
      const apiKeys = getMultipleMockKeys(3);
      const { setSearchQueryMock } = setup({ apiKeys, apiKeysCount: apiKeys.length, hasFetched: true });

      setSearchQueryMock.mockClear();
      expect(screen.getByPlaceholderText(/search keys/i)).toBeInTheDocument();
      userEvent.type(screen.getByPlaceholderText(/search keys/i), 'First');
      expect(setSearchQueryMock).toHaveBeenCalledTimes(5);
    });
  });

  describe('when a user deletes an API key', () => {
    it('then it should dispatch deleteApi with correct parameters', async () => {
      const apiKeys = [
        { id: 1, name: 'First', role: OrgRole.Admin, secondsToLive: 60, expiration: '2021-01-01' },
        { id: 2, name: 'Second', role: OrgRole.Editor, secondsToLive: 60, expiration: '2021-01-02' },
        { id: 3, name: 'Third', role: OrgRole.Viewer, secondsToLive: 0, expiration: undefined },
      ];
      const { deleteApiKeyMock } = setup({ apiKeys, apiKeysCount: apiKeys.length, hasFetched: true });
      const firstRow = screen.getByRole('row', { name: /first admin 2021-01-01 00:00:00/i });
      const secondRow = screen.getByRole('row', { name: /second editor 2021-01-02 00:00:00/i });

      deleteApiKeyMock.mockClear();
      expect(within(firstRow).getByLabelText('Delete API key')).toBeInTheDocument();
      userEvent.click(within(firstRow).getByLabelText('Delete API key'));

      expect(within(firstRow).getByRole('button', { name: /delete$/i })).toBeInTheDocument();
      userEvent.click(within(firstRow).getByRole('button', { name: /delete$/i }));
      expect(deleteApiKeyMock).toHaveBeenCalledTimes(1);
      expect(deleteApiKeyMock).toHaveBeenCalledWith(1);

      toggleShowExpired();

      deleteApiKeyMock.mockClear();
      expect(within(secondRow).getByLabelText('Delete API key')).toBeInTheDocument();
      userEvent.click(within(secondRow).getByLabelText('Delete API key'));
      expect(within(secondRow).getByRole('button', { name: /delete$/i })).toBeInTheDocument();
      userEvent.click(within(secondRow).getByRole('button', { name: /delete$/i }), undefined, {
        skipPointerEventsCheck: true,
      });
      expect(deleteApiKeyMock).toHaveBeenCalledTimes(1);
      expect(deleteApiKeyMock).toHaveBeenCalledWith(2);
    });
  });

  describe('when a user adds an API key from CTA', () => {
    it('then it should call addApiKey with correct parameters', async () => {
      const apiKeys: any[] = [];
      const { addApiKeyMock } = setup({ apiKeys, apiKeysCount: apiKeys.length, hasFetched: true });

      addApiKeyMock.mockClear();
      userEvent.click(screen.getByTestId(selectors.components.CallToActionCard.buttonV2('New API key')));
      await addAndVerifyApiKey(addApiKeyMock);
    });
  });

  describe('when a user adds an API key from Add API key', () => {
    it('then it should call addApiKey with correct parameters', async () => {
      const apiKeys = getMultipleMockKeys(1);
      const { addApiKeyMock } = setup({ apiKeys, apiKeysCount: apiKeys.length, hasFetched: true });

      addApiKeyMock.mockClear();
      userEvent.click(screen.getByRole('button', { name: /add api key/i }));
      await addAndVerifyApiKey(addApiKeyMock);

      toggleShowExpired();

      addApiKeyMock.mockClear();
      userEvent.click(screen.getByRole('button', { name: /add api key/i }));
      await addAndVerifyApiKey(addApiKeyMock);
    });
  });

  describe('when a user adds an API key with an invalid expiration', () => {
    it('then it should display a message', async () => {
      const apiKeys = getMultipleMockKeys(1);
      const { addApiKeyMock } = setup({ apiKeys, apiKeysCount: apiKeys.length, hasFetched: true });

      addApiKeyMock.mockClear();
      userEvent.click(screen.getByRole('button', { name: /add api key/i }));
      userEvent.type(screen.getByPlaceholderText(/name/i), 'Test');
      userEvent.type(screen.getByPlaceholderText(/1d/i), '60x');
      expect(screen.queryByText(/not a valid duration/i)).not.toBeInTheDocument();
      userEvent.click(screen.getByRole('button', { name: /^add$/i }));
      expect(screen.getByText(/not a valid duration/i)).toBeInTheDocument();
      expect(addApiKeyMock).toHaveBeenCalledTimes(0);
    });
  });
});

function toggleShowExpired() {
  expect(screen.queryByLabelText(/include expired keys/i)).toBeInTheDocument();
  userEvent.click(screen.getByLabelText(/include expired keys/i));
}

async function addAndVerifyApiKey(addApiKeyMock: jest.Mock) {
  expect(screen.getByRole('heading', { name: /add api key/i })).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/1d/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /^add$/i })).toBeInTheDocument();

  userEvent.type(screen.getByPlaceholderText(/name/i), 'Test');
  userEvent.type(screen.getByPlaceholderText(/1d/i), '60s');
  userEvent.click(screen.getByRole('button', { name: /^add$/i }));
  expect(addApiKeyMock).toHaveBeenCalledTimes(1);
  expect(addApiKeyMock).toHaveBeenCalledWith({ name: 'Test', role: 'Viewer', secondsToLive: 60 }, expect.anything());
}
