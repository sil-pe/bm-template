import {ApplicationState} from './types';
import {dashboardReducer} from '../containers/dashboard/reducer';
import {Action, Reducer, ReducerMeta} from 'redux-actions';
import { staffReducer } from 'src/containers/staff/reducer';


export type CombinedSeriesplayerReducer<P> = (
  state: ApplicationState,
  action: Action<P>
) => ApplicationState;
/**
 * Combines multiple reducer functions working on subtrees of the application state.
 *
 * The gizmoReducer only handles actions prefixed with 'GIZMO_ACTION:'
 *
 * Most of the time, each action triggers only one reducers and the rest don't have any effect.
 * The order in which the reducers are applied is therefore of no consequence.
 * Reducers which have to be applied in a certain order should have a test to guarantee this
 * behavior in combineSeriesplayerReducer.spec.ts.
 *
 * @param {GizmoReducer<P>} gizmoReducer
 * @param {Reducer<ApplicationState, P>[]} appReducer
 * @param {Reducer<Series, P>} seriesReducer
 * @param {Reducer<Exercise, P>} exerciseReducer
 * @param {Reducer<Step, P>} stepReducer
 * @returns {CombinedSeriesplayerReducer<P>}
 *
 */
export const combineSeriesplayerReducer = <P>(
  appReducer: Reducer<ApplicationState, P>[]
): CombinedSeriesplayerReducer<P> => {
  const reducers: Reducer<ApplicationState, P>[] = [
    ...appReducer
  ];

  return (applicationState, action) => reducers.reduce(
    ((state, reducer) => reducer(state, action)),
    applicationState
  );
};


export const combineAppReducer = combineSeriesplayerReducer<ApplicationState>([dashboardReducer, staffReducer]);
