import {ApplicationState, LoaderStates} from './types';
import {initialRuntimeState} from '../services/runtime-manager/constants';
import {ContentDialogTypes} from 'components/';

export const initialApplicationState: Readonly<ApplicationState> = {
  runtimeState: initialRuntimeState
};
