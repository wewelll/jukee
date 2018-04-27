import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import api from 'utils/api';
import { getRoomByUrlRoutine } from 'actions/room';

function* getRoomByUrl(url) {
  const response = yield call(api.get, `/room-by-url/${url}`);
  return response.data.data;
}

function* callGetRoomByUrl({ payload: url }) {
  try {
    const room = yield call(getRoomByUrl, url);
    yield put(getRoomByUrlRoutine.success(room));
  } catch (error) {
    yield put(getRoomByUrlRoutine.failure());
  }
}

export default function* createRoom() {
  yield* takeEvery(getRoomByUrlRoutine.REQUEST, callGetRoomByUrl);
}
