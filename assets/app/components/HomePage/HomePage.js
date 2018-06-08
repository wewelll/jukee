import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import routes from 'config/routes';

import LandingPageLayout from 'components/Layout/LandingPageLayout';
import RoomsList from './RoomsList';

const RoomListHeader = styled(Grid).attrs({ item: true })`
  padding: 24px;
`;

export class HomePage extends PureComponent {
  componentDidMount() {
    this.props.getMyRooms();
    this.props.getVisitedRooms();
  }

  render() {
    const { myRooms, visitedRooms } = this.props;
    return (
      <DocumentTitle title="Jukee - Home">
        <LandingPageLayout>
          <Grid container direction="column" alignItems="center" spacing={24}>
            <RoomListHeader item>
              <Paper>My rooms</Paper>
            </RoomListHeader>
            <Grid item>
              <RoomsList rooms={myRooms} />
            </Grid>
            <RoomListHeader item>
              <Paper>Rooms I visited</Paper>
            </RoomListHeader>
            <Grid item>
              <RoomsList rooms={visitedRooms} />
            </Grid>
            <RoomListHeader item>
              <Paper><Link to={routes.createRoom}>Create a new room</Link></Paper>
            </RoomListHeader>
          </Grid>
        </LandingPageLayout>
      </DocumentTitle>
    );
  }
}

HomePage.propTypes = {
  myRooms: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  visitedRooms: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getMyRooms: PropTypes.func.isRequired,
  getVisitedRooms: PropTypes.func.isRequired,
};

export default HomePage;
