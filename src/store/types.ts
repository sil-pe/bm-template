import * as Redux from 'redux';

export type RuntimeState = Readonly<{
  availableWidth: number;
  availableHeight: number;
  isOnline: boolean;
}>;

export type LocalizationState = {
  locale: string;
};

export enum LoaderStates {
  loading = 'loading',
  success = 'success',
  error = 'error'
}

export type ApplicationState = Readonly<{
  runtimeState: RuntimeState;
  localization: LocalizationState;
}>;

export type Store = Redux.Store<ApplicationState>;
