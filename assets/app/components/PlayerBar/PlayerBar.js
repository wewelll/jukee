import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, branch, renderNothing } from 'recompose';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import { playerExists } from 'selectors/player';
import { togglePause } from 'actions/player';
import PlayerControls from './controls';
import CurrentTrack from './currentTrack';

const BottomPlayerBarContainer = styled(Grid)`
  background: #353883;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 16px;
`;

class PlayerBar extends Component {
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
    return (
      <BottomPlayerBarContainer container>
        <Grid item xs={12} sm={6}>
          <CurrentTrack />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PlayerControls />
        </Grid>
      </BottomPlayerBarContainer>
    );
  }
}

PlayerBar.propTypes = {
  togglePause: PropTypes.func.isRequired,
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
