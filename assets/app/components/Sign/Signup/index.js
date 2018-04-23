import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { Grid, Segment } from 'semantic-ui-react';
import { Layout, SignupForm } from 'components';

export class Signup extends Component {
  render() {
    const { submittingForm } = this.props;

    return (
      <DocumentTitle title="Signup">
        <Layout>
          <Grid
            textAlign="center"
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Segment stacked>
                <SignupForm submittingForm={submittingForm} />
              </Segment>
            </Grid.Column>
          </Grid>
        </Layout>
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
