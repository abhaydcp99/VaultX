
import React from 'react';                       // ✅ Required
import ReactDOM from 'react-dom/client';         // ✅ Required
import App from './App';        
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';   // ✅ Optional: Bootstrap styling
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ThemeProvider } from './context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
 <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
