import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

export default class ControlledProgressReactPlayer extends Component {
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.progress &&
      Math.abs(this.player.getCurrentTime() - nextProps.progress) > nextProps.progressPrecision
    ) {
      this.player.seekTo(nextProps.progress);
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
      />
    );
  }
}

ControlledProgressReactPlayer.propTypes = {
  progress: PropTypes.number,
  progressPrecision: PropTypes.number,
};


ControlledProgressReactPlayer.defaultProps = {
  progress: null,
  progressPrecision: 1,
};
