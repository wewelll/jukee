import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import session from 'reducers/session';
import errors from 'reducers/errors';
import player from 'reducers/player';
import trackSearch from 'reducers/trackSearch';
import room from 'reducers/room';
import home from 'reducers/home';
import { types as sessionTypes } from 'actions/session';

const appReducer = combineReducers({
  form,
  session,
  errors,
  player,
  trackSearch,
  room,
  home,
  routing: routerReducer,
});

export default function(state, action) {
  if (action.type === sessionTypes.LOGOUT) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
}
