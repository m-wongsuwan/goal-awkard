import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { AccountabilityProvider } from './context/accountability';
import { AuthProvider } from './context/auth';
import { SizingProvider } from './context/sizing';

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
