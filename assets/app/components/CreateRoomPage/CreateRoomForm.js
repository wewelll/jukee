import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Form, Container } from 'semantic-ui-react';
import { FormInput } from 'components';
import { createRoomRoutine } from 'actions/room';

class CreateRoomForm extends PureComponent {
  render() {
    const { handleSubmit } = this.props;
    return (
      <Container textAlign="center">
        <Form onSubmit={handleSubmit(createRoomRoutine)}>
          <Field
            name="url"
            label="jukee.co/room/"
            component={FormInput}
            action={{
              content: 'Create a room',
              onClick: handleSubmit(createRoomRoutine),
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
};

export default reduxForm({
  form: 'createRoom',
})(CreateRoomForm);
