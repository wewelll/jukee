import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getPlayer, getPlayback } from 'selectors/player';
import { playLocal, pauseLocal, seekLocal } from 'actions/player';
import ControlledProgressReactPlayer from './ControlledProgressReactPlayer';

const InvisiblePlayer = styled(ControlledProgressReactPlayer)`
  position: fixed;
  opacity: 0;
`;

const config = {
  youtube: {
    preload: true,
  },
  soundcloud: {
    preload: true,
    single_active: false,
    show_artwork: false,
    show_playcount: false,
    show_user: false,
  },
};

class Player extends Component {
  handlePlay = () => {
    this.props.playLocal();
  }

  handlePause = () => {
    this.props.pauseLocal();
  }

  handleSeek = (seconds) => {
    this.props.seekLocal(seconds * 1000);
  }

  render() {
    const { player, playback } = this.props;
    if (!player || !playback) return null;
    const { currentTrack } = player;
    return (
      currentTrack ? <InvisiblePlayer
        url={currentTrack.url}
        playing={player.playing}
        muted={player.muted}
        volume={player.volume}
        progress={player.trackProgress / 1000}
        config={config}
        onStart={this.handlePlay}
        onPlay={this.handlePlay}
        onPause={this.handlePause}
        onSeek={this.handleSeek}
      /> : null
    );
  }
}

Player.propTypes = {
  player: PropTypes.shape({
    currentTrack: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
    playing: PropTypes.bool,
    muted: PropTypes.bool,
    volume: PropTypes.number,
    trackProgress: PropTypes.number,
  }),
  playback: PropTypes.bool.isRequired,
  playLocal: PropTypes.func.isRequired,
  pauseLocal: PropTypes.func.isRequired,
  seekLocal: PropTypes.func.isRequired,
};

Player.defaultProps = {
  player: {},
};

const mapStateToProps = state => ({
  player: getPlayer(state),
  playback: getPlayback(state),
});

const mapDispatchToProps = {
  playLocal,
  pauseLocal,
  seekLocal,
};

const PlayerWrapper = connect(mapStateToProps, mapDispatchToProps)(Player);

export default PlayerWrapper;
