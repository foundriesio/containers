import { shallow } from 'enzyme';
import React from 'react';

import { NavModel, createTheme } from '@grafana/data';
import { getRouteComponentProps } from 'app/core/navigation/__mocks__/routeProps';
import { User } from 'app/core/services/context_srv';

import { OrgRole, Team, TeamMember } from '../../types';

import { Props, TeamPages } from './TeamPages';
import { getMockTeam } from './__mocks__/teamMocks';

jest.mock('@grafana/runtime/src/config', () => ({
  ...(jest.requireActual('@grafana/runtime/src/config') as unknown as object),
  config: {
    licenseInfo: {
      enabledFeatures: { teamsync: true },
    },
    featureToggles: { accesscontrol: false },
  },
}));

const setup = (propOverrides?: object) => {
  const props: Props = {
    ...getRouteComponentProps({
      match: {
        params: {
          id: '1',
          page: null,
        },
      } as any,
    }),
    navModel: {} as NavModel,
    teamId: 1,
    loadTeam: jest.fn(),
    loadTeamMembers: jest.fn(),
    pageName: 'members',
    team: {} as Team,
    members: [] as TeamMember[],
    editorsCanAdmin: false,
    theme: createTheme(),
    signedInUser: {
      id: 1,
      isGrafanaAdmin: false,
      orgRole: OrgRole.Viewer,
    } as User,
  };

  Object.assign(props, propOverrides);

  const wrapper = shallow(<TeamPages {...props} />);
  const instance = wrapper.instance();

  return {
    wrapper,
    instance,
  };
};

describe('Render', () => {
  it('should render component', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });

  it('should render member page if team not empty', () => {
    const { wrapper } = setup({
      team: getMockTeam(),
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should render settings and preferences page', () => {
    const { wrapper } = setup({
      team: getMockTeam(),
      pageName: 'settings',
      preferences: {
        homeDashboardId: 1,
        theme: 'Default',
        timezone: 'Default',
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should render group sync page', () => {
    const { wrapper } = setup({
      team: getMockTeam(),
      pageName: 'groupsync',
    });

    expect(wrapper).toMatchSnapshot();
  });

  describe('when feature toggle editorsCanAdmin is turned on', () => {
    it('should render settings page if user is team admin', () => {
      const { wrapper } = setup({
        team: getMockTeam(),
        pageName: 'settings',
        preferences: {
          homeDashboardId: 1,
          theme: 'Default',
          timezone: 'Default',
        },
        editorsCanAdmin: true,
        signedInUser: {
          id: 1,
          isGrafanaAdmin: false,
          orgRole: OrgRole.Admin,
        } as User,
      });

      expect(wrapper).toMatchSnapshot();
    });

    it('should not render settings page if user is team member', () => {
      const { wrapper } = setup({
        team: getMockTeam(),
        pageName: 'settings',
        preferences: {
          homeDashboardId: 1,
          theme: 'Default',
          timezone: 'Default',
        },
        editorsCanAdmin: true,
        signedInUser: {
          id: 1,
          isGrafanaAdmin: false,
          orgRole: OrgRole.Viewer,
        } as User,
      });

      expect(wrapper).toMatchSnapshot();
    });
  });
});
