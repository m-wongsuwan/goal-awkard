import React from 'react';
import ReactDOM from 'react-dom/client';

// import './index.css';

import App from './App';

import { AccountabilityProvider } from './context/accountability';
import { AuthProvider } from './context/auth';
import { SizingProvider } from './context/sizing';

// import CssBaseline from '@mui/material/CssBaseline';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <SizingProvider>
      <AccountabilityProvider>
        <App />
      </AccountabilityProvider>
    </SizingProvider>
  </AuthProvider>
);
