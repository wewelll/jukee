import { fork } from 'redux-saga/effects';
import Session from 'sagas/session';
import Room from 'sagas/room';
import formActionSaga from 'redux-form-saga';

const sagas = [
  ...Session,
  ...Room,
  formActionSaga,
];

export default function* root() {
  yield sagas.map(saga => fork(saga));
}
