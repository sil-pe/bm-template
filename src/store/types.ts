import * as Redux from 'redux';

export enum LoaderStates {
  loading = 'loading',
  success = 'success',
  error = 'error'
}

export type RuntimeState = Readonly<{
  availableWidth: number;
  availableHeight: number;
  isOnline: boolean;
}>;

export type LocalizationState = {
  locale: string;
};


export type StaffState = {
  name : string;
  role: string,
  rating: number,
  birthDate: string
}

export interface Dispatch extends Redux.Dispatch<ApplicationState> {
  (action: any): ApplicationState;
}

export type ApplicationState = Readonly<{
  runtimeState: RuntimeState;
  localization: LocalizationState;
  staffListState: StaffState[]
}>;

export type Store = Redux.Store<ApplicationState>;
