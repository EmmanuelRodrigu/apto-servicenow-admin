import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import NotLoggedRoutes from './routes/NotLoggedRoutes';
import { ToastContainer } from 'react-toastify';
import { Provider, globalStore } from '@store'
import './styles/app.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider createStore={globalStore}>
    <BrowserRouter>
      <NotLoggedRoutes />
    </BrowserRouter>
    <ToastContainer/>
  </Provider>
)
