import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './containers/App/index.jsx';
import { ToastContainer } from 'react-toastify';
import { Provider, globalStore } from '@store'
import './styles/app.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider createStore={globalStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <ToastContainer/>
  </Provider>
)
