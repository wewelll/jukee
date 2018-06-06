import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';

import { roomTabs } from 'config/roomViews';
import { getActiveTab } from 'selectors/room';
import { getPresencesNumber } from 'selectors/player';
import { changeTab } from 'actions/room';

export class ActionsTabs extends PureComponent {
  handleChange = (event, value) => {
    this.props.changeTab(value);
  };

  render() {
    const { className, activeTab, presencesNumber } = this.props;
    return (
      <Tabs
        value={activeTab}
        className={className}
        fullWidth
        indicatorColor="primary"
        textColor="primary"
        onChange={this.handleChange}
      >
        <Tab value={roomTabs.SEARCH} icon={<Icon>search</Icon>} />
        <Tab
          value={roomTabs.USERS}
          icon={
            <Badge badgeContent={presencesNumber} color="secondary">
              <Icon>people</Icon>
            </Badge>
          }
        />
        <Tab value={roomTabs.CHAT} icon={<Icon>chat</Icon>} />
      </Tabs>
    );
  }
}

ActionsTabs.propTypes = {
  changeTab: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  className: PropTypes.string,
  presencesNumber: PropTypes.number.isRequired,
};

ActionsTabs.defaultProps = {
  className: '',
};

const mapStateToProps = state => ({
  activeTab: getActiveTab(state),
  presencesNumber: getPresencesNumber(state),
});

const mapDispatchToProps = {
  changeTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionsTabs);
