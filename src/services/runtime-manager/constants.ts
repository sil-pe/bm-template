import {getAvailableHeight, getAvailableWidth, isOnline} from './';

export const initialRuntimeState = {
  availableWidth: getAvailableWidth(),
  availableHeight: getAvailableHeight(),
  isOnline: isOnline()
};
