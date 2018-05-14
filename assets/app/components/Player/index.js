import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';

import { getPlayer } from 'selectors/player';

class Player extends Component {
  render() {
    const { player } = this.props;
    if (!player) return null;
    const { currentTrack } = player;
    return (
      currentTrack ? <ReactPlayer
        url={currentTrack.url}
        playing={player.playing}
        muted={player.muted}
        volume={player.volume}
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
  }),
};

Player.defaultProps = {
  player: {
    playing: false,
    muted: false,
    volume: 1,
  },
};

const mapStateToProps = state => ({
  player: getPlayer(state),
});

const PlayerWrapper = connect(mapStateToProps)(Player);

export default PlayerWrapper;
