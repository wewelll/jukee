import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

export default class ControlledProgressReactPlayer extends Component {
  componentWillReceiveProps(nextProps) {
    this.seekIfNeeded(nextProps.progress, nextProps.progressPrecision);
  }

  seekIfNeeded(progress, progressPrecision) {
    if (
      progress &&
      Math.abs(this.player.getCurrentTime() - progress) > progressPrecision
    ) {
      this.player.seekTo(progress);
    }
  }

  handleOnReady = () => {
    const { progress, progressPrecision, onReady } = this.props;
    this.seekIfNeeded(progress, progressPrecision);
    if (onReady) {
      onReady();
    }
  }

  ref = (player) => {
    this.player = player;
  }

  render() {
    const { progress, progressPrecision, ...props } = this.props;
    return (
      <ReactPlayer
        ref={this.ref}
        {...props}
        onReady={this.handleOnReady}
      />
    );
  }
}

ControlledProgressReactPlayer.propTypes = {
  progress: PropTypes.number,
  progressPrecision: PropTypes.number,
  onReady: PropTypes.func,
};


ControlledProgressReactPlayer.defaultProps = {
  progress: null,
  progressPrecision: 0.5,
  onReady: undefined,
};
