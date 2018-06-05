import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';


export class ActionsBar extends PureComponent {
  render() {
    return (
      <Grid container className={this.props.className} justify="space-around" alignItems="center">
        <Grid item>
          <Button
            variant="fab"
            aria-label="search"
            color="primary"
          >
            <Icon>search</Icon>
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="fab"
            aria-label="people"
            color="primary"
          >
            <Icon>people</Icon>
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="fab"
            aria-label="chat"
            color="primary"
          >
            <Icon>chat</Icon>
          </Button>
        </Grid>
      </Grid>
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
