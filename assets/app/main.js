import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';

import history from 'utils/history';
import configureStore, { sagaMiddleware } from 'store';
import Root from 'config/Root';
import CustomRedbox from 'config/CustomRedbox';
import Sagas from 'sagas';

import './main.scss';

const store = configureStore(browserHistory);

sagaMiddleware.run(Sagas);

const render = (Component) => {
  ReactDOM.render(
    <AppContainer errorReporter={CustomRedbox}>
      <Provider store={store}>
        <Component history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./config/Root', () => {
    const newApp = require('./config/Root').default;
    render(newApp);
  });
}
