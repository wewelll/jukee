import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ButtonBase from '@material-ui/core/ButtonBase';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

import { RoomDialog, PlayerBar } from 'components';
import { roomDialogs } from 'config/roomViews';
import { openDialog } from 'actions/room';

const DialogPlayerBar = styled(PlayerBar)`
  height: 300px;
`;

const PlayerBarButton = styled(ButtonBase).attrs({ component: 'div' })`
  width: 100%;
`;

export class MiniPlayerBar extends PureComponent {
  handleOpenPlayerDialog = (event) => {
    const playPauseButton = document.getElementById('play_pause_button');
    if (!playPauseButton || !playPauseButton.contains(event.target)) {
      this.props.openDialog(roomDialogs.PLAYER);
    }
  }

  render() {
    const { className } = this.props;
    return (
      <Paper className={className}>
        <PlayerBarButton onClick={this.handleOpenPlayerDialog}>
          <PlayerBar mini />
        </PlayerBarButton>
        <RoomDialog value={roomDialogs.PLAYER} title="Player">
          <DialogPlayerBar />
        </RoomDialog>
      </Paper>
    );
  }
}

MiniPlayerBar.propTypes = {
  className: PropTypes.string,
  openDialog: PropTypes.func.isRequired,
};

MiniPlayerBar.defaultProps = {
  className: '',
};

const mapDispatchToProps = {
  openDialog,
};

export default connect(null, mapDispatchToProps)(MiniPlayerBar);
