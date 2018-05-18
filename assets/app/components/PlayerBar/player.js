import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getPlayer } from 'selectors/player';
import ControlledProgressReactPlayer from './controlledProgressReactPlayer';

const InvisiblePlayer = styled(ControlledProgressReactPlayer)`
  display: none;
`;

class Player extends Component {
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

const PlayerWrapper = connect(mapStateToProps)(Player);

export default PlayerWrapper;