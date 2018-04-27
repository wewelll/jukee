import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Form, Container, Button } from 'semantic-ui-react';
import { FormInput } from 'components';
import { createRoomRoutine } from 'actions/room';
import { CREATE_ROOM_FORM } from 'utils/constants/forms';
import history from 'utils/history';

class CreateRoomForm extends PureComponent {
  handleSubmit = (event) => {
    const { handleSubmit, urlValue } = this.props;
    handleSubmit(createRoomRoutine)(event)
      .catch(() => {
        if (this.props.roomExists) {
          history.push(`/room/${urlValue}`);
        }
      });
  }

  render() {
    const { roomExists, submitting } = this.props;
    return (
      <Container textAlign="center">
        <Form onSubmit={this.handleSubmit}>
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

export default CreateRoomForm;
