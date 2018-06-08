import { getMyRoomsRoutine, getVisitedRoomsRoutine } from 'actions/home';

const initialState = {
  loadingMyRooms: false,
  myRooms: [],
  loadingVisitedRooms: false,
  visitedRooms: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case getMyRoomsRoutine.REQUEST:
      return {
        ...state,
        loadingMyRooms: true,
        myRooms: [],
      };
    case getMyRoomsRoutine.SUCCESS:
      return {
        ...state,
        loadingMyRooms: false,
        myRooms: action.payload,
      };
    case getVisitedRoomsRoutine.REQUEST:
      return {
        ...state,
        loadingVisitedRooms: true,
        visitedRooms: [],
      };
    case getVisitedRoomsRoutine.SUCCESS:
      return {
        ...state,
        loadingVisitedRooms: false,
        visitedRooms: action.payload,
      };
    default:
      return state;
  }
}
