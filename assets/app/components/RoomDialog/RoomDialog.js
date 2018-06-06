import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const DialogContainer = styled.div`
  background: #E1E5CF;
  padding-top: 56px;

  @media (min-width: 600px) {
    padding-top: 64px;
  }
`;

const DialogContent = styled.div`
  height: calc(100vh - 56px);
  padding: 0;

  @media (min-width: 600px) {
    height: calc(100vh - 64px);
  }

  overflow: scroll;
`;

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ResponsiveDialog extends React.Component {
  handleClose = () => {
    this.props.closeDialog();
  };

  render() {
    const {
      fullScreen, open, children, title,
    } = this.props;

    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={this.handleClose}
        aria-labelledby="responsive-dialog-title"
        TransitionComponent={Transition}
      >
        <DialogContainer>
          <AppBar color="secondary" position="fixed">
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <Icon>close</Icon>
              </IconButton>
              <Typography variant="title" color="inherit">
                {title}
              </Typography>
            </Toolbar>
          </AppBar>
          <DialogContent>
            {children}
          </DialogContent>
        </DialogContainer>
      </Dialog>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  closeDialog: PropTypes.func.isRequired,
  title: PropTypes.string,
};

ResponsiveDialog.defaultProps = {
  title: '',
};

export default ResponsiveDialog;
