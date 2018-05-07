import { createRoutine } from 'redux-saga-routines';

export const connectToPlayerRoutine = createRoutine('CONNECT_TO_PLAYER');
export const disconnectPlayerRoutine = createRoutine('DISCONNECT_PLAYER');
export const sendPlayerEventRoutine = createRoutine('SEND_PLAYER_EVENT');
export const playerEvent = 'PLAYER_EVENT';
