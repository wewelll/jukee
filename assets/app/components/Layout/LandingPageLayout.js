import styled from 'styled-components';
import Layout from './LayoutWrapper';
import landingBackgroundImage from './landing_background.jpg';

const LandingPageLayout = styled(Layout)`
  height: 100vh;
  background-image: url(${landingBackgroundImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export default LandingPageLayout;
