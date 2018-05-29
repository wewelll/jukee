import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, List, Image, Button } from 'semantic-ui-react';

import { getTracklist, getCurrentTrack } from 'selectors/player';
import { playTrack, deleteTrack } from 'actions/player';

class Tracklist extends Component {
  handleTrackClick = playerTrackIndex => () => {
    this.props.playTrack(playerTrackIndex);
  }

  handleTrackDelete = playerTrackIndex => () => {
    this.props.deleteTrack(playerTrackIndex);
  }

  render() {
    const { tracks, currentTrack } = this.props;
    return (
      <Container>
        <h3>Tracklist</h3>
        <List selection verticalAlign="middle">
          {tracks.map(track => (
            <List.Item
              active={currentTrack && track.playerTrackIndex === currentTrack.playerTrackIndex}
              key={track.playerTrackIndex}
            >
              <Image avatar src={track.defaultThumbnail} />
              <List.Content>
                <List.Header>{track.title}</List.Header>
                <List.Description>{track.channelTitle}</List.Description>
                <Button
                  onClick={this.handleTrackClick(track.playerTrackIndex)}
                  circular
                  size="mini"
                  color="teal"
                  icon="play"
                />
                <Button
                  onClick={this.handleTrackDelete(track.playerTrackIndex)}
                  circular
                  size="mini"
                  color="red"
                  icon="trash"
                />
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
    defaultThumbnail: PropTypes.string,
    title: PropTypes.string.isRequired,
    channelTitle: PropTypes.string.isRequired,
  })),
  currentTrack: PropTypes.shape({
    playerTrackIndex: PropTypes.number,
  }),
  playTrack: PropTypes.func.isRequired,
  deleteTrack: PropTypes.func.isRequired,
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
  deleteTrack,
};

const PlayerWrapper = connect(mapStateToProps, mapDispatchToProps)(Tracklist);

export default PlayerWrapper;
