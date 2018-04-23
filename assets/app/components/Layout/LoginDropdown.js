import React, { Component } from 'react';
import { Icon, Dropdown } from 'semantic-ui-react';
import history from 'utils/history';
import routes from 'config/routes';

export class LoginDropdown extends Component {
  goToLogin = () => history.push(routes.login)
  goToSignUp = () => history.push(routes.signup)

  options = [{
    key: 'login',
    text: 'Log In',
    onClick: this.goToLogin,
  }, {
    key: 'signup',
    text: 'Sign Up',
    onClick: this.goToSignUp,
  }];


  dropdown = (
    <span>
      <Icon name="user" /> Login
    </span>
  );


  render() {
    return (
      <Dropdown
        trigger={this.dropdown}
        options={this.options}
      />
    );
  }
}

export default LoginDropdown;
