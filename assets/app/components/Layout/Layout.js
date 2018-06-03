import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import UserDropdown from './UserDropdown';
import LoginDropdown from './LoginDropdown';

export class Layout extends Component {
  render() {
    const {
      username, children, logout, isAuthenticated, className,
    } = this.props;

    return (
      <div className={className}>
        <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
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
  children: PropTypes.node,
  isAuthenticated: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

Layout.defaultProps = {
  username: '',
  className: '',
  children: null,
};

export default Layout;
