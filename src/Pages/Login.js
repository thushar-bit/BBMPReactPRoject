// src/pages/Login.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField, Typography, Container, Box } from '@mui/material';

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic (authentication)
    // For simplicity, checking if username and password match
    if (username === 'admin' && password === 'password') {
      // Navigate to BbmpForm on successful login
      history.push('/bbmp-form');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
