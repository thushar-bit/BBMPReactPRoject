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
import EKYCResponse from './Pages/EKYCResponse';
import ErrorPage from './Pages/ErrorPage';
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
          <Route path="/AreaDimension/:DropdownValue" element={<AreaDimension />} />
          <Route path="/SiteDetails" element={<SiteDetails />} />
          <Route path="/BuildingDetails" element={<BuildingDetails />} />
          <Route path="/MultiStoreyBuildingDetails" element={<MultiStoreyBuildingDetails />} />
          <Route path="/OwnerDetails" element={<OwnerDetails />} />
          <Route path="/PropertyRights" element={<PropertyRights />} />
          <Route path="/DocumentUploadPage" element={<DocumentUploadPage />} />
          <Route path="/ClassificationDocumentUploadPage" element={<ClassificationDocumentUploadPage />} />
          <Route path="/EKYCResponse" element={<EKYCResponse />} />
          <Route path="/ErrorPage" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
    
  );
};

export default AppRoutes;
