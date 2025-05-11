import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          P914 Inventory System
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;