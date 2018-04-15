import React, { PureComponent } from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';

import routes from 'config/routes';

export class LandingPage extends PureComponent {
  render() {
    return (
      <DocumentTitle title="Jukee">
        <div>
          Jukee
          <br />
          <Link to={routes.login}>Log In</Link>
          <br />
          <Link to={routes.signup}>Sign Up</Link>
        </div>
      </DocumentTitle>);
  }
}

export default LandingPage;
