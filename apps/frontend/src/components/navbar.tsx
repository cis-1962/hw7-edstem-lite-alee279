import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import axios from 'axios';

const NavBar = () => {
  const [username, setUsername] = useState('');
  const [logInStatus, setLogInStatus] = useState(false);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        if (logInStatus) {
          const response = await axios.get('/api/account/user');
          setUsername(response.data.username);
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };
    const fetchLogInStatus = async () => {
      try {
        const response = await axios.get('/api/account/isLoggedIn');
        setLogInStatus(response.data.isLoggedIn);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchLogInStatus();
    fetchUsername();
  }, [logInStatus, username]);

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
        {logInStatus ? (
          <>
            <Typography variant="body1">Hi {username}! </Typography>
            <Button
              color="inherit"
              onClick={async () => {
                await axios.post('/api/account/logout');
                window.location.href = '/';
              }}
              sx={{ marginLeft: '10px' }}
            >
              Log Out
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" href="/signup">
              Sign Up
            </Button>
            <Button color="inherit" href="/login">
              Log In
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
