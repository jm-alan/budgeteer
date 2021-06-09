import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import Modal from './components/Modal';
import configureStore from './store';

import './index.css';
import csrfetch from './store/csrf';

// eslint-disable-next-line no-extend-native
String.prototype.padEndUntil = function (pattern, val) {
  let out = this.toString();
  while (!out.match(pattern)) (out += val);
  return out;
};

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.dispatch = store.dispatch;
  window.csrfetch = csrfetch;
}

function Root () {
  return (
    <BrowserRouter>
      <App />
      <Modal />
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
