import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, branch, renderNothing } from 'recompose';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import AutoplaySwitch from 'components/AutoplaySwitch';
import PlaybackSwitch from 'components/PlaybackSwitch';
import { playerExists } from 'selectors/player';
import { togglePause } from 'actions/player';
import PlayerControls from './controls';
import CurrentTrack from './currentTrack';

const PlayerBarContainer = styled(Grid).attrs({ justify: 'center' })`
  background: #353883;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 16px;
`;

class PlayerBar extends PureComponent {
  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    // check that space has been pressed, not on an input or textarea
    const tag = event.target.tagName.toLowerCase();
    if (event.keyCode === 32 && tag !== 'input' && tag !== 'textarea') {
      event.preventDefault();
      this.props.togglePause();
    }
  }

  render() {
    const { mini } = this.props;
    return (
      <PlayerBarContainer container className={this.props.className}>
        {mini
        ? (
          <Fragment>
            <Grid item xs={10}>
              <CurrentTrack mini={mini} />
            </Grid>
            <Grid item xs={2}>
              <PlayerControls onlyPlayPause />
            </Grid>
          </Fragment>
           )
        : (
          <Fragment>
            <Grid item xs={12}>
              <CurrentTrack />
            </Grid>
            <Grid item xs={12}>
              <PlayerControls />
            </Grid>
            <AutoplaySwitch />
            <PlaybackSwitch />
          </Fragment>
           )
        }
      </PlayerBarContainer>
    );
  }
}

PlayerBar.propTypes = {
  togglePause: PropTypes.func.isRequired,
  className: PropTypes.string,
  mini: PropTypes.bool,
};

PlayerBar.defaultProps = {
  className: '',
  mini: false,
};

const mapStateToProps = state => ({
  shouldHide: !playerExists(state),
});

const mapDispatchToProps = {
  togglePause,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(({ shouldHide }) => shouldHide, renderNothing),
)(PlayerBar);
