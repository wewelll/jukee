import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Form, Container, Button } from 'semantic-ui-react';
import { FormInput } from 'components';
import { createRoomRoutine } from 'actions/room';
import { CREATE_ROOM_FORM } from 'utils/constants/forms';
import { getCreateRoomFormUrlValue } from 'selectors/room';
import history from 'utils/history';
import api from 'utils/api';

class CreateRoomForm extends PureComponent {
  submitOrEnterRoom = () => {
    const { handleSubmit, roomExists, urlValue } = this.props;
    if (roomExists) {
      history.push(`/room/${urlValue}`);
    } else {
      handleSubmit(createRoomRoutine)();
    }
  }

  render() {
    const { roomExists, submitting } = this.props;
    return (
      <Container textAlign="center">
        <Form onSubmit={this.submitOrEnterRoom}>
          <Field
            name={CREATE_ROOM_FORM.fields.url}
            label="jukee.co/room/"
            component={FormInput}
            action={
              <Button
                loading={submitting}
              >
                {roomExists ? 'Join the room' : 'Create a room'}
              </Button>
            }
            placeholder="room name"
          />
        </Form>
      </Container>
    );
  }
}

CreateRoomForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  urlValue: PropTypes.string,
  roomExists: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

CreateRoomForm.defaultProps = {
  urlValue: undefined,
};


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
