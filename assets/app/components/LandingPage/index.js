import React, { PureComponent } from 'react';
import DocumentTitle from 'react-document-title';

export class LandingPage extends PureComponent {
  render() {
    return (
      <DocumentTitle title="Jukee">
        <div>
          Jukee
        </div>
      </DocumentTitle>);
  }
}

export default LandingPage;
