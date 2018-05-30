import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import UserDropdown from './UserDropdown';
import LoginDropdown from './LoginDropdown';

export class Layout extends Component {
  render() {
    const {
      username, children, logout, isAuthenticated,
    } = this.props;

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            {isAuthenticated
            ? <UserDropdown username={username} logout={logout} />
            : <LoginDropdown />
          }
          </Toolbar>
        </AppBar>

        <div role="main">
          {children}
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  username: PropTypes.string,
  logout: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

Layout.defaultProps = {
  username: '',
};

export default Layout;
