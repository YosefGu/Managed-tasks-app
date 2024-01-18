import React from 'react'
import { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material'
import { useLogin } from '../hooks/useLogin';
import GoogleLoginButton from '../componenets/googleLogin'
import { Link } from 'react-router-dom';
// import { useGoogleLogin } from '../hooks/useGoogleLogin';
// import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, isLoading, error } = useLogin();
    // const {googleLogin, gError } = useGoogleLogin();

    const handleSubmit = async (event) => {
        event.preventDefault();
        await login(email, password)
    };

    // const handleGoogleLogin = async (data) => {
    //   await googleLogin(data)
    // }
  
    return (
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5" mb={2}>
            Sign in
          </Typography>
          <Box display='flex' style={{m:'10px'}}>
            <Typography>New user?</Typography>
            <Typography 
              variant="body1" 
              color="primary" 
              component={Link} 
              to='/signup'
              style={{textDecoration:'none', marginLeft:5}}
              > 
              Create an account
              </Typography>
          </Box>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, display:{isLoading}}}>
              Login
            </Button>         
            {error && <Typography>{error}</Typography>}
            <Typography
              variant="body1" 
              color="primary" 
              component={Link} 
              to='/identify'
              style={{textDecoration:'none', marginLeft:5}}
            >
            Forget password?
            </Typography>
          </form>
          <h3 className='or'>or</h3>
          <GoogleLoginButton />
        </Paper>      
      </Container>
    );
  };
export default Login