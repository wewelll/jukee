import { types as playerTypes } from 'actions/player';

const initialState = {
};

export default function(state = initialState, action) {
  switch (action.type) {
    case playerTypes.INITIALIZE_PLAYER:
      return action.player;
    default:
      return state;
  }
}
