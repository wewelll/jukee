import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { TextField } from 'redux-form-material-ui';
import { signup } from 'actions/session';

class SignupForm extends Component {
  submit = (data, dispatch) => dispatch(signup(data));

  render() {
    const { handleSubmit, submittingForm, invalid } = this.props;

    return (
      <Card>
        <form
          onSubmit={handleSubmit(this.submit)}
          noValidate
        >
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
            Create an account
            </Typography>
            <Field
              name="name"
              type="text"
              component={TextField}
              label="Full name"
              fullWidth
              margin="normal"
            />
            <Field
              name="username"
              type="text"
              component={TextField}
              label="Username"
              fullWidth
              margin="normal"
            />
            <Field
              name="email"
              type="email"
              component={TextField}
              label="Email"
              fullWidth
              margin="normal"
            />
            <Field
              name="password"
              type="password"
              component={TextField}
              label="Password"
              fullWidth
              margin="normal"
            />
          </CardContent>
          <CardActions>
            <Button fullWidth type="submit" size="small" color="primary" disabled={invalid || submittingForm}>
              {submittingForm ? 'Submitting...' : 'Sign up'}
            </Button>
          </CardActions>
        </form>
      </Card>
    );
  }
}

SignupForm.propTypes = {
  submittingForm: PropTypes.bool,
  invalid: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

SignupForm.defaultProps = {
  submittingForm: false,
};

const validate = (values) => {
  const errors = {};
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const usernameRegex = /^[A-Za-z0-9._]+$/;

  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length < 1 || values.name.length > 255) {
    errors.name = 'Must be less than 256 characters';
  }

  if (!values.username) {
    errors.username = 'Required';
  } else if (!usernameRegex.test(values.username)) {
    errors.username = "EN letters, digits, '.' and '_' are accepted";
  } else if (values.username.length < 1 || values.username.length > 26) {
    errors.username = 'Must be less than 27 characters';
  }

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
  form: 'signup',
  validate,
})(SignupForm);
