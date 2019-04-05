import { expect } from 'chai';
import { sortByKeyName } from './utils';
import { StaffState } from 'src/store/types';


describe('Sorting' , () => {

  it('should sort by rating', () => {
    const staffList = [{rating: 2}, {rating: 1}];
    const sortedStaffList = [{rating: 1}, {rating: 2}];
    expect( sortByKeyName(staffList as StaffState[], 'rating') ).to.eql(sortedStaffList);
  });

  it('should sort by birthdate', () => {
    const staffList = [{birthDate: '1991-10-19'}, {birthDate: '1983-04-12'}];
    const sortedStaffList = [{birthDate: '1983-04-12'}, {birthDate: '1991-10-19'}];
    expect( sortByKeyName(staffList as StaffState[], 'birthDate') ).to.eql(sortedStaffList);
  });

});
