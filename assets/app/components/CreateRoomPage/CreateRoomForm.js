import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Form, Container } from 'semantic-ui-react';
import { FormInput } from 'components';
import { createRoomRoutine } from 'actions/room';
import { CREATE_ROOM_FORM } from 'utils/constants/forms';
import { getCreateRoomFormUrlValue } from 'selectors/room';
import history from 'utils/history';
import api from 'utils/api';

class CreateRoomForm extends PureComponent {
  submitOrEnterRoom = () => {
    const { handleSubmit, error, urlValue } = this.props;
    if (error === CREATE_ROOM_FORM.errors.roomExists) {
      history.push(`/room/${urlValue}`);
    } else {
      handleSubmit(createRoomRoutine)();
    }
  }

  render() {
    return (
      <Container textAlign="center">
        <Form onSubmit={this.submitOrEnterRoom}>
          <Field
            name={CREATE_ROOM_FORM.fields.url}
            label="jukee.co/room/"
            component={FormInput}
            action={{
              content: 'Create a room',
            }}
            placeholder="room name"
          />
        </Form>
      </Container>
    );
  }
}

CreateRoomForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  urlValue: PropTypes.string,
};

CreateRoomForm.defaultProps = {
  error: undefined,
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

const mapStateToProps = state => ({
  urlValue: getCreateRoomFormUrlValue(state),
});

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: CREATE_ROOM_FORM.name,
    asyncValidate,
    asyncChangeFields: [CREATE_ROOM_FORM.fields.url],
  }),
);


export default enhance(CreateRoomForm);
