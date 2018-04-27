import { connect } from 'react-redux';
import { compose } from 'recompose';
import { reduxForm } from 'redux-form';
import { CREATE_ROOM_FORM } from 'utils/constants/forms';
import { getCreateRoomFormUrlValue } from 'selectors/room';
import api from 'utils/api';
import CreateRoomForm from './CreateRoomForm';

const asyncValidate = ({ [CREATE_ROOM_FORM.fields.url]: url }) =>
  api.get(`/room-by-url/${url}`)
    .catch(() => undefined)
    .then((result) => {
      if (result) {
        /* eslint-disable-next-line no-throw-literal */
        throw {
          _error: CREATE_ROOM_FORM.errors.roomExists,
        };
      }
    });

const mapStateToProps = (state, { error }) => ({
  urlValue: getCreateRoomFormUrlValue(state),
  roomExists: error === CREATE_ROOM_FORM.errors.roomExists,
});

const enhance = compose(
  reduxForm({
    form: CREATE_ROOM_FORM.name,
    asyncValidate,
    asyncChangeFields: [CREATE_ROOM_FORM.fields.url],
  }),
  connect(mapStateToProps),
);


export default enhance(CreateRoomForm);
