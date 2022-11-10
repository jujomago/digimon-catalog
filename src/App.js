import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { store } from './store'
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
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>

  );
}

export default App;
