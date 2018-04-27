import { createFormAction } from 'redux-form-saga';
import { createRoutine } from 'redux-saga-routines';

export const createRoomRoutine = createFormAction('CREATE_ROOM');
export const getRoomByUrlRoutine = createRoutine('GET_ROOM_BY_URL');
