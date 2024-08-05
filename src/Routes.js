// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import AddressDetails from './Pages/AddressDetails';
import AreaDimension from './Pages/AreaDimension';
import SiteDetails from './Pages/SiteDetails';
import BuildingDetails from './Pages/BuildingDetails';
import MultiStoreyBuildingDetails from './Pages/MultiStoreyBuildingDetails';
import OwnerDetails from './Pages/OwnerDetails';
import PropertyRights from './Pages/PropertyRights';
import DocumentUploadPage from './Pages/DocumentUploadPage';
import ClassificationDocumentUploadPage from './Pages/ClassificationDocumentUploadPage';
import EKYCResponse from './Pages/EKYCResponse';
import ErrorPage from './Pages/ErrorPage';
import Header from './Header';
import Footer from './Footer';
import Breadcrumbs from './components/Breadcrumbs';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthProvider';

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router basename="/citizen_core">
        <Header />
        <div className="App">
          <Breadcrumbs />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/AddressDetails"
              element={<PrivateRoute element={<AddressDetails />} />}
            />
            <Route
              path="/AreaDimension/:DropdownValue"
              element={<PrivateRoute element={<AreaDimension />} />}
            />
            <Route
              path="/SiteDetails"
              element={<PrivateRoute element={<SiteDetails />} />}
            />
            <Route
              path="/BuildingDetails"
              element={<PrivateRoute element={<BuildingDetails />} />}
            />
            <Route
              path="/MultiStoreyBuildingDetails"
              element={<PrivateRoute element={<MultiStoreyBuildingDetails />} />}
            />
            <Route
              path="/OwnerDetails"
              element={<PrivateRoute element={<OwnerDetails />} />}
            />
            <Route
              path="/PropertyRights"
              element={<PrivateRoute element={<PropertyRights />} />}
            />
            <Route
              path="/DocumentUploadPage"
              element={<PrivateRoute element={<DocumentUploadPage />} />}
            />
            <Route
              path="/ClassificationDocumentUploadPage"
              element={<PrivateRoute element={<ClassificationDocumentUploadPage />} />}
            />
            <Route
              path="/EKYCResponse"
              element={<PrivateRoute element={<EKYCResponse />} />}
            />
            <Route path="/ErrorPage" element={<ErrorPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
