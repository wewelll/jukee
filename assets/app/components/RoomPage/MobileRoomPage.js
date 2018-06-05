import React, { PureComponent } from 'react';
import { Tracklist } from 'components';
import Grid from '@material-ui/core/Grid';

import PlayerBar from 'components/PlayerBar';

export class MobileRoomPage extends PureComponent {
  render() {
    return (
      <Grid container>
        <PlayerBar />
        <Tracklist />
      </Grid>
    );
  }
}

MobileRoomPage.propTypes = {
};

export default MobileRoomPage;
