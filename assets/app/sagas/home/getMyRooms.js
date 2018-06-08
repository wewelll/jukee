import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import api from 'utils/api';
import { getMyRoomsRoutine } from 'actions/home';

function* getRooms() {
  const response = yield call(api.get, '/my-rooms');
  return response.data.data;
}

function* getMyRooms() {
  try {
    const results = yield call(getRooms);
    yield put(getMyRoomsRoutine.success(results));
  } catch (error) {
    yield put(getMyRoomsRoutine.failure(error));
  }
}

export default function* getMyRoomsSaga() {
  yield* takeEvery(getMyRoomsRoutine.REQUEST, getMyRooms);
}
