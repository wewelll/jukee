import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPresences } from 'selectors/player';

class PlayerPresences extends PureComponent {
  render() {
    const { presences } = this.props;
    return (
      <div>
        {presences.length} people are in this room
      </div>
    );
  }
}

PlayerPresences.propTypes = {
  presences: PropTypes.arrayOf(PropTypes.shape({
    count: PropTypes.number,
  })).isRequired,
};

const mapStateToProps = state => ({
  presences: getPresences(state),
});

const PlayerPresencesWrapper = connect(mapStateToProps)(PlayerPresences);

export default PlayerPresencesWrapper;
