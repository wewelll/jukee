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
    channel.push(eventName, payload);
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
    } catch (e) {
      yield put(connectToPlayerRoutine.failure(e));
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
