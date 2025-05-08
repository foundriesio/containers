import { shallow } from 'enzyme';
import React from 'react';
import { mockToolkitActionCreator } from 'test/core/redux/mocks';

import { Props, UsersActionBar } from './UsersActionBar';
import { setUsersSearchQuery } from './state/reducers';

jest.mock('app/core/core', () => ({
  contextSrv: {
    hasPermission: () => true,
    hasAccess: () => true,
  },
}));

const setup = (propOverrides?: object) => {
  const props: Props = {
    searchQuery: '',
    setUsersSearchQuery: mockToolkitActionCreator(setUsersSearchQuery),
    onShowInvites: jest.fn(),
    pendingInvitesCount: 0,
    canInvite: false,
    externalUserMngLinkUrl: '',
    externalUserMngLinkName: '',
    showInvites: false,
  };

  Object.assign(props, propOverrides);

  return shallow(<UsersActionBar {...props} />);
};

describe('Render', () => {
  it('should render component', () => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();
  });

  it('should render pending invites button', () => {
    const wrapper = setup({
      pendingInvitesCount: 5,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should show invite button', () => {
    const wrapper = setup({
      canInvite: true,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should show external user management button', () => {
    const wrapper = setup({
      externalUserMngLinkUrl: 'some/url',
    });

    expect(wrapper).toMatchSnapshot();
  });
});
