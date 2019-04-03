import * as React from 'react'
import { shallow } from 'enzyme';
import * as sinon from 'sinon';
import {expect} from 'chai';
import { Table } from './Table';

describe('<Table/> component', () => {
  const data = [
    {x: 3, y: 'xcvb'},
    {x: 9, y: 'acv'},
  ];

  const sortX = sinon.spy();
  const sortY = sinon.spy();

  it('Should render properly', () => {

    const wrapper = shallow(<Table {...{data, sortX, sortY}}/>);

    expect(wrapper.find('tr').length).to.be.eq(2);

    wrapper.find('.sort-x').simulate('click');
    expect(sortX.callCount).to.be.eq(1);

    const yHeader = wrapper.find('.sort-y');
    yHeader.simulate('click');
    yHeader.simulate('click');
    expect(sortY.callCount).to.be.eq(2);
  })
});
