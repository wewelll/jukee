import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { getAutoplay } from 'selectors/player';
import { setAutoplay } from 'actions/player';

class AutoplaySwitch extends Component {
  handleSetAutoplay = (event) => {
    this.props.setAutoplay(event.target.checked);
  }

  render() {
    const { autoplay, className } = this.props;
    return (
      <FormControlLabel
        control={
          <Switch
            checked={autoplay}
            onChange={this.handleSetAutoplay}
            color="secondary"
          />
          }
        label="Autoplay"
        className={className}
      />
    );
  }
}

AutoplaySwitch.propTypes = {
  autoplay: PropTypes.bool,
  className: PropTypes.string,
  setAutoplay: PropTypes.func.isRequired,
};

AutoplaySwitch.defaultProps = {
  autoplay: false,
  className: '',
};

const mapStateToProps = state => ({
  autoplay: getAutoplay(state),
});

const mapDispatchToProps = {
  setAutoplay,
};

const PlayerWrapper = connect(mapStateToProps, mapDispatchToProps)(AutoplaySwitch);

export default PlayerWrapper;
