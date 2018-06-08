import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import history from 'utils/history';
import routes, { createRoute } from 'config/routes';

export class RoomsList extends PureComponent {
  handleGoToRoom = room => () => {
    history.push(createRoute(routes.room, { roomUrl: room.url }));
  }

  render() {
    const { rooms } = this.props;
    return (
      <Grid container spacing={24}>
        {rooms.map(room => (
          <Grid item>
            <Card key={room.id}>
              <CardHeader
                title={`/${room.url}`}
                action={
                  <IconButton onClick={this.handleGoToRoom(room)} color="secondary">
                    <Icon>music_note</Icon>
                  </IconButton>
                }
              />
            </Card>
          </Grid>
          ))}
      </Grid>
    );
  }
}

RoomsList.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default RoomsList;
