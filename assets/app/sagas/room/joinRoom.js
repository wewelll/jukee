import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import history from 'utils/history';
import routes from 'config/routes';

import api from 'utils/api';
import { joinRoomRoutine } from 'actions/room';
import { connectToPlayerRoutine } from 'actions/player';

function* joinRoom(url) {
  const response = yield call(api.get, `/room-by-url/${url}`);
  return response.data.data;
}

function* calljoinRoom({ payload: url }) {
  try {
    const room = yield call(joinRoom, url);
    yield put(joinRoomRoutine.success(room));
    yield put(connectToPlayerRoutine.request({ playerId: room.playerId }));
  } catch (error) {
    yield call(history.push, routes.createRoom);
    yield put(joinRoomRoutine.failure());
  }
}

export default function* joinRoomSaga() {
  yield* takeEvery(joinRoomRoutine.REQUEST, calljoinRoom);
}
