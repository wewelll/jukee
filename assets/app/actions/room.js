import { createFormAction } from 'redux-form-saga';
import { createRoutine } from 'redux-saga-routines';

export const createRoomRoutine = createFormAction('CREATE_ROOM');
export const joinRoomRoutine = createRoutine('JOIN_ROOM');
export const leaveRoomRoutine = createRoutine('LEAVE_ROOM');
