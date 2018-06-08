import { fork } from 'redux-saga/effects';
import Session from 'sagas/session';
import Room from 'sagas/room';
import Player from 'sagas/player';
import TrackSearch from 'sagas/trackSearch';
import Home from 'sagas/home';
import formActionSaga from 'redux-form-saga';

const sagas = [
  ...Session,
  ...Room,
  ...Player,
  ...TrackSearch,
  ...Home,
  formActionSaga,
];

export default function* root() {
  yield sagas.map(saga => fork(saga));
}
