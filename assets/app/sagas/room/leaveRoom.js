import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';

import { leaveRoomRoutine } from 'actions/room';
import { disconnectPlayerRoutine } from 'actions/player';

function* callLeaveRoom() {
  try {
    yield put(disconnectPlayerRoutine.request());
    yield put(leaveRoomRoutine.success());
  } catch (error) {
    yield put(leaveRoomRoutine.failure());
  }
}

export default function* leaveRoomSaga() {
  yield* takeEvery(leaveRoomRoutine.REQUEST, callLeaveRoom);
}
