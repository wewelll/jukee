import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import TrackSearchForm from './trackSearchForm';
import TrackSearchResultsList from './resultsList';

class TrackSearch extends Component {
  render() {
    return (
      <Container>
        <h3>Search tracks</h3>
        <TrackSearchForm />
        <TrackSearchResultsList />
      </Container>
    );
  }
}

export default TrackSearch;
