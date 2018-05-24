import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, List, Image } from 'semantic-ui-react';

import { getTrackSearchResults } from 'selectors/trackSearch';
import { addTrack } from 'actions/player';

class TrackSearchResultsList extends Component {
  handleResultClick = result => () => {
    this.props.addTrack(result.provider, result.externalId);
  }

  render() {
    const { results } = this.props;
    return (
      <Container>
        <List selection verticalAlign="middle">
          {results.map(result => (
            <List.Item
              key={result.externalId}
              onClick={this.handleResultClick(result)}
            >
              <Image avatar src={result.thumbnail} />
              <List.Content>
                <List.Header>{result.title}</List.Header>
                <List.Description>{result.channelTitle}</List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Container>
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

