import { createSelector } from 'reselect';
import _isEmpty from 'lodash/isEmpty';
import { Presence } from 'phoenix';

export const getPlayerState = state => state.player;

export const getPlayer = createSelector(
  getPlayerState,
  playerState => playerState.player,
);

export const getPresences = createSelector(
  getPlayerState,
  playerState => Presence.list(playerState.presences, (id, { metas: [first, ...rest] }) => ({
    ...first,
    id,
    count: rest.length + 1, // count of this user's presences
  })),
);

export const playerExists = createSelector(
  getPlayer,
  player => !_isEmpty(player),
);

export const getTracklist = createSelector(
  getPlayer,
  player => player.tracks,
);

export const getCurrentTrack = createSelector(
  getPlayer,
  player => player.currentTrack,
);

export const getAutoplay = createSelector(
  getPlayer,
  player => player.autoplay,
);
