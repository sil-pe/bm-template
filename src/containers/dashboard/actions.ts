import {createAction} from 'redux-actions';
import {ContentDialogTypes} from '../../components/Dialog/ContentDialog';

export const CLOSE_DIALOG = 'CLOSE_DIALOG';
export const OPEN_DIALOG = 'OPEN_DIALOG';
export const closeDialog = createAction(CLOSE_DIALOG);
export const openDialog = createAction<ContentDialogTypes>(OPEN_DIALOG);

// Actions for Runtime events changes
export const WINDOW_RESIZED = 'WINDOW_RESIZED';
export const SWITCH_TO_ONLINE = 'SWITCH_TO_ONLINE';
export const SWITCH_TO_OFFLINE = 'SWITCH_TO_OFFLINE';

export const windowResized = createAction(WINDOW_RESIZED);
export const switchToOnline = createAction(SWITCH_TO_ONLINE);
export const switchToOffline = createAction(SWITCH_TO_OFFLINE);
