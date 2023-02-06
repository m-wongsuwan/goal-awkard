import { useAuth } from './hooks/useAuth';
import './App.css';
import { AuthenticatedApp } from './components/AuthenticatedApp';
import { UnauthenticatedApp } from './components/UnauthenticatedApp';

function App() {
  const { user } = useAuth()

  return (
    <div className="App">
      { user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
