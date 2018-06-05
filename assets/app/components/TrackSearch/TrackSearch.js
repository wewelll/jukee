import React, { PureComponent, Fragment } from 'react';

import TrackSearchForm from './trackSearchForm';
import TrackSearchResultsList from './resultsList';

class TrackSearch extends PureComponent {
  render() {
    return (
      <Fragment>
        <TrackSearchForm />
        <TrackSearchResultsList />
      </Fragment>
    );
  }
}

export default TrackSearch;
