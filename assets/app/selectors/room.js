import { formValueSelector } from 'redux-form';
import { CREATE_ROOM_FORM } from 'utils/constants/forms';

const createRoomFormValueSelector = formValueSelector(CREATE_ROOM_FORM.name);

export const getCreateRoomFormUrlValue = state =>
  createRoomFormValueSelector(state, CREATE_ROOM_FORM.fields.url);
