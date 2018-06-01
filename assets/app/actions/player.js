import { createRoutine } from 'redux-saga-routines';

export const connectToPlayerRoutine = createRoutine('CONNECT_TO_PLAYER');
export const disconnectPlayerRoutine = createRoutine('DISCONNECT_PLAYER');
export const sendPlayerEventRoutine = createRoutine('SEND_PLAYER_EVENT');

export const types = {
  PLAYER_EVENT: 'PLAYER_EVENT',
  INITIALIZE_PLAYER: 'INITIALIZE_PLAYER',
};

export const playerEvents = {
  playerUpdate: 'player_update',
  presenceState: 'presence_state',
  presenceDiff: 'presence_diff',
};

export const initializePlayer = player => ({ type: types.INITIALIZE_PLAYER, player });

export const playTrack = playerTrackIndex => sendPlayerEventRoutine.request({
  eventName: 'play_track',
  payload: { playerTrackIndex },
});

export const pause = () => sendPlayerEventRoutine.request({
  eventName: 'pause',
  payload: {},
});

export const play = () => sendPlayerEventRoutine.request({
  eventName: 'play',
  payload: {},
});

export const togglePause = () => sendPlayerEventRoutine.request({
  eventName: 'toggle_pause',
  payload: {},
});

export const seek = to => sendPlayerEventRoutine.request({
  eventName: 'seek',
  payload: { to },
});

export const next = () => sendPlayerEventRoutine.request({
  eventName: 'next',
  payload: {},
});

export const previous = () => sendPlayerEventRoutine.request({
  eventName: 'previous',
  payload: {},
});

export const addTrack = (provider, externalId) => sendPlayerEventRoutine.request({
  eventName: 'add_track',
  payload: {
    provider,
    externalId,
  },
});

export const deleteTrack = playerTrackIndex => sendPlayerEventRoutine.request({
  eventName: 'delete_track',
  payload: { playerTrackIndex },
});

export const setAutoplay = autoplay => sendPlayerEventRoutine.request({
  eventName: 'autoplay',
  payload: { autoplay },
});
