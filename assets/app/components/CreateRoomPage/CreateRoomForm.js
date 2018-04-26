import React, { PureComponent } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form, Container } from 'semantic-ui-react';
import { FormInput } from 'components';

class CreateRoomForm extends PureComponent {
  render() {
    return (
      <Container textAlign="center">
        <Form>
          <Field name="url" component={FormInput} action="Create a room" placeholder="Room name" />
        </Form>
      </Container>
    );
  }
}

export default reduxForm({
  form: 'createRoom',
})(CreateRoomForm);
