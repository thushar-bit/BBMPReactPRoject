import React from 'react';
import BbmpForm from './BbmpForm';
import Header from './Header';
import Footer from './Footer';
import { Container, Box } from '@mui/material';
import './i18n';

function App() {
  return (
    <div className="App">
      <Header />
      <Box mt={4}>
        <Container>
          <BbmpForm />
        </Container>
      </Box>
      <Footer />
    </div>
  );
}

// Create a root and render the App component


export default App;
