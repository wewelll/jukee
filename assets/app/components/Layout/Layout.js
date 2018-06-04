import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import routes from 'config/routes';
import UserDropdown from './UserDropdown';
import LoginDropdown from './LoginDropdown';
import JukeeLogo from './jukee_logo.png';

const Container = styled.div`
  background: #E1E5CF;
  padding-top: 56px;
`;

const MainContainer = styled.div`
  min-height: calc(100vh - 56px);
  padding-top: 20px;
`;

const JukeeToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

const Logo = styled.img`
  height: 40px;
`;

export class Layout extends Component {
  render() {
    const {
      username, children, logout, isAuthenticated, className, transparentAppBar,
    } = this.props;

    const appBarStyle = transparentAppBar ? {
      background: 'transparent',
      boxShadow: 'none',
    } : {
      background: '#E1E5CF',
    };

    return (
      <Container className={className}>
        <AppBar position="fixed" style={appBarStyle}>
          <JukeeToolbar>
            <Link to={routes.landing}>
              <Logo src={JukeeLogo} alt="logo" />
            </Link>
            {isAuthenticated
              ? <UserDropdown username={username} logout={logout} />
              : <LoginDropdown />
            }
          </JukeeToolbar>
        </AppBar>

        <MainContainer role="main">
          {children}
        </MainContainer>
      </Container>
    );
  }
}

Layout.propTypes = {
  username: PropTypes.string,
  logout: PropTypes.func.isRequired,
  children: PropTypes.node,
  isAuthenticated: PropTypes.bool.isRequired,
  transparentAppBar: PropTypes.bool,
  className: PropTypes.string,
};

Layout.defaultProps = {
  username: '',
  className: '',
  children: null,
  transparentAppBar: false,
};

export default Layout;
