import { useAuth } from './hooks/useAuth';
import './App.css';
import { AuthenticatedApp } from './components/AuthenticatedApp';
import { UnauthenticatedApp } from './components/UnauthenticatedApp';

import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const { user } = useAuth()

  return (
    <Box>
      <CssBaseline />
      <div className="App">
        { user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </div>
    
    </Box>
  );
}

export default App;
