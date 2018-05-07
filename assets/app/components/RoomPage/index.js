import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { Layout } from 'components';
import { joinRoomRoutine } from 'actions/room';

export class RoomPage extends PureComponent {
  componentDidMount() {
    const { joinRoom, match } = this.props;
    joinRoom(match.params.roomUrl);
  }

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

RoomPage.propTypes = {
  joinRoom: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      roomUrl: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapDispatchToProps = {
  joinRoom: joinRoomRoutine.request,
};

export default connect(null, mapDispatchToProps)(RoomPage);
