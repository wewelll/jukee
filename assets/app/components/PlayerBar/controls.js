import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styled from 'styled-components';

import { getPlayer } from 'selectors/player';
import { pause, play, seek, next, previous } from 'actions/player';
import { formatDuration } from 'utils/dataFormatting';

const ControlsContainer = styled.div`
  text-align: center;
`;

const SliderContainer = styled.div`
  display: flex;
`;

const SliderTime = styled.div`
  flex-basis: 80px;
  color: #fff;
`;

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
      <ControlsContainer>
        <IconButton aria-label="skip next" color="primary" onClick={this.props.previous}>
          <Icon>skip_previous</Icon>
        </IconButton>
        <IconButton
          aria-label="play pause"
          color="primary"
          onClick={playing ? this.props.pause : this.props.play}
        >
          <Icon style={{ fontSize: 45 }}>{playing ? 'pause' : 'play_arrow'}</Icon>
        </IconButton>
        <IconButton aria-label="skip next" color="primary" onClick={this.props.next}>
          <Icon>skip_next</Icon>
        </IconButton>
        {currentTrack &&
          <SliderContainer>
            <SliderTime>
              {formatDuration(sliderValue)}
            </SliderTime>
            <Slider
              value={sliderValue}
              min={0}
              max={currentTrack.duration}
              onBeforeChange={this.handleStartSeeking}
              onChange={this.handleSliderChange}
              onAfterChange={this.handleSeek}
            />
            <SliderTime>
              {formatDuration(currentTrack.duration)}
            </SliderTime>
          </SliderContainer>
        }
      </ControlsContainer>
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
  next: PropTypes.func.isRequired,
  previous: PropTypes.func.isRequired,
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
  next,
  previous,
};

const PlayerControlsWrapper = connect(mapStateToProps, mapDispatchToProps)(PlayerControls);

export default PlayerControlsWrapper;
