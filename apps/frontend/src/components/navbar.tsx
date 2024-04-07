import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import axios from 'axios';

const NavBar = () => {
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
        <Button color="inherit" href="/signup">
          Sign Up
        </Button>
        <Button color="inherit" href="/login">
          Log In
        </Button>
        <Button
          color="inherit"
          onClick={async () => await axios.post('api/account/logout')}
        >
          Log Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
