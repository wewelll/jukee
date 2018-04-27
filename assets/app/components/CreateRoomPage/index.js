import React, { PureComponent } from 'react';
import DocumentTitle from 'react-document-title';
import { Layout } from 'components';
import CreateRoomForm from './CreateRoomFormWrapper';

class CreateRoomPage extends PureComponent {
  render() {
    return (
      <DocumentTitle title="Jukee">
        <Layout>
          <CreateRoomForm />
        </Layout>
      </DocumentTitle>
    );
  }
}

export default CreateRoomPage;
