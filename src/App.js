import './App.css';

import { useAuth } from './hooks/useAuth';

import { AuthenticatedApp } from './components/AuthenticatedApp';
import { UnauthenticatedApp } from './components/UnauthenticatedApp';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#33691e',
    },
    secondary: {
      main: '#4db6ac',
    },
    success: {
      main: '#1976d2',
    },
  },
  typography: {    
      fontFamily: [
        '-apple-system',
        'Lato',
        'sans-serif',
        'BlinkMacSystemFont',
        'Roboto',
      ].join(','),    
  }
});

function App() {
  const { user } = useAuth()

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <CssBaseline />
        <div className="App">
          { user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </div>
      
      </Box>
    </ThemeProvider>
  );
}

export default App;
