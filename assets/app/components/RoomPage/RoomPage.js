import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { Layout } from 'components';
import { joinRoomRoutine, leaveRoomRoutine } from 'actions/room';
import Hidden from '@material-ui/core/Hidden';

import MobileRoomPage from './MobileRoomPage';
import WebRoomPage from './WebRoomPage';


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
      <DocumentTitle title={`${this.props.match.params.roomUrl} - Jukee`}>
        <Layout>
          <Hidden only="xs">
            <WebRoomPage />
          </Hidden>
          <Hidden smUp>
            <MobileRoomPage />
          </Hidden>
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
