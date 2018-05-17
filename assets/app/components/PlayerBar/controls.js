import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Button } from 'semantic-ui-react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import _throttle from 'lodash/throttle';

import { getPlayer } from 'selectors/player';
import { pause, play, seek } from 'actions/player';

class PlayerControls extends Component {
  handleSeek = _throttle((value) => {
    this.props.seek(value);
  }, 300)

  render() {
    const { playing, currentTrack, trackProgress } = this.props.player;
    return (
      <Container textAlign="center">
        {playing
            ? <Button basic inverted size="large" color="violet" circular icon="pause" onClick={this.props.pause} />
            : <Button basic inverted size="large" color="violet" circular icon="play" onClick={this.props.play} />
          }
        {currentTrack &&
          <div>
            <Slider
              value={trackProgress}
              min={0}
              max={currentTrack.duration}
              onChange={this.handleSeek}
            />
          </div>
        }
      </Container>
    );
  }
}

PlayerControls.propTypes = {
  player: PropTypes.shape({
    currentTrack: PropTypes.shape({
      duration: PropTypes.number.isRequired,
    }),
    playing: PropTypes.bool,
    muted: PropTypes.bool,
    volume: PropTypes.number,
    trackProgress: PropTypes.number,
  }),
  pause: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  seek: PropTypes.func.isRequired,
};

PlayerControls.defaultProps = {
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
  pause,
  play,
  seek,
};

const PlayerControlsWrapper = connect(mapStateToProps, mapDispatchToProps)(PlayerControls);

export default PlayerControlsWrapper;
