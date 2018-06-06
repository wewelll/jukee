import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

import PlayerBar from 'components/PlayerBar';
import { Tracklist, TrackSearch, PlayerPresences } from 'components';
import { roomTabs } from 'config/roomViews';
import { getActiveTab } from 'selectors/room';
import ActionsTabs from './ActionsTabs';

const WebPlayerBar = styled(PlayerBar)`
  height: 200px;
`;

const TracklistContainer = styled(Paper)`
  margin-top: 24px;
  height: calc(100% - 224px);
  min-height: 300px;
  overflow: scroll;
`;

const WebActionsTabs = styled(ActionsTabs)`
  height: 48px;
`;

const TabContent = styled.div`
  margin-top: 24px;
  height: calc(100% - 72px);
`;

export class WebRoomPage extends PureComponent {
  getTabContent = () => {
    switch (this.props.activeTab) {
      case roomTabs.SEARCH:
        return <TrackSearch />;
      case roomTabs.USERS:
        return <PlayerPresences />;
      default:
        return null;
    }
  }

  render() {
    return (
      <Grid container spacing={24} justify="center" style={{ height: '100%' }}>
        <Grid item xs={12} md={6}>
          <Paper>
            <WebPlayerBar />
          </Paper>
          <TracklistContainer>
            <Tracklist />
          </TracklistContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <WebActionsTabs />
          </Paper>
          <TabContent>
            {this.getTabContent()}
          </TabContent>
        </Grid>
      </Grid>
    );
  }
}

WebRoomPage.propTypes = {
  activeTab: PropTypes.string.isRequired,
};


const mapStateToProps = state => ({
  activeTab: getActiveTab(state),
});

export default connect(mapStateToProps)(WebRoomPage);
