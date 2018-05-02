import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { SubmissionError, reset } from 'redux-form';
import history from 'utils/history';
import { CREATE_ROOM_FORM } from 'utils/constants/forms';

import api from 'utils/api';
import { createRoomRoutine } from 'actions/room';
import routes, { createRoute } from 'config/routes';

function* createRoom(room) {
  const response = yield call(api.post, '/rooms', { room });
  return response.data.data;
}

function* callCreateRoom({ payload: room }) {
  try {
    const createdRoom = yield call(createRoom, room);
    yield put(createRoomRoutine.success());
    yield put(reset(CREATE_ROOM_FORM.name));
    yield call(history.push, createRoute(routes.room, { roomUrl: createdRoom.url }));
  } catch (error) {
    const formError = new SubmissionError(error.response.data.errors);
    yield put(createRoomRoutine.failure(formError));
  }
}

export default function* createRoomSaga() {
  yield* takeEvery(createRoomRoutine.REQUEST, callCreateRoom);
}
