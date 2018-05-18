import { trackSearchRoutine } from 'actions/trackSearch';

const initialState = {
  loading: false,
  results: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case trackSearchRoutine.REQUEST:
      return {
        ...state,
        loading: true,
        results: [],
      };
    case trackSearchRoutine.SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.payload,
      };
    default:
      return state;
  }
}
