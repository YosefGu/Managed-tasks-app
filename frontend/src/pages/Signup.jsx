import React from 'react'
import { useState } from 'react';
import { Container, Paper, Typography, TextField, Button } from '@mui/material'
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
    const [name, setName] = useState('');
    const [lName, setLname] = useState('');
    const [title, setTitle] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [manager, setManager] = useState(true);

    const {signup, isLoading, error } = useSignup();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        await signup(name, lName, title, email, password, manager)
    };
  
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
            Sign up
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
             <TextField
              margin="normal"
              required
              fullWidth
              id="lName"
              label="Last name"
              name="lName"
              autoComplete="lName"
              autoFocus
              value={lName}
              onChange={(e) => setLname(e.target.value)}
            />
             <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
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
              Sign up
            </Button>
            {error && <Typography>{error}</Typography>}
          </form>
        </Paper>
      </Container>
    );
  };
export default Signup