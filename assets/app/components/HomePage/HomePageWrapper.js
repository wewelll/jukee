import { connect } from 'react-redux';
import { getMyRoomsRoutine, getVisitedRoomsRoutine } from 'actions/home';

import HomePage from './HomePage';

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  getMyRooms: getMyRoomsRoutine.request,
  getVisitedRooms: getVisitedRoomsRoutine.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
