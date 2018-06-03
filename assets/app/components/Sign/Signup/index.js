import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { SignupForm } from 'components';
import { LandingPageLayout } from 'components/Layout';
import Grid from '@material-ui/core/Grid';

export class Signup extends Component {
  render() {
    const { submittingForm } = this.props;

    return (
      <DocumentTitle title="Signup">
        <LandingPageLayout>
          <Grid container justify="center">
            <SignupForm submittingForm={submittingForm} />
          </Grid>
        </LandingPageLayout>
      </DocumentTitle>
    );
  }
}

Signup.propTypes = {
  submittingForm: PropTypes.bool,
};

Signup.defaultProps = {
  submittingForm: false,
};

const mapStateProps = state => ({
  submittingForm: state.session.submittingForm,
});

export default connect(mapStateProps)(Signup);
