import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import PropTypes from 'prop-types';

import routes from 'config/routes';

export default class RedirectAuthenticated extends Component {
  render() {
    const {
      path,
      exact,
      isAuthenticated,
      willAuthenticate,
      component,
    } = this.props;
    const RouteComponent = component;

    return (
      <Route
        exact={exact}
        path={path}
        render={(props) => {
          const referrer = props.location && props.location.state
            ? props.location.state.referrer
            : null;
          if (isAuthenticated) {
            return <Redirect to={referrer || { pathname: routes.home }} />;
          }
          if (willAuthenticate) {
            return null;
          }
          return <RouteComponent {...props} />;
        }}
      />
    );
  }
}

RedirectAuthenticated.propTypes = {
  component: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  isAuthenticated: PropTypes.bool.isRequired,
  willAuthenticate: PropTypes.bool.isRequired,
};

RedirectAuthenticated.defaultProps = {
  exact: true,
};
