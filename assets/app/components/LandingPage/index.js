import React, { PureComponent } from 'react';
import DocumentTitle from 'react-document-title';
import { Layout } from 'components';

export class LandingPage extends PureComponent {
  render() {
    return (
      <DocumentTitle title="Jukee">
        <Layout>
          Jukee
        </Layout>
      </DocumentTitle>
    );
  }
}

export default LandingPage;
