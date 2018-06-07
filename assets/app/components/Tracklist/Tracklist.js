import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import { getTracklist, getCurrentTrack } from 'selectors/player';
import { playTrack, deleteTrack } from 'actions/player';

class Tracklist extends Component {
  handleTrackClick = playerTrackIndex => () => {
    this.props.playTrack(playerTrackIndex);
  }

  handleTrackDelete = playerTrackIndex => () => {
    this.props.deleteTrack(playerTrackIndex);
  }

  render() {
    const {
      tracks, currentTrack, className,
    } = this.props;
    return (
      <div className={className}>
        <List dense>
          <ListSubheader style={{ background: '#fff' }}>Tracklist</ListSubheader>
          {tracks.map(track => (
            <ListItem
              button
              divider
              onClick={this.handleTrackClick(track.playerTrackIndex)}
              style={{
                background: currentTrack && track.playerTrackIndex === currentTrack.playerTrackIndex ? '#fb3f1d4d' : undefined,
              }}
              key={track.playerTrackIndex}
              color="primary"
            >
              <Avatar src={track.defaultThumbnail} />
              <ListItemText
                primary={track.title}
                secondary={track.channelTitle}
              />
              <ListItemSecondaryAction>
                <IconButton aria-label="delete" color="secondary" onClick={this.handleTrackDelete(track.playerTrackIndex)}>
                  <Icon>clear</Icon>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
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
  className: PropTypes.string,
};

Tracklist.defaultProps = {
  tracks: [],
  currentTrack: {},
  className: '',
};

const mapStateToProps = state => ({
  tracks: getTracklist(state),
  currentTrack: getCurrentTrack(state),
});

const mapDispatchToProps = {
  playTrack,
  deleteTrack,
};

const PlayerWrapper = connect(mapStateToProps, mapDispatchToProps)(Tracklist);

export default PlayerWrapper;
