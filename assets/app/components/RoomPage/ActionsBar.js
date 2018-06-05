import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';


export class ActionsBar extends PureComponent {
  render() {
    return (
      <BottomNavigation className={this.props.className}>
        <BottomNavigationAction label="Search" value="recents" icon={<Icon>search</Icon>} />
        <BottomNavigationAction label="People" value="favorites" icon={<Icon>people</Icon>} />
        <BottomNavigationAction label="Chat" value="nearby" icon={<Icon>chat</Icon>} />
      </BottomNavigation>
    );
  }
}

ActionsBar.propTypes = {
  className: PropTypes.string,
};

ActionsBar.defaultProps = {
  className: '',
};

export default ActionsBar;
