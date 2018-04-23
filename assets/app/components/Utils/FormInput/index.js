import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'semantic-ui-react';

export default class FormInput extends Component {
  render() {
    const {
      input, type, placeholder, meta,
    } = this.props;

    return (
      <Form.Field error={!!(meta.touched && meta.error)}>
        <Input
          {...input}
          type={type}
          placeholder={placeholder}
        />
        {meta.touched &&
          meta.error && <span>{meta.error}</span>}
      </Form.Field>
    );
  }
}

FormInput.propTypes = {
  input: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

FormInput.defaultProps = {
  label: '',
  type: '',
  placeholder: '',
};
