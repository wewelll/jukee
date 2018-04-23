import React, { PureComponent } from 'react';
import DocumentTitle from 'react-document-title';
import { Input, Container } from 'semantic-ui-react';
import { Layout } from 'components';

class CreateRoomPage extends PureComponent {
  render() {
    return (
      <DocumentTitle title="Jukee">
        <Layout>
          <Container textAlign="center">
            <Input action="Create a room" placeholder="Room name" />
          </Container>
        </Layout>
      </DocumentTitle>
    );
  }
}

export default CreateRoomPage;
