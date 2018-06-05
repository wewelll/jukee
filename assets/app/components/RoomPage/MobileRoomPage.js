import React, { PureComponent, Fragment } from 'react';
import { Tracklist } from 'components';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

import PlayerBar from 'components/PlayerBar';

const MobileRoomPageContainer = styled.div`
  background: #ffffff;
  padding-top: 150px;
`;

const MobilePlayerBar = styled(PlayerBar)`
  max-height: 150px;
  position: absolute;
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
        <MobilePlayerBar />
      </Fragment>
    );
  }
}

MobileRoomPage.propTypes = {
};

export default MobileRoomPage;
