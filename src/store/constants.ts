import {ApplicationState} from './types';
import {initialRuntimeState} from '../services/runtime-manager/constants';
import {initialLocalizationState} from 'src/containers/localized/constants';
import {initialStaffState} from 'src/containers/staff/constants';

export const initialApplicationState: Readonly<ApplicationState> = {
  runtimeState: initialRuntimeState,
  localization: initialLocalizationState,
  staffListState: initialStaffState
};
