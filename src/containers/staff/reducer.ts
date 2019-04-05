import {Action, handleActions} from 'redux-actions';
import {
  UPDATE_RATING
} from './actions';
import {ApplicationState} from '../../store/types';
import {initialApplicationState} from '../../store/constants';

export const staffReducer = handleActions<ApplicationState, any>(
  {
    [UPDATE_RATING]: (state: ApplicationState, action: Action<void>) => {
      const staffListState = state.staffListState.slice();
      const {staffIndex, rating} = action.payload;
      staffListState[staffIndex].rating = rating;
      return {
        ...state,
        staffListState
      };
    }
  },
  initialApplicationState
);
