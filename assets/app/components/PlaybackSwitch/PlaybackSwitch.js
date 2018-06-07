import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Icon from '@material-ui/core/Icon';

import { getPlayback } from 'selectors/player';
import { setPlayback } from 'actions/player';

class PlaybackSwitch extends Component {
  handleSetPlayback = (event) => {
    this.props.setPlayback(!event.target.checked);
  }

  render() {
    const { playback, className } = this.props;
    return (
      <FormControlLabel
        control={
          <Switch
            checked={!playback}
            onChange={this.handleSetPlayback}
            color="secondary"
          />
          }
        label={<Icon color="secondary">volume_off</Icon>}
        className={className}
      />
    );
  }
}

PlaybackSwitch.propTypes = {
  playback: PropTypes.bool,
  className: PropTypes.string,
  setPlayback: PropTypes.func.isRequired,
};

PlaybackSwitch.defaultProps = {
  playback: false,
  className: '',
};

const mapStateToProps = state => ({
  playback: getPlayback(state),
});

const mapDispatchToProps = {
  setPlayback,
};

const PlayerWrapper = connect(mapStateToProps, mapDispatchToProps)(PlaybackSwitch);

export default PlayerWrapper;
