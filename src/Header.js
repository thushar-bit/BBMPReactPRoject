import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import bbmplogo from "./assets/bbmp.png"
import niclogo from "./assets/NIC_Logo1-01.png"

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
    <AppBar position="sticky"  sx={{ bgcolor: '#1b5e20' }}>
      <Toolbar>
      <Box
          component="img"
          src={bbmplogo} // replace with the actual path to your logo
          alt="Logo"
          sx={{ width: 120, height: 100, marginRight: 2 }} // Customize size and margin as needed
        />
        <Typography variant="h6" fontFamily="cursive" style={{ flexGrow: 1 }}>
        ಬೃಹತ್ ಬೆಂಗಳೂರು ಮಹಾನಗರ ಪಾಲಿಕೆ
        </Typography>
        <Typography variant="h6" fontFamily="cursive" style={{ flexGrow: 1 }}>
        ಇ-ಆಸ್ತಿ
        </Typography>
        <Box
          component="img"
          src={niclogo} // replace with the actual path to your logo
          alt="Logo"
          sx={{ width: 250, height: 150, marginRight: 2 }} // Customize size and margin as needed
        />
      </Toolbar>
      <Toolbar>
      <Typography variant="h6" fontFamily="cursive" >
      ಮುಖಪುಟ
        </Typography>
        <Typography variant="h6" fontFamily="cursive" >
        ನಾಗರಿಕ ಸೇವೆಗಳು 
        </Typography>
        <Typography variant="h6" fontFamily="cursive" >
        ವರದಿಗಳು
        </Typography>
        <Typography variant="h6" fontFamily="cursive" style={{ flexGrow: 1 }}>
        ಆಸ್ತಿ ತೆರಿಗೆ
        </Typography>
      <Box>
          <Button color="inherit" onClick={() => handleLanguageChange('en')}>
            English
          </Button>
          <Button color="inherit" onClick={() => handleLanguageChange('kn')}>
            ಕನ್ನಡ
          </Button>
          {location.pathname !== '/' && (
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
