import { createFormAction } from 'redux-form-saga';
import { createRoutine } from 'redux-saga-routines';

export const createRoomRoutine = createFormAction('CREATE_ROOM');
export const joinRoomRoutine = createRoutine('JOIN_ROOM');
export const leaveRoomRoutine = createRoutine('LEAVE_ROOM');

export const types = {
  CHANGE_TAB: 'CHANGE_TAB',
  OPEN_DIALOG: 'OPEN_DIALOG',
  CLOSE_DIALOG: 'CLOSE_DIALOG',
};

export const changeTab = tab => ({ type: types.CHANGE_TAB, tab });
export const openDialog = dialog => ({ type: types.OPEN_DIALOG, dialog });
export const closeDialog = () => ({ type: types.CLOSE_DIALOG });
