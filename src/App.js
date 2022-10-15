import logo from './logo.svg';
import './App.css';
import { Button } from '@mui/material';
//import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import Dashboard from './pages/dashboard'
import { createTheme, ThemeProvider } from '@mui/material/styles';
function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  }
  );
  return (
    <ThemeProvider theme={theme}>
      {/*  <LoginPage />*/}
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
