import { eventChannel, takeLatest } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';

import { connectToPlayerRoutine } from 'actions/player';
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

function* connectToPlayerChannel({ payload: { playerId } }) {
  let channel;
  try {
    const socket = yield call(connectToSocket, '/socket');
    channel = yield call(joinChannel, socket, `player:${playerId}`);
    yield put(connectToPlayerRoutine.success());
  } catch (e) {
    yield put(connectToPlayerRoutine.failure());
  }

  const socketChannel = yield call(createSocketChannel, channel);

  while (true) {
    const action = yield take(socketChannel);
    yield put(action);
  }
}

export default function* playerChannelSaga() {
  yield* takeLatest(connectToPlayerRoutine.REQUEST, connectToPlayerChannel);
}
