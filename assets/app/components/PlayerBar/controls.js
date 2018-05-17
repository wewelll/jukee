import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Button } from 'semantic-ui-react';

import { getPlayer } from 'selectors/player';
import { pause, play } from 'actions/player';

class PlayerControls extends Component {
  render() {
    const { playing } = this.props.player;
    return (
      <Container textAlign="center">
        {playing
            ? <Button basic inverted size="large" color="violet" circular icon="pause" onClick={this.props.pause} />
            : <Button basic inverted size="large" color="violet" circular icon="play" onClick={this.props.play} />
          }
      </Container>
    );
  }
}

PlayerControls.propTypes = {
  player: PropTypes.shape({
    currentTrack: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
    playing: PropTypes.bool,
    muted: PropTypes.bool,
    volume: PropTypes.number,
  }),
  pause: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
};

PlayerControls.defaultProps = {
  player: {
    playing: false,
    muted: false,
    volume: 1,
  },
};

const mapStateToProps = state => ({
  player: getPlayer(state),
});

const mapDispatchToProps = {
  pause,
  play,
};

const PlayerControlsWrapper = connect(mapStateToProps, mapDispatchToProps)(PlayerControls);

export default PlayerControlsWrapper;
