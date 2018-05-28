import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { Layout, Tracklist, TrackSearch } from 'components';
import { joinRoomRoutine, leaveRoomRoutine } from 'actions/room';
import { Grid } from 'semantic-ui-react';

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
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Tracklist />
              </Grid.Column>
              <Grid.Column>
                <TrackSearch />
              </Grid.Column>
            </Grid.Row>
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
