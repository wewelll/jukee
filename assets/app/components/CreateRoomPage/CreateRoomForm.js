import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import InputAdornment from '@material-ui/core/InputAdornment';
import { TextField } from 'redux-form-material-ui';
import Button from '@material-ui/core/Button';
import StarIcon from '@material-ui/icons/Star';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { createRoomRoutine } from 'actions/room';
import { CREATE_ROOM_FORM } from 'utils/constants/forms';
import history from 'utils/history';
import routes, { createRoute } from 'config/routes';

class CreateRoomForm extends PureComponent {
  handleSubmit = (event) => {
    const { handleSubmit, urlValue } = this.props;
    handleSubmit(createRoomRoutine)(event)
      .catch(() => {
        if (this.props.roomExists) {
          history.push(createRoute(routes.room, { roomUrl: urlValue }));
        }
      });
  }

  render() {
    const { roomExists } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Field
            name={CREATE_ROOM_FORM.fields.url}
            component={TextField}
            placeholder="room name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  jukee.co/room/
                </InputAdornment>
              ),
            }}
            autoComplete="off"
          />
          <br />
          <br />
          <Button
            type="submit"
            variant="raised"
            color={roomExists ? 'secondary' : 'primary'}
            fullWidth
          >
            {roomExists ? 'Join the room ' : 'Create a room '}
            {roomExists ? <MusicNoteIcon /> : <StarIcon />}
          </Button>
        </form>
      </div>
    );
  }
}

CreateRoomForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  urlValue: PropTypes.string,
  roomExists: PropTypes.bool.isRequired,
};

CreateRoomForm.defaultProps = {
  urlValue: undefined,
};

export default CreateRoomForm;
