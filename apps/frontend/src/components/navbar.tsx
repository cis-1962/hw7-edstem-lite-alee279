import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import axios from 'axios';

const NavBar = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get('/api/account/user');
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, []);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          sx={{ textAlign: 'left', flexGrow: 1 }}
        >
          EdStem Lite
        </Typography>
        <Typography>{username}</Typography>
        <Button color="inherit" href="/signup">
          Sign Up
        </Button>
        <Button color="inherit" href="/login">
          Log In
        </Button>
        <Button
          color="inherit"
          onClick={async () => await axios.post('/api/account/logout')}
        >
          Log Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
