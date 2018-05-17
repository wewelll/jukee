import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react';

import { getCurrentTrack } from 'selectors/player';

class CurrentTrack extends Component {
  render() {
    const { currentTrack } = this.props;
    return (
      currentTrack
        ? (
          <div>
            <Image src={currentTrack.large_thumbnail} size="tiny" />
          </div>
        )
        : null
    );
  }
}

CurrentTrack.propTypes = {
  currentTrack: PropTypes.shape({
    title: PropTypes.string.isRequired,
    channelTitle: PropTypes.string.isRequired,
  }),
};

CurrentTrack.defaultProps = {
  currentTrack: null,
};

const mapStateToProps = state => ({
  currentTrack: getCurrentTrack(state),
});

const CurrentTrackWrapper = connect(mapStateToProps)(CurrentTrack);

export default CurrentTrackWrapper;
