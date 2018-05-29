import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getPlayer } from 'selectors/player';
import { setTrackProgress } from 'actions/player';
import ControlledProgressReactPlayer from './controlledProgressReactPlayer';

const InvisiblePlayer = styled(ControlledProgressReactPlayer)`
  display: none;
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
  handleProgress = ({ playedSeconds }) => {
    this.props.setTrackProgress(Math.floor(playedSeconds * 1000));
  }

  render() {
    const { player } = this.props;
    if (!player) return null;
    const { currentTrack } = player;
    return (
      currentTrack ? <InvisiblePlayer
        url={currentTrack.url}
        playing={player.playing}
        muted={player.muted}
        volume={player.volume}
        progress={player.trackProgress / 1000}
        onProgress={this.handleProgress}
        config={config}
      /> : null
    );
  }
}

Player.propTypes = {
  player: PropTypes.shape({
    currentTrack: PropTypes.shape({
      url: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
    }),
    playing: PropTypes.bool,
    muted: PropTypes.bool,
    volume: PropTypes.number,
    trackProgress: PropTypes.number,
  }),
  setTrackProgress: PropTypes.func.isRequired,
};

Player.defaultProps = {
  player: {
    playing: false,
    muted: false,
    volume: 1,
    trackProgress: 0,
  },
};

const mapStateToProps = state => ({
  player: getPlayer(state),
});

const mapDispatchToProps = {
  setTrackProgress,
};

const PlayerWrapper = connect(mapStateToProps, mapDispatchToProps)(Player);

export default PlayerWrapper;
