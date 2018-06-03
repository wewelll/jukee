import React, { PureComponent } from 'react';
import DocumentTitle from 'react-document-title';
import { Layout } from 'components';
import Grid from '@material-ui/core/Grid';
import CreateRoomForm from './CreateRoomFormWrapper';

class CreateRoomPage extends PureComponent {
  render() {
    return (
      <DocumentTitle title="Jukee">
        <Layout>
          <Grid container justify="center">
            <CreateRoomForm />
          </Grid>
        </Layout>
      </DocumentTitle>
    );
  }
}

export default CreateRoomPage;
