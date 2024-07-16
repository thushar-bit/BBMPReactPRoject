import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" fontFamily="cursive" style={{ flexGrow: 1 }}>
          EAASTHI Citizen
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => handleLanguageChange('en')}>
            English
          </Button>
          <Button color="inherit" onClick={() => handleLanguageChange('kn')}>
            ಕನ್ನಡ
          </Button>
          {location.pathname !== '/' || location.pathname === '/ErrorPage' && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
