import { connect } from 'react-redux';
import { compose } from 'recompose';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import { closeDialog } from 'actions/room';
import { getActiveDialog } from 'selectors/room';
import RoomDialog from './RoomDialog';

const mapStateToProps = (state, props) => ({
  open: getActiveDialog(state) === props.value,
});

const mapDispatchToProps = {
  closeDialog,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withMobileDialog(),
);

export default enhance(RoomDialog);
