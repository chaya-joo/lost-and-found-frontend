import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, MenuItem, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../routes/paths';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ProfileSettings from '../components/ProfileSettings';

const CustomLayout = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate(`/${PATHS.home}`);
  };

  return (
    <div>
      <AppBar position="static" sx={{ direction: 'rtl' }}>
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <MenuItem onClick={handleHomeClick}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              חזרה לדף הבית
            </Typography>
            <ArrowForwardIcon />
          </MenuItem>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default CustomLayout;
