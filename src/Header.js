import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Citizen
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => changeLanguage('en')}>
            English
          </Button>
          <Button color="inherit" onClick={() => changeLanguage('kn')}>
            ಕನ್ನಡ
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
