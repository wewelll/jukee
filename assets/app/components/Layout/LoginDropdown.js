import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import history from 'utils/history';
import routes from 'config/routes';

export class LoginDropdown extends Component {
  goToLogin = () => history.push(routes.login)
  goToSignUp = () => history.push(routes.signup)

  render() {
    return (
      <div>
        <Button onClick={this.goToLogin}>Login</Button>
        <Button onClick={this.goToSignUp}>Sign Up</Button>
      </div>
    );
  }
}

export default LoginDropdown;
