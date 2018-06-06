import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TRACK_SEARCH_FORM } from 'utils/constants/forms';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import { trackSearchRoutine } from 'actions/trackSearch';

class CreateRoomForm extends PureComponent {
  render() {
    const { handleSubmit, submitting, autoFocus } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(trackSearchRoutine)}>
          <div>
            <Field
              name={TRACK_SEARCH_FORM.fields.query}
              component={TextField}
              placeholder="Search"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {submitting ? <CircularProgress size={24} /> : <SearchIcon />}
                  </InputAdornment>
                ),
              }}
              autoComplete="off"
              autoFocus={autoFocus}
            />
          </div>
        </form>
      </div>
    );
  }
}

CreateRoomForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  autoFocus: PropTypes.bool,
};

CreateRoomForm.defaultProps = {
  autoFocus: false,
};

export default reduxForm({
  form: TRACK_SEARCH_FORM.name,
})(CreateRoomForm);
