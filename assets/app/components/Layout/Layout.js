import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Icon, Dropdown } from 'semantic-ui-react';

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
      <div>
        <Header>
          <Header.Content>
            <Dropdown
              trigger={this.renderHeaderUsername()}
              options={[{
                key: 'user',
                text: <span>Signed in as <strong>{username}</strong></span>,
                disabled: true,
              }, {
                key: 'logout',
                text: 'Logout',
                onClick: logout,
              }]}
            />
          </Header.Content>
        </Header>

        <Container role="main">
          {children}
        </Container>
      </div>
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
