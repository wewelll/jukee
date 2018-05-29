import 'babel-polyfill';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';

import reducers from 'reducers';

export const sagaMiddleware = createSagaMiddleware();

export default function configureStore(browserHistory) {
  const router = routerMiddleware(browserHistory);
  const composeEnhancers =
    process.env.NODE_ENV !== 'production'
      // eslint-disable-next-line no-underscore-dangle
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
      : compose;

  const middleware = [sagaMiddleware, router];

  const createStoreWithMiddleware = composeEnhancers(applyMiddleware(...middleware))(createStore);

  return createStoreWithMiddleware(reducers);
}
