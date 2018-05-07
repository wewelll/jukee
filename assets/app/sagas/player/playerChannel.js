import { eventChannel } from 'redux-saga';
import { call, put, take, race } from 'redux-saga/effects';

import { connectToPlayerRoutine, disconnectPlayerRoutine } from 'actions/player';
import { connectToSocket, joinChannel } from 'utils/socket';

const emitAction = (emit, type) => (payload) => {
  emit({ type, payload });
};

function createSocketChannel(channel) {
  return eventChannel((emit) => {
    channel.on('player_progress', emitAction(emit, 'PLAYER_PROGRESS'));

    return () => {
      channel.leave();
    };
  });
}

function* externalListener(socketChannel) {
  while (true) {
    const action = yield take(socketChannel);
    yield put(action);
  }
}

export default function* playerChannelSaga() {
  while (true) {
    const { payload: { playerId } } = yield take(connectToPlayerRoutine.REQUEST);
    let channel;
    try {
      const socket = yield call(connectToSocket, '/socket');
      channel = yield call(joinChannel, socket, `player:${playerId}`);
      yield put(connectToPlayerRoutine.success());
    } catch (e) {
      yield put(connectToPlayerRoutine.failure(e));
    }

    const socketChannel = yield call(createSocketChannel, channel);

    const { cancel } = yield race({
      task: call(externalListener, socketChannel),
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
