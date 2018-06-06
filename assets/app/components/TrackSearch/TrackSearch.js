import React, { PureComponent, Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

import TrackSearchForm from './trackSearchForm';
import TrackSearchResultsList from './resultsList';

const SearchFormContainer = styled(Paper)`
  padding: 12px;
`;

const ResultsContainer = styled(Paper)`
  margin-top: 24px;
  padding: 12px;
  height: calc(100% - 80px);
  min-height: 300px;
  overflow: scroll;
`;

class TrackSearch extends PureComponent {
  render() {
    return (
      <Fragment>
        <SearchFormContainer>
          <TrackSearchForm />
        </SearchFormContainer>
        <ResultsContainer>
          <TrackSearchResultsList />
        </ResultsContainer>
      </Fragment>
    );
  }
}

export default TrackSearch;
