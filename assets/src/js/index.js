import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { Router, browserHistory } from 'react-router';

import reducers from './reducers';
import routes from './routes';

import promiseMiddleware from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

// DEV: Enable Webpack hot module replacement for reducers
if(module.hot) {
  module.hot.accept('./reducers', () => {
    const nextReducer = require('./reducers/index').default;
    store.replaceReducer(nextReducer);
  });
}

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.app-container'));
