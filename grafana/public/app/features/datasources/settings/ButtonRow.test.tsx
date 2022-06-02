import { shallow } from 'enzyme';
import React from 'react';

import ButtonRow, { Props } from './ButtonRow';

jest.mock('app/core/core', () => {
  return {
    contextSrv: {
      hasPermission: () => true,
    },
  };
});

const setup = (propOverrides?: object) => {
  const props: Props = {
    canSave: false,
    canDelete: false,
    onSubmit: jest.fn(),
    onDelete: jest.fn(),
    onTest: jest.fn(),
    exploreUrl: '/explore',
  };

  Object.assign(props, propOverrides);

  return shallow(<ButtonRow {...props} />);
};

describe('Render', () => {
  it('should render component', () => {
    const wrapper = setup();

    expect(wrapper).toMatchSnapshot();
  });

  it('should render with buttons enabled', () => {
    const wrapper = setup({
      canSave: true,
      canDelete: true,
    });

    expect(wrapper).toMatchSnapshot();
  });
});
