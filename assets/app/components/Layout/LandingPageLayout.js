import styled from 'styled-components';
import Layout from './LayoutWrapper';
import landingBackgroundImage from './landing_background_2.jpg';

const LandingPageLayout = styled(Layout).attrs({
  transparentAppBar: true,
})`
  height: 100vh;
  background-image: url(${landingBackgroundImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export default LandingPageLayout;
