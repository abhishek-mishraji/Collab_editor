import React from 'react';
import ReactDOM from 'react-dom/client';
// CSS import removed completely to avoid PostCSS issues
import App from './App';
import reportWebVitals from './reportWebVitals';

// Test environment variables
import './testEnv';

// Log the environment for debugging
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('All REACT_APP_ environment variables:', Object.keys(process.env)
  .filter(key => key.startsWith('REACT_APP_'))
  .reduce((obj, key) => {
    obj[key] = process.env[key].substring(0, 5) + '...'; // Only show first 5 chars for security
    return obj;
  }, {}));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
