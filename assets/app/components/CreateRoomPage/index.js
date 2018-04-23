import React, { PureComponent } from 'react';
import DocumentTitle from 'react-document-title';
import { Layout } from 'components';

class CreateRoomPage extends PureComponent {
  render() {
    return (
      <DocumentTitle title="Home">
        <Layout>CreateRoomPage</Layout>
      </DocumentTitle>
    );
  }
}

export default CreateRoomPage;
