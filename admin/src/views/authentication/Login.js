import React, { useState } from 'react';
import { Grid, Box, Card, Typography } from '@mui/material';

// components
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthLogin from './auth/AuthLogin';
import { login } from './authServices';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Login2 = () => {
  const [state, setState] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((pre) => ({ ...pre, [id]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', state?.username);
      formData.append('password', state?.password);
      const data = await login(formData);
      if (data?.status === 200) {
        localStorage.setItem('token', data?.data?.access_token);
        toast.success('Đăng nhập thành công');
        navigate("/");
      }
      else {
        toast.error('Đăng nhập thất bại');
      }
    } catch (error) {
      toast.error(error?.response?.data?.detail);
      console.log(error);
    }
  };
  return (
    <PageContainer title="Đăng nhập" description="this is Login page">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
                <Typography
                  variant="subtitle1"
                  textAlign="center"
                  color="textSecondary"
                  fontWeight={600}
                  fontSize={'1rem'}
                >
                  Phần mềm quản lý Food
                </Typography>
              </Box>
              <form onSubmit={handleLogin}>
                <AuthLogin state={state} handleChange={handleChange} />
              </form>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;
