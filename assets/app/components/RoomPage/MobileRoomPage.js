import React, { PureComponent, Fragment } from 'react';
import { Tracklist } from 'components';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

import PlayerBar from 'components/PlayerBar';

const MobileRoomPageContainer = styled.div`
  background: #ffffff;
  padding-bottom: 68px;
`;

const MobilePlayerBar = styled(PlayerBar)`
  max-height: 68px;
  position: absolute;
  bottom: 0;
`;

export class MobileRoomPage extends PureComponent {
  render() {
    return (
      <Fragment>
        <MobileRoomPageContainer>
          <Grid container style={{ maxHeight: '100%', overflow: 'scroll' }}>
            <Grid item>
              <Tracklist />
            </Grid>
          </Grid>
        </MobileRoomPageContainer>
        <MobilePlayerBar mini />
      </Fragment>
    );
  }
}

MobileRoomPage.propTypes = {
};

export default MobileRoomPage;
