import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import AlertState from './context/AlertState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AlertState>
      <App />
    </AlertState>
  </React.StrictMode>
);

