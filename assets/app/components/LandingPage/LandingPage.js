import React, { PureComponent } from 'react';
import DocumentTitle from 'react-document-title';
import { LandingPageLayout } from 'components/Layout';

export class LandingPage extends PureComponent {
  render() {
    return (
      <DocumentTitle title="Jukee">
        <LandingPageLayout />
      </DocumentTitle>
    );
  }
}

export default LandingPage;
