import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getCurrentTrack } from 'selectors/player';

const TrackImage = styled.img`
  max-height: 80px;
  max-width: 100px;
`;

const CurrentTrackContainer = styled.div`
  display: flex;
`;

const ImageContainer = styled.div`
  flex-basis: 100px;
`;

const TrackTitleContainer = styled.div`
  flex: 1;
  margin-left: 10px;
  color: #fff;
`;

class CurrentTrack extends Component {
  render() {
    const { currentTrack } = this.props;
    return (
      currentTrack
        ? (
          <CurrentTrackContainer>
            <ImageContainer>
              <TrackImage src={currentTrack.largeThumbnail} size="tiny" alt="current_track" />
            </ImageContainer>
            <TrackTitleContainer>
              {currentTrack.title} <br />
              {currentTrack.channelTitle}
            </TrackTitleContainer>
          </CurrentTrackContainer>
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
