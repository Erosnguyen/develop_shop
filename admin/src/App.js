import { CssBaseline, ThemeProvider } from '@mui/material';
import { useNavigate, useRoutes } from 'react-router-dom';
import Router from './routes/Router';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import { ToastContainer } from 'react-toastify';
import { baselightTheme } from './theme/DefaultColors';
import { useEffect } from 'react';

function App() {
  const routing = useRoutes(Router);
  const theme = baselightTheme;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
    } else {
      navigate('/auth/login');
    }
  }, [navigate]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ButtonStyles />
      {routing}
      <ToastContainer autoClose={3000} />
    </ThemeProvider>
  );
}

function ButtonStyles() {
  return (
    <style>{`
      .MuiButton-root {
        text-transform: none; /* Đặt kiểu chữ về none để không làm cho văn bản thành hoa */
      }
    `}</style>
  );
}
export default App;
