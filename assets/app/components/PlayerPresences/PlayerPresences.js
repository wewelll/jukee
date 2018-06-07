import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

import { getPresences } from 'selectors/player';

const PresencesContainer = styled(Paper)`
  height: 100%;
  min-height: 300px;
  overflow: scroll;
`;

class PlayerPresences extends PureComponent {
  render() {
    const { presences } = this.props;
    return (
      <PresencesContainer>
        <List dense>
          <ListSubheader style={{ background: '#fff' }}>People ({presences.length})</ListSubheader>
          {presences.map(presence => (
            <ListItem key={presence.id} divider>
              <Avatar><PersonIcon /></Avatar>
              <ListItemText primary={presence.username} />
            </ListItem>
          ))}
        </List>
      </PresencesContainer>
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
