import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Badge from '@material-ui/core/Badge';

import { roomDialogs } from 'config/roomViews';
import { getPresencesNumber } from 'selectors/player';
import { openDialog } from 'actions/room';

export class ActionsBar extends PureComponent {
  render() {
    const { presencesNumber } = this.props;
    return (
      <BottomNavigation className={this.props.className}>
        <BottomNavigationAction label="Search" value={roomDialogs.SEARCH} icon={<Icon>search</Icon>} />
        <BottomNavigationAction
          label="People"
          value={roomDialogs.USERS}
          icon={
            <Badge badgeContent={presencesNumber} color="secondary">
              <Icon>people</Icon>
            </Badge>
          }
        />
        <BottomNavigationAction label="Chat" value={roomDialogs.CHAT} icon={<Icon>chat</Icon>} />
      </BottomNavigation>
    );
  }
}

ActionsBar.propTypes = {
  className: PropTypes.string,
  presencesNumber: PropTypes.number.isRequired,
};

ActionsBar.defaultProps = {
  className: '',
};


const mapStateToProps = state => ({
  presencesNumber: getPresencesNumber(state),
});

const mapDispatchToProps = {
  openDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionsBar);
