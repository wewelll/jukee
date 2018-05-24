import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, List, Image } from 'semantic-ui-react';

import { getTracklist, getCurrentTrack } from 'selectors/player';
import { playTrack } from 'actions/player';

class Tracklist extends Component {
  handleTrackClick = playerTrackIndex => () => {
    this.props.playTrack(playerTrackIndex);
  }

  render() {
    const { tracks, currentTrack } = this.props;
    return (
      <Container>
        <List selection verticalAlign="middle">
          {tracks.map(track => (
            <List.Item
              active={currentTrack && track.playerTrackIndex === currentTrack.playerTrackIndex}
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
  currentTrack: PropTypes.shape({
    playerTrackIndex: PropTypes.number,
  }),
  playTrack: PropTypes.func.isRequired,
};

Tracklist.defaultProps = {
  tracks: [],
  currentTrack: {},
};

const mapStateToProps = state => ({
  tracks: getTracklist(state),
  currentTrack: getCurrentTrack(state),
});

const mapDispatchToProps = {
  playTrack,
};

const PlayerWrapper = connect(mapStateToProps, mapDispatchToProps)(Tracklist);

export default PlayerWrapper;
