import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import api from 'utils/api';
import { trackSearchRoutine } from 'actions/trackSearch';

function* searchYoutubeTracks(query) {
  const response = yield call(api.get, '/search_tracks/youtube', { query });
  return response.data.data;
}

function* searchTracks({ payload: { query } }) {
  try {
    const results = yield call(searchYoutubeTracks, query);
    yield put(trackSearchRoutine.success(results));
  } catch (error) {
    const formError = new SubmissionError({});
    yield put(trackSearchRoutine.failure(formError));
  }
}

export default function* searchTracksSaga() {
  yield* takeEvery(trackSearchRoutine.REQUEST, searchTracks);
}
