// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import BBDDraft from './Pages/BBDDraft';
import BBDDraftGenerated from './Pages/BBDDraftGenerated';
import TaxDetails from './Pages/TaxDetails';
import AreaDimension from './Pages/AreaDimension';
import SiteDetails from './Pages/SiteDetails';
import BuildingDetails from './Pages/BuildingDetails';
import MultiStoreyBuildingDetails from './Pages/MultiStoreyBuildingDetails';
import OwnerDetails from './Pages/OwnerDetails';
import LocationDetails from './Pages/LocationDetails';
import ClassificationDocumentUploadPage from './Pages/ClassificationDocumentUploadPage';
import EKYCResponse from './Pages/EKYCResponse';
import ESignPage from './Pages/E-SignPage';
import ErrorPage from './Pages/ErrorPage';
import Header from './Header';
import Footer from './Footer';
import Breadcrumbs from './components/Breadcrumbs';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthProvider';
import ScrollToTop from './components/ScrollTop';
import KaveriData from './Pages/KaveriData';

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router basename="/citizen_core/">
      <ScrollToTop />
        <Header />
        <div className="App">
          <Breadcrumbs />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/BBDDraftGenerated"
              element={<PrivateRoute element={<BBDDraftGenerated />} />}
            /> 
             <Route
              path="/BBDDraft"
              element={<PrivateRoute element={<BBDDraft />} />}
            /> 
             <Route
              path="/TaxDetails"
             element={<TaxDetails />}
            />
             <Route
              path="/KaveriData"
              element={<PrivateRoute element={<KaveriData />} />}
            /> 
             <Route
              path="/OwnerDetails"
              element={<PrivateRoute element={<OwnerDetails />} />}
            />
            <Route
              path="/LocationDetails"
              element={<PrivateRoute element={<LocationDetails />} />}
            />
            <Route
              path="/AreaDimension"
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
              path="/ClassificationDocumentUploadPage"
              element={<PrivateRoute element={<ClassificationDocumentUploadPage />} />}
            />
            <Route
              path="/EKYCResponse"
              element={<PrivateRoute element={<EKYCResponse />} />}
            />
              <Route
              path="/ESignPage"
              element={<PrivateRoute element={<ESignPage />} />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
