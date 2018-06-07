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

import { getTrackSearchResults } from 'selectors/trackSearch';
import { addTrack } from 'actions/player';

class TrackSearchResultsList extends Component {
  handleResultClick = result => () => {
    this.props.addTrack(result.provider, result.externalId);
  }

  render() {
    const { results } = this.props;
    return (
      <div>
        <List dense>
          <ListSubheader style={{ background: '#fff' }}>Results ({results.length})</ListSubheader>
          {results.map(result => (
            <ListItem
              divider
              key={result.externalId}
            >
              <Avatar src={result.thumbnail} />
              <ListItemText
                primary={result.title}
                secondary={result.channelTitle}
              />
              <ListItemSecondaryAction>
                <IconButton aria-label="add to playlist" color="primary" onClick={this.handleResultClick(result)}>
                  <Icon>add_circle_outline</Icon>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

TrackSearchResultsList.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    externalId: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    title: PropTypes.string.isRequired,
    channelTitle: PropTypes.string.isRequired,
  })).isRequired,
  addTrack: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  results: getTrackSearchResults(state),
});

const mapDispatchToProps = {
  addTrack,
};

const PlayerWrapper = connect(mapStateToProps, mapDispatchToProps)(TrackSearchResultsList);

export default PlayerWrapper;

