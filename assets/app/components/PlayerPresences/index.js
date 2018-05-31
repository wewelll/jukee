import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import PersonIcon from '@material-ui/icons/Person';

import { getPresences } from 'selectors/player';

class PlayerPresences extends PureComponent {
  render() {
    const { presences } = this.props;
    return (
      <Grid container direction="row" justify="center" spacing={16}>
        {presences.map(presence => (
          <Grid item>
            <Tooltip title={presence.username} placement="bottom">
              <Avatar key={presence.id}>
                <PersonIcon />
              </Avatar>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
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
