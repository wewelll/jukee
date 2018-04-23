import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Icon, Header } from 'semantic-ui-react';
import UserDropdown from './UserDropdown';

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
    const { username, children, logout } = this.props;

    return (
      <Container>
        <div />
        <Header>
          <UserDropdown username={username} logout={logout} />
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
};

Layout.defaultProps = {
  username: '',
};

export default Layout;
