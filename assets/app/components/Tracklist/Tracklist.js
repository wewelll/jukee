import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

import PlayerBar from 'components/PlayerBar';
import { getTracklist, getCurrentTrack, getAutoplay } from 'selectors/player';
import { playTrack, deleteTrack, setAutoplay } from 'actions/player';

const TracklistItem = styled(({ active, ...props }) => <ListItem {...props} />)`
  background-color: ${({ active }) => (active ? 'lightgrey' : '')};
`;

class Tracklist extends Component {
  handleTrackClick = playerTrackIndex => () => {
    this.props.playTrack(playerTrackIndex);
  }

  handleTrackDelete = playerTrackIndex => () => {
    this.props.deleteTrack(playerTrackIndex);
  }

  handleSetAutoplay = (event) => {
    this.props.setAutoplay(event.target.checked);
  }

  render() {
    const { tracks, currentTrack, autoplay } = this.props;
    return (
      <Grid container direction="column">
        <PlayerBar />
        <FormControlLabel
          control={
            <Switch
              checked={autoplay}
              onChange={this.handleSetAutoplay}
              color="primary"
            />
          }
          label="Autoplay"
        />
        <List dense>
          {tracks.map(track => (
            <TracklistItem
              active={currentTrack && track.playerTrackIndex === currentTrack.playerTrackIndex}
              key={track.playerTrackIndex}
              color="primary"
            >
              <Avatar src={track.defaultThumbnail} />
              <ListItemText
                primary={track.title}
                secondary={track.channelTitle}
              />
              <ListItemSecondaryAction>
                <IconButton aria-label="play" color="primary" onClick={this.handleTrackClick(track.playerTrackIndex)}>
                  <Icon>play_arrow</Icon>
                </IconButton>
                <IconButton aria-label="delete" color="secondary" onClick={this.handleTrackDelete(track.playerTrackIndex)}>
                  <Icon>delete</Icon>
                </IconButton>
              </ListItemSecondaryAction>
            </TracklistItem>
          ))}
        </List>
      </Grid>
    );
  }
}

Tracklist.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.shape({
    playerTrackIndex: PropTypes.number.isRequired,
    defaultThumbnail: PropTypes.string,
    title: PropTypes.string.isRequired,
    channelTitle: PropTypes.string.isRequired,
  })),
  currentTrack: PropTypes.shape({
    playerTrackIndex: PropTypes.number,
  }),
  playTrack: PropTypes.func.isRequired,
  deleteTrack: PropTypes.func.isRequired,
  setAutoplay: PropTypes.func.isRequired,
  autoplay: PropTypes.bool,
};

Tracklist.defaultProps = {
  tracks: [],
  currentTrack: {},
  autoplay: false,
};

const mapStateToProps = state => ({
  tracks: getTracklist(state),
  currentTrack: getCurrentTrack(state),
  autoplay: getAutoplay(state),
});

const mapDispatchToProps = {
  playTrack,
  deleteTrack,
  setAutoplay,
};

const PlayerWrapper = connect(mapStateToProps, mapDispatchToProps)(Tracklist);

export default PlayerWrapper;
