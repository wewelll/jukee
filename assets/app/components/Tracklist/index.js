import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, List, Image } from 'semantic-ui-react';

import { getTracklist } from 'selectors/player';
import { sendPlayerEventRoutine, playTrack } from 'actions/player';

class Tracklist extends Component {
  handleTrackClick = playerTrackIndex => () => {
    this.props.playTrack(playerTrackIndex);
  }

  render() {
    const { tracks } = this.props;
    return (
      <Container>
        <List selection verticalAlign="middle">
          {tracks.map(track => (
            <List.Item
              key={track.playerTrackIndex}
              onClick={this.handleTrackClick(track.playerTrackIndex)}
            >
              <Image avatar src={track.default_thumbnail} />
              <List.Content>
                <List.Header>{track.title}</List.Header>
                <List.Description>{track.channel_title}</List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Container>
    );
  }
}

Tracklist.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.shape({
    playerTrackIndex: PropTypes.number.isRequired,
    default_thumbnail: PropTypes.string,
    title: PropTypes.string.isRequired,
    channel_title: PropTypes.string.isRequired,
  })),
  playTrack: PropTypes.func.isRequired,
};

Tracklist.defaultProps = {
  tracks: [],
};

const mapStateToProps = state => ({
  tracks: getTracklist(state),
});

const mapDispatchToProps = {
  sendPlayerEvent: sendPlayerEventRoutine.request,
  playTrack,
};

const PlayerWrapper = connect(mapStateToProps, mapDispatchToProps)(Tracklist);

export default PlayerWrapper;
