import React, { Component } from 'react';

import TrackSearchForm from './trackSearchForm';
import TrackSearchResultsList from './resultsList';

class TrackSearch extends Component {
  render() {
    return (
      <div>
        <h3>Jukee search</h3>
        <TrackSearchForm />
        <TrackSearchResultsList />
      </div>
    );
  }
}

export default TrackSearch;
