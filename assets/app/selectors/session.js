import { createSelector } from 'reselect';

const selectRawSession = state => state.session;

export const getCurrentUser = createSelector(
  selectRawSession,
  session => session.currentUser,
);

export const getCurrentUserId = createSelector(
  getCurrentUser,
  user => user.id,
);
