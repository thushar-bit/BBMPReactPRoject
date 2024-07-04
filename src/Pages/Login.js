import React, { useState } from 'react';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../components/Axios';
function generateCaptcha() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
}



export default function Login() {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const navigate = useNavigate();
  const regenerateCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput('');
  };
 const handleLogin = async  (e) =>{
  const response1 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_BBD_DRAFT?UlbCode=555&propertyid=104931');
  const response2 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP?UlbCode=555&propertyid=104931');

  // Store data in local storage
  sessionStorage.setItem('BBD_DRAFT_API', JSON.stringify(response1));
  sessionStorage.setItem('NCL_TEMP_API', JSON.stringify(response2));
  navigate('/bbmp-form');
 }
  return (
    <main>
      <CssBaseline />
      <Sheet
        sx={{
          width: { xs: '90%', sm: 400, md: 500 },
          mx: 'auto', // margin left & right
          my: 6, // margin top & bottom
          py: 6, // padding top & bottom
          px: 6, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1">
            <b>Welcome!</b>
          </Typography>
          <Typography level="body-md">Sign in to continue.</Typography>
        </div>
        <FormControl>
          <FormLabel>Phone Number</FormLabel>
          <Input
            name="text"
            type="text"
            placeholder="+91-XXXXXXXXXX"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Input
              name="password"
              type="password"
              placeholder="password"
              sx={{ flex: 1 }}
            />
            <Button variant="solid" color="primary">OTP</Button>
          </Box>
        </FormControl>
        <FormControl>
          <FormLabel>CAPTCHA</FormLabel>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '150px',
                height: '50px',
                backgroundColor: '#e0e0e0',
                fontSize: '24px',
                fontWeight: 'bold',
                userSelect: 'none', // Prevent text selection
              }}
            >
              {captcha.split('').map((char, index) => (
                <span key={index} >
                  {char}
                </span>
              ))}
            </Box>
            <Button variant="outlined" onClick={regenerateCaptcha}>Regenerate</Button>
          </Box>
          <Input
            name="captcha"
            type="text"
            placeholder="Enter CAPTCHA"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            sx={{ mt: 1 }}
          />
        </FormControl>
        <Button sx={{ mt: 1 /* margin top */ }} onClick={handleLogin}>Log in</Button>
      </Sheet>
    </main>
  );
}
