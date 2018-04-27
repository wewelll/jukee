import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Form, Container } from 'semantic-ui-react';
import { FormInput } from 'components';
import { createRoomRoutine } from 'actions/room';
import { CREATE_ROOM_FORM } from 'utils/constants/forms';
import history from 'utils/history';

class CreateRoomForm extends PureComponent {
  getLabelProps() {
    const { roomExists } = this.props;
    return {
      content: 'jukee.co/room/',
      color: roomExists ? 'pink' : 'teal',
    };
  }

  getSubmitButtonProps() {
    const { roomExists, submitting } = this.props;
    return {
      loading: submitting,
      labelPosition: 'right',
      content: roomExists ? 'Join the room' : 'Create a room',
      icon: roomExists ? 'right arrow' : 'star',
      color: roomExists ? 'pink' : 'teal',
    };
  }

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
    return (
      <Container textAlign="center">
        <Form onSubmit={this.handleSubmit}>
          <Field
            name={CREATE_ROOM_FORM.fields.url}
            label={this.getLabelProps()}
            component={FormInput}
            action={this.getSubmitButtonProps()}

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
