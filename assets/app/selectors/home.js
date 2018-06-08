import { createSelector } from 'reselect';

const getHomeState = state => state.home;

export const getMyRooms = createSelector(
  getHomeState,
  home => home.myRooms,
);

export const getVisitedRooms = createSelector(
  getHomeState,
  home => home.visitedRooms,
);
