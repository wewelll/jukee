import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import routes from 'config/routes';
import UserDropdown from './UserDropdown';
import LoginDropdown from './LoginDropdown';
import JukeeLogo from './jukee_logo.png';

const Container = styled.div`
  background: #E1E5CF;
  padding-top: 56px;

  @media (min-width: 600px) {
    padding-top: 64px;
  }
`;

const MainContainer = styled(Grid)`
  height: calc(100vh - 56px);
  padding: 0;

  @media (min-width: 600px) {
    height: calc(100vh - 64px);
    padding: 12px;
  }

  overflow: scroll;
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

        <MainContainer container role="main">
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
