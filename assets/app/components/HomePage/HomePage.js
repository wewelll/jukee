import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { LandingPageLayout } from 'components/Layout';

export class HomePage extends PureComponent {
  componentDidMount() {
    this.props.getMyRooms();
    this.props.getVisitedRooms();
  }

  render() {
    return (
      <DocumentTitle title="Jukee">
        <LandingPageLayout />
      </DocumentTitle>
    );
  }
}

HomePage.propTypes = {
  getMyRooms: PropTypes.func.isRequired,
  getVisitedRooms: PropTypes.func.isRequired,
};

export default HomePage;
