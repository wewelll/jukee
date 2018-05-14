import { eventChannel } from 'redux-saga';
import { call, put, take, race } from 'redux-saga/effects';
import api from 'utils/api';

import {
  connectToPlayerRoutine,
  disconnectPlayerRoutine,
  sendPlayerEventRoutine,
  playerEvent,
  playerEvents,
  initializePlayer,
} from 'actions/player';
import { connectToSocket, joinChannel } from 'utils/socket';

const emitAction = (emit, eventName) => (payload) => {
  emit({ type: playerEvent, eventName, payload });
};

const pushEvent = (channel, eventName, payload) => new Promise((resolve, reject) => {
  channel.push(eventName, payload)
    .receive('ok', msg => resolve(msg))
    .receive('error', reasons => reject(reasons))
    .receive('timeout', () => reject('timeout')); // eslint-disable-line prefer-promise-reject-errors
});

function createSocketChannel(channel) {
  return eventChannel((emit) => {
    Object.values(playerEvents)
      .map(eventName => channel.on(eventName, emitAction(emit, eventName)));

    return () => channel.leave();
  });
}

function* externalListener(socketChannel) {
  while (true) {
    const action = yield take(socketChannel);
    yield put(action);
  }
}

function* internalListener(channel) {
  while (true) {
    const { eventName, payload } = yield take(sendPlayerEventRoutine.REQUEST);
    try {
      const msg = yield call(pushEvent, channel, eventName, payload);
      yield put(sendPlayerEventRoutine.success(msg));
    } catch (error) {
      yield put(sendPlayerEventRoutine.failure(error));
    }
  }
}

function* fetchPlayer(playerId) {
  const response = yield call(api.get, `/players/${playerId}`);
  const player = response.data.data;
  yield put(initializePlayer(player));
}

export default function* playerChannelSaga() {
  while (true) {
    const { payload: { playerId } } = yield take(connectToPlayerRoutine.REQUEST);
    let channel;
    try {
      const socket = yield call(connectToSocket, '/socket');
      channel = yield call(joinChannel, socket, `player:${playerId}`);
      yield call(fetchPlayer, playerId); // initialize the player
      yield put(connectToPlayerRoutine.success());
    } catch (error) {
      yield put(connectToPlayerRoutine.failure(error));
    }

    // start to listen to the websockets events
    const socketChannel = yield call(createSocketChannel, channel);

    const { cancel } = yield race({
      task: [
        call(externalListener, socketChannel),
        call(internalListener, channel),
      ],
      cancel: take(disconnectPlayerRoutine.REQUEST),
    });

    if (cancel) {
      try {
        socketChannel.close();
        yield put(disconnectPlayerRoutine.success());
      } catch (e) {
        yield put(disconnectPlayerRoutine.failure(e));
      }
    }
  }
}
