import logo from './logo.svg';
import './App.css';
import { Button } from '@mui/material';
//import LoginPage from './pages/login'
import RegisterPage from './pages/RegisterPage'
//import DashboardPage from './pages/DashboardPage'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { PrivateLayout } from './layouts/PrivateLayout';
import LoginPage from './pages/LoginPage';
import { Provider } from 'react-redux';
import { store } from './store'
import { useCheckAuth } from './hooks/useCheckAuth';
import { AppRouter } from './router/AppRouter';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
}
);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <HashRouter>
          <AppRouter />
        </HashRouter>
      </ThemeProvider>
    </Provider>

  );
}

export default App;
