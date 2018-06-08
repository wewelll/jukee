import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import api from 'utils/api';
import { getVisitedRoomsRoutine } from 'actions/home';

function* getRooms() {
  const response = yield call(api.get, '/visited-rooms');
  return response.data.data;
}

function* getVisitedRooms() {
  try {
    const results = yield call(getRooms);
    yield put(getVisitedRoomsRoutine.success(results));
  } catch (error) {
    yield put(getVisitedRoomsRoutine.failure(error));
  }
}

export default function* getVisitedRoomsSaga() {
  yield* takeEvery(getVisitedRoomsRoutine.REQUEST, getVisitedRooms);
}
