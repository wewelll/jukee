import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

import { Layout, SignupForm } from 'components';

export class Signup extends Component {
  render() {
    const { submittingForm } = this.props;

    return (
      <DocumentTitle title="Signup">
        <Layout>
          <SignupForm submittingForm={submittingForm} />
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
