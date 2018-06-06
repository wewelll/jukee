import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form';
import { CREATE_ROOM_FORM } from 'utils/constants/forms';

const createRoomFormValueSelector = formValueSelector(CREATE_ROOM_FORM.name);

export const getCreateRoomFormUrlValue = state =>
  createRoomFormValueSelector(state, CREATE_ROOM_FORM.fields.url);

const getRoomState = state => state.room;

export const getActiveTab = createSelector(
  getRoomState,
  room => room.activeTab,
);

export const getActiveDialog = createSelector(
  getRoomState,
  room => room.activeDialog,
);
