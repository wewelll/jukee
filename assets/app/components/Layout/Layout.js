import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Icon, Header } from 'semantic-ui-react';
import UserDropdown from './UserDropdown';
import LoginDropdown from './LoginDropdown';

export class Layout extends Component {
  renderHeaderUsername() {
    const { username } = this.props;
    return (
      <span>
        <Icon name="user" /> Hello, {username}
      </span>
    );
  }

  render() {
    const {
      username, children, logout, isAuthenticated,
    } = this.props;

    return (
      <Container>
        <div />
        <Header>
          {isAuthenticated
            ? <UserDropdown username={username} logout={logout} />
            : <LoginDropdown />
          }
        </Header>

        <Container role="main">
          {children}
        </Container>
      </Container>
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
