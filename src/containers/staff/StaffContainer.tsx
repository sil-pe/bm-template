import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { updateRating } from './actions';
import { ApplicationState, StaffState } from 'src/store/types';
import * as styles from './Staff.scss';
import { sortByKeyName } from './utils';

// Component

interface IStaffStateProps {
  staffList: StaffState[]
}

interface IStaffDispatchProps {
  updateRating: any
}

interface IStaffProps extends IStaffStateProps, IStaffDispatchProps { }

interface IStaffState {
  staffList: StaffState[]
}


export class Staff extends React.Component<IStaffProps, IStaffState> {

  constructor(props: IStaffProps) {
    super(props);
    this.state = {
      staffList: props.staffList
    }
  }

  handleRatingChange(staffIndex: number, rating: number) {
    this.props.updateRating({staffIndex, rating})
  }

  sortByRating = () => {
    this.setState({
      staffList: sortByKeyName(this.state.staffList, 'rating')
    });
  }

  sortByBirthdate = () => {
    this.setState({
      staffList: sortByKeyName(this.state.staffList, 'birthDate')
    });
  }

  render() {
    const { staffList } = this.state;
    return (
      <table className={styles.table}>
        <thead>
          <tr>
            <th> Name </th>
            <th> Job </th>
            <th onClick={this.sortByBirthdate}> Birthdate </th>
            <th onClick={this.sortByRating}> Rating </th>
          </tr>
        </thead>
        <tbody>
          {
            staffList.map((staff, index) => (
              <tr key={index}>
                <td> {staff.name} </td>
                <td> {staff.role} </td>
                <td> {staff.birthDate} </td>
                <td> <input onChange={(e) => this.handleRatingChange(index, parseInt(e.target.value))} type={'number'} min={1} max={5} value={staff.rating} /> </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

// Container

const mapStateToProps = (state: ApplicationState): IStaffStateProps => {
  return {
    staffList: state.staffListState
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IStaffDispatchProps => {
  return {
    updateRating: (obj: any) => dispatch( updateRating(obj) )
  };
};

export const StaffContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Staff);
