import { shallow } from 'enzyme';
import React from 'react';
import { mockToolkitActionCreator } from 'test/core/redux/mocks';

import { NavModel } from '@grafana/data';
import { contextSrv, User } from 'app/core/services/context_srv';

import { OrgRole, Team } from '../../types';

import { Props, TeamList } from './TeamList';
import { getMockTeam, getMultipleMockTeams } from './__mocks__/teamMocks';
import { setSearchQuery, setTeamsSearchPage } from './state/reducers';

jest.mock('app/core/config', () => {
  return {
    featureToggles: { accesscontrol: false },
  };
});

const setup = (propOverrides?: object) => {
  const props: Props = {
    navModel: {
      main: {
        text: 'Configuration',
      },
      node: {
        text: 'Team List',
      },
    } as NavModel,
    teams: [] as Team[],
    loadTeams: jest.fn(),
    deleteTeam: jest.fn(),
    setSearchQuery: mockToolkitActionCreator(setSearchQuery),
    setTeamsSearchPage: mockToolkitActionCreator(setTeamsSearchPage),
    searchQuery: '',
    searchPage: 1,
    teamsCount: 0,
    hasFetched: false,
    editorsCanAdmin: false,
    signedInUser: {
      id: 1,
      orgRole: OrgRole.Viewer,
    } as User,
  };

  Object.assign(props, propOverrides);

  contextSrv.user = props.signedInUser;

  const wrapper = shallow(<TeamList {...props} />);
  const instance = wrapper.instance() as TeamList;

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

  it('should render teams table', () => {
    const { wrapper } = setup({
      teams: getMultipleMockTeams(5),
      teamsCount: 5,
      hasFetched: true,
    });

    expect(wrapper).toMatchSnapshot();
  });

  describe('when feature toggle editorsCanAdmin is turned on', () => {
    describe('and signedin user is not viewer', () => {
      it('should enable the new team button', () => {
        const { wrapper } = setup({
          teams: getMultipleMockTeams(1),
          teamsCount: 1,
          hasFetched: true,
          editorsCanAdmin: true,
          signedInUser: {
            id: 1,
            orgRole: OrgRole.Editor,
          } as User,
        });

        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('and signedin user is a viewer', () => {
      it('should disable the new team button', () => {
        const { wrapper } = setup({
          teams: getMultipleMockTeams(1),
          teamsCount: 1,
          hasFetched: true,
          editorsCanAdmin: true,
          signedInUser: {
            id: 1,
            orgRole: OrgRole.Viewer,
          } as User,
        });

        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});

describe('Life cycle', () => {
  it('should call loadTeams', () => {
    const { instance } = setup();

    instance.componentDidMount();

    expect(instance.props.loadTeams).toHaveBeenCalled();
  });
});

describe('Functions', () => {
  describe('Delete team', () => {
    it('should call delete team', () => {
      const { instance } = setup();
      instance.deleteTeam(getMockTeam());

      expect(instance.props.deleteTeam).toHaveBeenCalledWith(1);
    });
  });

  describe('on search query change', () => {
    it('should call setSearchQuery', () => {
      const { instance } = setup();

      instance.onSearchQueryChange('test');

      expect(instance.props.setSearchQuery).toHaveBeenCalledWith('test');
    });
  });
});
