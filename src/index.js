import React from 'react';
import ReactDOM from 'react-dom';
//import 'js/jquery-1.11.0.min.js';
//import 'js/bootstrap.min.js';
//import 'js/wow.min.js';
// import '@fontawesome/fontawesome-free/css/all.min.css';
import './index.css';
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import App from './App';
import reportWebVitals from './reportWebVitals';




ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
