import 'bootstrap/scss/bootstrap.scss';
import './views/Shared/_style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import App from './App.js';
// setup fake backend
import { configureFakeUserBackend, configureFakeUserNewsBackend } from './helper/fakeBackend';
configureFakeUserBackend();
configureFakeUserNewsBackend();
const loggerMiddleware = createLogger();
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
