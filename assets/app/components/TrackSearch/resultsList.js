import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, List, Image } from 'semantic-ui-react';

import { getTrackSearchResults } from 'selectors/trackSearch';

class TrackSearchResultsList extends Component {
  render() {
    const { results } = this.props;
    return (
      <Container>
        <List selection verticalAlign="middle">
          {results.map(result => (
            <List.Item
              key={result.externalId}
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
    externalId: PropTypes.number.isRequired,
    thumbnail: PropTypes.string,
    title: PropTypes.string.isRequired,
    channelTitle: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = state => ({
  results: getTrackSearchResults(state),
});

const PlayerWrapper = connect(mapStateToProps)(TrackSearchResultsList);

export default PlayerWrapper;

