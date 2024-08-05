// src/components/PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const PrivateRoute = ({ element }) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
   
    return <Navigate to="/" state={{ from: location }} />;
  }

  return element;
};

export default PrivateRoute;
