import React from 'react';
import { Typography, Container, Grid, Paper,Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const ErrorPage = ({ errorMessage }) => {
    const navigate = useNavigate();
    const handleSupport = () =>{
        window.location.href = "https://www.google.com";
    }
    const handleLoginPage = () => {
        sessionStorage.clear();
        navigate("/")
    }
  
    return (
        <Container maxWidth="sm">
            <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                        <Typography variant="h4" gutterBottom>
                            Oops! Something went wrong.
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {errorMessage}
                        </Typography>
                        <Button variant="text" onClick={handleSupport}>
                            Contact Support
                        </Button>
                        <Button variant="text" onClick={handleLoginPage}>
                            Go Back to Login
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ErrorPage;
