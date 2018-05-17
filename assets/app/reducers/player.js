import { types as playerTypes, playerEvents } from 'actions/player';

const initialState = {
};

const playerEventReducer = (state = initialState, action) => {
  switch (action.eventName) {
    case playerEvents.playerUpdate:
      return action.payload;
    case playerEvents.playerProgress:
      return {
        ...state,
        trackProgress: action.payload.trackProgress,
      };
    default:
      return state;
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case playerTypes.INITIALIZE_PLAYER:
      return action.player;
    case playerTypes.PLAYER_EVENT:
      return playerEventReducer(state, action);
    default:
      return state;
  }
}
