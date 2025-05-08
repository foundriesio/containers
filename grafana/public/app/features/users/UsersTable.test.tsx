import { shallow } from 'enzyme';
import React from 'react';

import { ConfirmModal } from '@grafana/ui';
import { OrgUser } from 'app/types';

import UsersTable, { Props } from './UsersTable';
import { getMockUsers } from './__mocks__/userMocks';

jest.mock('app/core/core', () => ({
  contextSrv: {
    hasPermission: () => true,
    hasPermissionInMetadata: () => true,
    licensedAccessControlEnabled: () => false,
  },
}));

const setup = (propOverrides?: object) => {
  const props: Props = {
    users: [] as OrgUser[],
    onRoleChange: jest.fn(),
    onRemoveUser: jest.fn(),
  };

  Object.assign(props, propOverrides);

  return shallow(<UsersTable {...props} />);
};

describe('Render', () => {
  it('should render component', () => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();
  });

  it('should render users table', () => {
    const wrapper = setup({
      users: getMockUsers(5),
    });

    expect(wrapper).toMatchSnapshot();
  });
});

describe('Remove modal', () => {
  it('should render correct amount', () => {
    const wrapper = setup({
      users: getMockUsers(3),
    });
    expect(wrapper.find(ConfirmModal).length).toEqual(0);
  });
});
