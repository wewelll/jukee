import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Dropdown } from 'semantic-ui-react';

export class UserDropdown extends Component {
  getOptions() {
    const { username, logout } = this.props;
    return [{
      key: 'user',
      text: <span>Signed in as <strong>{username}</strong></span>,
      disabled: true,
    }, {
      key: 'logout',
      text: 'Logout',
      onClick: logout,
    }];
  }

  renderDropdown() {
    const { username } = this.props;
    return (
      <span>
        <Icon name="user" /> {username}
      </span>
    );
  }

  render() {
    return (
      <Dropdown
        trigger={this.renderDropdown()}
        options={this.getOptions()}
      />
    );
  }
}

UserDropdown.propTypes = {
  username: PropTypes.string,
  logout: PropTypes.func.isRequired,
};

UserDropdown.defaultProps = {
  username: '',
};

export default UserDropdown;
