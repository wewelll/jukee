import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { TextField } from 'redux-form-material-ui';
import { login } from 'actions/session';

class LoginForm extends Component {
  submit = (data, dispatch) => dispatch(login(data));

  render() {
    const { handleSubmit, submittingForm, invalid } = this.props;

    return (
      <form
        onSubmit={handleSubmit(this.submit)}
        noValidate
      >
        <h3>Login to Jukee</h3>
        <Field
          name="email"
          type="email"
          component={TextField}
          placeholder="Email"
        />
        <br />
        <Field
          name="password"
          type="password"
          component={TextField}
          placeholder="Password"
        />
        <br />
        <br />
        <Button
          variant="raised"
          type="submit"
          color="primary"
          fullWidth
          disabled={invalid || submittingForm}
        >
          {submittingForm ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  submittingForm: PropTypes.bool,
  invalid: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  submittingForm: false,
};

const validate = (values) => {
  const errors = {};
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!values.email) {
    errors.email = 'Required';
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'Invalid email';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6 || values.password.length > 100) {
    errors.password = 'Must be more than 5 characters and less than 101';
  }

  return errors;
};

export default reduxForm({
  form: 'login',
  validate,
})(LoginForm);
