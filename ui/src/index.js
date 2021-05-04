import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { MobileCatalogProvider } from './Context/LanguageContext';
//localStorage.clear();
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

