import {connect} from 'react-redux';
import {
  switchToOffline, switchToOnline, windowResized
} from './actions';
import {Dashboard, DashboardDispatchProps, DashboardStateProps} from './Dashboard';
import {ApplicationState, Dispatch} from '../../store/types';

export const mapDispatchToProps = (dispatch: Dispatch): DashboardDispatchProps => ({
  onOnline: () => dispatch(switchToOnline()),
  onOffline: () => dispatch(switchToOffline()),
  onResize: () => dispatch(windowResized())
});

const mapStateToProps = (state: ApplicationState): DashboardStateProps => {
  return {
    availableWidth: state.runtimeState.availableWidth,
    availableHeight: state.runtimeState.availableHeight,
    isOnline:  state.runtimeState.isOnline
  };
};

export const DashboardContainer = connect(
  mapStateToProps, mapDispatchToProps
)(Dashboard);
