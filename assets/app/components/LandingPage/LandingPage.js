import React, { PureComponent } from 'react';
import DocumentTitle from 'react-document-title';
import Layout from 'components/Layout';
import styled from 'styled-components';
import landingBackgroundImage from './landing_background.jpg';

const LandingPageLayout = styled(Layout)`
  height: 100vh;
  background-image: url(${landingBackgroundImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export class LandingPage extends PureComponent {
  render() {
    return (
      <DocumentTitle title="Jukee">
        <LandingPageLayout />
      </DocumentTitle>
    );
  }
}

export default LandingPage;
