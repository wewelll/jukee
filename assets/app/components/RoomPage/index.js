import React, { PureComponent } from 'react';
import DocumentTitle from 'react-document-title';
import { Layout } from 'components';

export class RoomPage extends PureComponent {
  render() {
    return (
      <DocumentTitle title="Room">
        <Layout>
          You are in a room !
        </Layout>
      </DocumentTitle>
    );
  }
}

export default RoomPage;
