import { connect } from 'react-redux';
import { getMyRoomsRoutine, getVisitedRoomsRoutine } from 'actions/home';
import { getMyRooms, getVisitedRooms } from 'selectors/home';

import HomePage from './HomePage';

const mapStateToProps = state => ({
  myRooms: getMyRooms(state),
  visitedRooms: getVisitedRooms(state),
});
const mapDispatchToProps = {
  getMyRooms: getMyRoomsRoutine.request,
  getVisitedRooms: getVisitedRoomsRoutine.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
