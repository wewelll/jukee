import { connect } from 'react-redux';
import { logout } from 'actions/session';
import Layout from './Layout';

const mapDispatchToProps = {
  logout,
};

const mapStateProps = state => ({
  username: state.session.currentUser.username,
  isAuthenticated: state.session.isAuthenticated,
});

export default connect(mapStateProps, mapDispatchToProps)(Layout);
