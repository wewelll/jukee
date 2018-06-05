import React, { PureComponent, Fragment } from 'react';
import { Tracklist } from 'components';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

import PlayerBar from 'components/PlayerBar';
import ActionsBar from './ActionsBar';

const MobileRoomPageContainer = styled.div`
  background: #ffffff;
  padding-bottom: 68px;
  padding-top: 68px;
`;

const MobilePlayerBar = styled(PlayerBar)`
  height: 68px;
  position: absolute;
  bottom: 0;
`;

const MobileActionsBar = styled(ActionsBar)`
  height: 68px;
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
        <MobilePlayerBar mini />
        <MobileActionsBar />
      </Fragment>
    );
  }
}

MobileRoomPage.propTypes = {
};

export default MobileRoomPage;
