import React, { PureComponent, Fragment } from 'react';
import Tracklist from 'components/Tracklist';
import styled from 'styled-components';

import ActionsBar from './ActionsBar';
import MiniPlayerBar from './MiniPlayerBar';

const MobileRoomPageContainer = styled.div`
  background: #ffffff;
  padding-bottom: 68px;
  padding-top: 56px;
  width: 100%;
`;

const MobileMiniPlayerBar = styled(MiniPlayerBar)`
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
  height: 100%;
  overflow: scroll;
`;

export class MobileRoomPage extends PureComponent {
  render() {
    return (
      <Fragment>
        <MobileRoomPageContainer>
          <FullWidthTracklist />
        </MobileRoomPageContainer>
        <MobileMiniPlayerBar />
        <MobileActionsBar />
      </Fragment>
    );
  }
}

MobileRoomPage.propTypes = {
};

export default MobileRoomPage;
