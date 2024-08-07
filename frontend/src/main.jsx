import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AlertState from './context/AlertState.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AlertState>
      <App />
    </AlertState>
  </React.StrictMode>,
)
