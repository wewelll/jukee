import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { SubmissionError, reset } from 'redux-form';

import api from 'utils/api';
import { createRoomRoutine } from 'actions/room';

function* callCreateRoom({ payload: room }) {
  try {
    yield call(api.post, '/rooms', { room });
    yield put(createRoomRoutine.success());
    yield put(reset('createRoom'));
  } catch (error) {
    const formError = new SubmissionError(error.response.data.errors);
    yield put(createRoomRoutine.failure(formError));
  }
}

export default function* createRoom() {
  yield* takeEvery(createRoomRoutine.REQUEST, callCreateRoom);
}
