import {Action, handleActions} from 'redux-actions';
import {
  SWITCH_TO_OFFLINE,
  SWITCH_TO_ONLINE,
  WINDOW_RESIZED
} from './actions';
import {getAvailableHeight, getAvailableWidth, isOnline} from '../../services/runtime-manager';
import {ApplicationState} from '../../store/types';
import {initialApplicationState} from '../../store/constants';

export const dashboardReducer = handleActions<ApplicationState, any>(
  {
    [SWITCH_TO_OFFLINE]: (state: ApplicationState, action: Action<void>) => {
      const runtimeState = {
        ...state.runtimeState,
        isOnline: isOnline()
      };
      return {
        ...state,
        runtimeState
      };
    },
    [SWITCH_TO_ONLINE]: (state: ApplicationState, action: Action<void>) => {
      const runtimeState = {
        ...state.runtimeState,
        isOnline: isOnline()
      };
      return {
        ...state,
        runtimeState
      };
    },
    [WINDOW_RESIZED]: (state: ApplicationState, action: Action<void>) => {
      const runtimeState = {
        ...state.runtimeState,
        availableWidth: getAvailableWidth(),
        availableHeight: getAvailableHeight()
      };
      return {
        ...state,
        runtimeState
      };
    }
  },
  initialApplicationState
);
