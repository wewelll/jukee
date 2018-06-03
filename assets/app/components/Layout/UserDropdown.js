import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

export class UserDropdown extends Component {
  state = { anchorEl: null };

  handleLogout = () => {
    this.handleCloseMenu();
    this.props.logout();
  }

  handleOpenMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseMenu = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { username } = this.props;
    return (
      <div>
        <IconButton
          aria-owns={anchorEl ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleOpenMenu}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={this.handleCloseMenu}
        >
          <MenuItem disabled>Signed in as {username}</MenuItem>
          <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
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
