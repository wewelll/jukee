import React, { PureComponent } from 'react';
import { Tracklist, TrackSearch, PlayerPresences } from 'components';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Hidden from '@material-ui/core/Hidden';

import PlayerBar from 'components/PlayerBar';

export class WebRoomPage extends PureComponent {
  render() {
    return (
      <Grid container spacing={24} justify="center" style={{ height: '100%' }}>
        <Grid item sm={2} style={{ flexBasis: 80 }}>
          <PlayerPresences />
        </Grid>
        <Grid item xs={12} sm={10} md={6}>
          <Card style={{ height: '100%' }}>
            <PlayerBar />
            <CardContent style={{ maxHeight: '100%', overflow: 'scroll' }}>
              <Tracklist />
            </CardContent>
          </Card>
        </Grid>
        <Hidden mdDown>
          <Grid item xs={12} md={5}>
            <Card style={{ height: '100%', overflow: 'scroll' }}>
              <CardContent>
                <TrackSearch />
              </CardContent>
            </Card>
          </Grid>
        </Hidden>
      </Grid>
    );
  }
}

WebRoomPage.propTypes = {
};

export default WebRoomPage;
