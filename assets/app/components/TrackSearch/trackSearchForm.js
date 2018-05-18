import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TRACK_SEARCH_FORM } from 'utils/constants/forms';
import { reduxForm, Field } from 'redux-form';
import { Form, Container } from 'semantic-ui-react';
import { FormInput } from 'components';
import { trackSearchRoutine } from 'actions/trackSearch';

class CreateRoomForm extends PureComponent {
  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <Container textAlign="center">
        <Form onSubmit={handleSubmit(trackSearchRoutine)}>
          <Field
            name={TRACK_SEARCH_FORM.fields.query}
            component={FormInput}
            loading={submitting}
            placeholder="search"
          />
        </Form>
      </Container>
    );
  }
}

CreateRoomForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: TRACK_SEARCH_FORM.name,
})(CreateRoomForm);
