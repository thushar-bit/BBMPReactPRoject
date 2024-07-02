// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import BbmpForm from './Pages/BbmpForm';
import AreaDimension from './Pages/AreaDimension';
import SiteDetails from './Pages/SiteDetails';
import BuildingDetails from './Pages/BuildingDetails';
import MultiStoreyBuildingDetails from './Pages/MultiStoreyBuildingDetails';
import OwnerDetails from './Pages/OwnerDetails';
import PropertyRights from './Pages/PropertyRights';
import DocumentUploadPage from './Pages/DocumentUploadPage';
import ClassificationDocumentUploadPage from './Pages/ClassificationDocumentUploadPage';
import TaxEventPage from './Pages/TaxEventPage';
import ObjectionPage from './Pages/ObjectionPage';
import Header from './Header';
import Footer from './Footer';
import Breadcrumbs from './components/Breadcrumbs';

const AppRoutes = () => {
  
  return (
    <Router>
      <Header />
      <div className="App">
        <Breadcrumbs />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/bbmp-form" element={<BbmpForm />} />
          <Route path="/AreaDimension" element={<AreaDimension />} />
          <Route path="/SiteDetails" element={<SiteDetails />} />
          <Route path="/BuildingDetails" element={<BuildingDetails />} />
          <Route path="/MultiStoreyBuildingDetails" element={<MultiStoreyBuildingDetails />} />
          <Route path="/OwnerDetails" element={<OwnerDetails />} />
          <Route path="/PropertyRights" element={<PropertyRights />} />
          <Route path="/DocumentUploadPage" element={<DocumentUploadPage />} />
          <Route path="/ClassificationDocumentUploadPage" element={<ClassificationDocumentUploadPage />} />
          <Route path="/TaxEventPage" element={<TaxEventPage />} />
          <Route path="/ObjectionPage" element={<ObjectionPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
