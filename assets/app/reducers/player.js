import { types as playerTypes, playerEvents, disconnectPlayerRoutine } from 'actions/player';

const initialState = {};

const playerEventReducer = (state = initialState, action) => {
  switch (action.eventName) {
    case playerEvents.playerUpdate:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case playerTypes.INITIALIZE_PLAYER:
      return action.player;
    case disconnectPlayerRoutine.SUCCESS:
      return initialState;
    case playerTypes.PLAYER_EVENT:
      return playerEventReducer(state, action);
    default:
      return state;
  }
}
