import React from 'react';
import BbmpForm from './BbmpForm';
import Header from './Header';
import Footer from './Footer';
import { Container , Box} from '@mui/material';

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

export default App;
