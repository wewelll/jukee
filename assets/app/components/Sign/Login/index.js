import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import Grid from '@material-ui/core/Grid';
import { Layout, LoginForm } from 'components';


export class Login extends Component {
  render() {
    const { submittingForm } = this.props;

    return (
      <DocumentTitle title="Login">
        <Layout>
          <Grid container justify="center">
            <LoginForm submittingForm={submittingForm} />
          </Grid>
        </Layout>
      </DocumentTitle>
    );
  }
}

Login.propTypes = {
  submittingForm: PropTypes.bool,
};

Login.defaultProps = {
  submittingForm: false,
};

const mapStateProps = state => ({
  submittingForm: state.session.submittingForm,
});

export default connect(mapStateProps)(Login);
