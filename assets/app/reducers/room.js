import { types as roomTypes } from 'actions/room';
import { roomTabs } from 'config/roomViews';

const initialState = {
  activeTab: roomTabs.SEARCH,
  activeDialog: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case roomTypes.CHANGE_TAB:
      return { ...state, activeTab: action.tab };
    case roomTypes.OPEN_DIALOG:
      return { ...state, activeDialog: action.dialog };
    case roomTypes.CLOSE_DIALOG:
      return { ...state, activeDialog: null };
    default:
      return state;
  }
}
