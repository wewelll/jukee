import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Button } from 'semantic-ui-react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { getPlayer } from 'selectors/player';
import { pause, play, seek } from 'actions/player';

class PlayerControls extends Component {
  state = {
    seeking: false,
    seekingValue: null,
  }

  handleStartSeeking = () => {
    this.setState({ seeking: true });
  }

  handleSliderChange = (value) => {
    this.setState({ seekingValue: value });
  }

  handleSeek = (value) => {
    this.props.seek(value);
    setTimeout(() => {
      this.setState({ seeking: false });
    }, 100);
  }

  render() {
    const { playing, currentTrack, trackProgress } = this.props.player;
    const { seeking, seekingValue } = this.state;
    const sliderValue = seeking ? seekingValue : Math.max(trackProgress, 0);
    return (
      <Container textAlign="center">
        {playing
            ? <Button basic inverted size="large" color="violet" circular icon="pause" onClick={this.props.pause} />
            : <Button basic inverted size="large" color="violet" circular icon="play" onClick={this.props.play} />
          }
        {currentTrack &&
          <div>
            <Slider
              value={sliderValue}
              min={0}
              max={currentTrack.duration}
              onBeforeChange={this.handleStartSeeking}
              onChange={this.handleSliderChange}
              onAfterChange={this.handleSeek}
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
