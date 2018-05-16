import { createSelector } from 'reselect';

export const getPlayer = state => state.player;

export const getTracklist = createSelector(
  getPlayer,
  player => player.tracks,
);
