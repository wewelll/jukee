import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import { getCurrentTrack } from 'selectors/player';

const CurrentTrackContainer = styled.div`
  display: flex;
  align-items: center;

  .currentTrack_image_container {
    max-width: 25%;
    display: flex;
    align-items: center;
    flex-basis: ${({ mini }) => (mini ? '60px' : '100px')};

    .currentTrack_image {
      max-height: ${({ mini }) => (mini ? '50px' : '80px')};
      max-width: ${({ mini }) => (mini ? '60px' : '100px')};
    }
  }

  div.title {
    max-width: 75%;
    margin-left: 10px;
  }
`;

class CurrentTrack extends Component {
  render() {
    const { currentTrack, mini } = this.props;
    return (
      currentTrack
        ? (
          <CurrentTrackContainer mini={mini}>
            <div className="currentTrack_image_container">
              <img className="currentTrack_image" src={currentTrack.largeThumbnail} alt="current_track" />
            </div>
            <div className="title">
              <Typography noWrap>
                {currentTrack.title}{currentTrack.title}
              </Typography>
              <Typography noWrap>
                {currentTrack.channelTitle}
              </Typography>
            </div>
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
  mini: PropTypes.bool,
};

CurrentTrack.defaultProps = {
  currentTrack: null,
  mini: false,
};

const mapStateToProps = state => ({
  currentTrack: getCurrentTrack(state),
});

const CurrentTrackWrapper = connect(mapStateToProps)(CurrentTrack);

export default CurrentTrackWrapper;
