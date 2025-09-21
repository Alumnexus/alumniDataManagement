// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
// reportWebVitals();


import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ For routing
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
  <React.StrictMode>
    {/* ✅ Wrap the entire app with BrowserRouter to enable routing */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Optional: log performance metrics
reportWebVitals();
