import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { TextField } from 'redux-form-material-ui';
import { login } from 'actions/session';

class LoginForm extends Component {
  submit = (data, dispatch) => dispatch(login(data));

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
            Login
            </Typography>
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
              {submittingForm ? 'Logging in...' : 'Login'}
            </Button>
          </CardActions>
        </form>
      </Card>
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
