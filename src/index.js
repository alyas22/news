import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import App from './App.js';
import 'bootstrap/scss/bootstrap.scss';
import './views/Shared/_style.scss';
// setup fake backend
import { configureFakeBackend } from './helper/fakeBackend';
configureFakeBackend();
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
