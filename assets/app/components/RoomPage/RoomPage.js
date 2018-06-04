import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { Layout, Tracklist, TrackSearch, PlayerPresences } from 'components';
import { joinRoomRoutine, leaveRoomRoutine } from 'actions/room';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

export class RoomPage extends PureComponent {
  componentDidMount() {
    const { joinRoom, match } = this.props;
    joinRoom(match.params.roomUrl);
  }

  componentWillUnmount() {
    this.props.leaveRoom();
  }

  render() {
    return (
      <DocumentTitle title="Room">
        <Layout>
          <Grid container spacing={24}>
            <Hidden xsDown>
              <Grid item sm={2} style={{ flexBasis: 80 }}>
                <PlayerPresences />
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={10} md={6}>
              <Tracklist />
            </Grid>
            <Hidden mdDown>
              <Grid item xs={12} md={5}>
                <TrackSearch />
              </Grid>
            </Hidden>
          </Grid>
        </Layout>
      </DocumentTitle>
    );
  }
}

RoomPage.propTypes = {
  joinRoom: PropTypes.func.isRequired,
  leaveRoom: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      roomUrl: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapDispatchToProps = {
  joinRoom: joinRoomRoutine.request,
  leaveRoom: leaveRoomRoutine.request,
};

export default connect(null, mapDispatchToProps)(RoomPage);
