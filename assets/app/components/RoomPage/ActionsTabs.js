import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export class ActionsBar extends PureComponent {
  render() {
    return (
      <Tabs
        className={this.props.className}
        fullWidth
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab icon={<Icon>search</Icon>} />
        <Tab icon={<Icon>people</Icon>} />
        <Tab icon={<Icon>chat</Icon>} />
      </Tabs>
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
