import React from 'react';
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';

const NavBar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
      }
  return (
    <AppBar position="static">
    <Container>
      <Toolbar>
          {user ? (
            <Box>
              <Button color="inherit" onClick={handleClick}>
                Log out
              </Button>
              <Typography variant="body1" color="inherit" sx={{ marginLeft: 2 }}>
                {user.email}
              </Typography>
            </Box>
          ) : (
            <Box>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </Box>
          )}
      </Toolbar>
    </Container>
  </AppBar>
);
};

export default NavBar;
