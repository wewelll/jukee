import React, { PureComponent, Fragment } from 'react';
import Tracklist from 'components/Tracklist';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

import PlayerBar from 'components/PlayerBar';
import ActionsBar from './ActionsBar';

const MobileRoomPageContainer = styled.div`
  background: #ffffff;
  padding-bottom: 68px;
  padding-top: 56px;
  width: 100%;
`;

const MobilePlayerBarContainer = styled(Paper)`
  height: 68px;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const MobileActionsBar = styled(ActionsBar)`
  height: 56px;
  position: absolute;
  width: 100%;
`;

const FullWidthTracklist = styled(Tracklist)`
  width: 100%;
`;

export class MobileRoomPage extends PureComponent {
  render() {
    return (
      <Fragment>
        <MobileRoomPageContainer>
          <FullWidthTracklist />
        </MobileRoomPageContainer>
        <MobilePlayerBarContainer>
          <PlayerBar mini />
        </MobilePlayerBarContainer>
        <MobileActionsBar />
      </Fragment>
    );
  }
}

MobileRoomPage.propTypes = {
};

export default MobileRoomPage;
