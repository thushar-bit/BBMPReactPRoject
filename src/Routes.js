// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Login from './Pages/Login';
import BbmpForm from './Pages/BbmpForm';
import Header from './Header';
import Footer from './Footer';

const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/bbmp-form" element={<BbmpForm />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
