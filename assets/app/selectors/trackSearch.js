import { createSelector } from 'reselect';

const getTrackSearch = state => state.trackSearch;

export const getTrackSearchResults = createSelector(
  getTrackSearch,
  trackSearch => trackSearch.results,
);
