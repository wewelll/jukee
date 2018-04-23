import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { Grid, Segment } from 'semantic-ui-react';
import { Layout, LoginForm } from 'components';


export class Login extends Component {
  render() {
    const { submittingForm } = this.props;

    return (
      <DocumentTitle title="Login">
        <Layout>
          <Grid
            textAlign="center"
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Segment stacked>
                <LoginForm submittingForm={submittingForm} />
              </Segment>
            </Grid.Column>
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
