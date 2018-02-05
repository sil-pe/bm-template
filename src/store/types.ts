import * as Redux from 'redux';
import {ContentDialogTypes} from 'components/';

export type RuntimeState = Readonly<{
  availableWidth: number;
  availableHeight: number;
  isOnline: boolean;
}>;

export enum LoaderStates {
  loading = 'loading',
  success = 'success',
  error = 'error'
}

export interface Dispatch extends Redux.Dispatch<ApplicationState> {
  (action: any): ApplicationState;
}

export type ApplicationState = Readonly<{
  runtimeState: RuntimeState;
}>;

export type Store = Redux.Store<ApplicationState>;
