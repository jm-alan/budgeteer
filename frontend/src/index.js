import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import Modal from './components/Modal';
import configureStore from './store';

import './index.css';

const store = configureStore();

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
