import { createRoutine } from 'redux-saga-routines';

export const connectToPlayerRoutine = createRoutine('CONNECT_TO_PLAYER');
export const disconnectPlayerRoutine = createRoutine('DISCONNECT_PLAYER');
export const sendPlayerEventRoutine = createRoutine('SEND_PLAYER_EVENT');

export const types = {
  PLAYER_EVENT: 'PLAYER_EVENT',
  INITIALIZE_PLAYER: 'INITIALIZE_PLAYER',
};

export const playerEvents = {
  playerProgress: 'player_progress',
  playerUpdate: 'player_update',
};

export const initializePlayer = player => ({ type: types.INITIALIZE_PLAYER, player });
