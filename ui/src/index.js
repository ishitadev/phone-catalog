import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { MobileCatalogProvider } from './Context/MobileCatalogContext';
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MobileCatalogProvider>
        <App />
      </MobileCatalogProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

