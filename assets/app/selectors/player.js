import { createSelector } from 'reselect';
import _isEmpty from 'lodash/isEmpty';

export const getPlayer = state => state.player;

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
