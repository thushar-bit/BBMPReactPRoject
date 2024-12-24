// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import PropertyList from './Pages/BBDDraft';
import ObjectorsPage from './Pages/ObjectorsPage';
import PendanceReport from './Pages/PendanceReport'
import TaxDetails from './Pages/TaxDetails';
import AreaDimension from './Pages/AreaDimension';
import GoogleMapsWardCoordinates from './Pages/GetWardByCoordintes';
import UploadECPage from './Pages/UploadECPage';
import Get_EAASTHI_Status from "./Pages/Get_EAASTHI_Status";
import GetDailyReport from "./Pages/GetDailyReport";
import DailyReportDetails from "./Pages/DailyReportDetails";
import SiteDetails from './Pages/SiteDetails';
import BuildingDetails from './Pages/BuildingDetails';
import MultiStoreyBuildingDetails from './Pages/MultiStoreyBuildingDetails';
import OwnerDetails from './Pages/OwnerDetails';
import LocationDetails from './Pages/LocationDetails';
import ClassificationDocumentUploadPage from './Pages/ClassificationDocumentUploadPage';
import EKYCResponse from './Pages/EKYCResponse';
import EKYCSearchResponse from './Pages/EKYCSearchResponse';
import ESignPage from './Pages/E-SignPage';
import ErrorPage from './Pages/ErrorPage';
import Header from './Header';
import Footer from './Footer';
import Breadcrumbs from './components/Breadcrumbs';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthProvider';
import ScrollToTop from './components/ScrollTop';
import KaveriData from './Pages/KaveriData';
import BBDDraftGenerated from './Pages/BBDDraftGenerated';
import PendanceReportDetails from './Pages/PendanceReportDetails';
import ECDailyReport from './Pages/ECDailyReport';
import SearchProperty from './Pages/SearchProperty';
import MutationDailyReport from './Pages/MutationDailyReport';
import PublicNoticesReport from './Pages/PublicNoticesReport';
import MasterReportPage from './Pages/MasterReportPage';
const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router basename="/citizen_core/">
       {/* <Router basename="/objection_form_test/">  */}
      <ScrollToTop />
        <Header />
        <div className="App">
          {/* <Breadcrumbs /> */}
          <Routes>
            <Route path="/" element={<BBDDraftGenerated />} />
            <Route path="/PropertyList" element={<PropertyList />} />
            {/* <Route
              path="/BBDDraftGenerated"
              element={<PrivateRoute element={<BBDDraftGenerated />} requiredStep={1} />}
            />  */}
            <Route
              path="/GoogleMapsWardCoordinates"
              element={<GoogleMapsWardCoordinates />} 
            /> 
              <Route
              path="/Get_EAASTHI_Status"
              element={<Get_EAASTHI_Status />} 
            /> 
             <Route
              path="/GetDailyReport"
              element={<GetDailyReport />} 
            />
             <Route
              path="/DailyReportDetails"
              element={<DailyReportDetails />} 
            />
              <Route
              path="/PendanceReport"
              element={<PendanceReport />} 
            />
              <Route
              path="/PendanceReportDetails"
              element={<PendanceReportDetails />} 
            />
            <Route
              path="/ObjectorsPage"
              element={<ObjectorsPage />}  /> 
              <Route
              path="/EKYCResponse"
              element={<EKYCResponse />}  />
                    <Route
              path="/EKYCSearchResponse"
              element={<EKYCSearchResponse />}  />
               <Route
              path="/UploadECPage"
              element={<UploadECPage />}  />
              <Route 
              path='/ECDailyReport'
              element={<ECDailyReport/>}/>
                 <Route 
              path='/SearchProperty'
              element={<SearchProperty/>}/>
              <Route 
              path='/MutationDailyReport'
              element={<MutationDailyReport/>}/>
                 <Route 
              path='/PublicNoticesReport'
              element={<PublicNoticesReport/>}/>
                 <Route 
              path='/MasterReportPage'
              element={<MasterReportPage/>}/>
                {/* <Route
              path="/EKYCResponse"
              element={<EKYCResponse />}  />
           
             {/* <Route
              path="/BBDDraft"
              element={<PrivateRoute element={<BBDDraft />} requiredStep={1} />}
            />  */}
                {/* <Route
              path="/ObjectorsPage"
              element={<PrivateRoute element={<ObjectorsPage />} requiredStep={3} />}
            /> 
             <Route
              path="/TaxDetails"
              element={<PrivateRoute element={<TaxDetails />} requiredStep={3} />}
            />
             <Route
              path="/KaveriData"
              element={<PrivateRoute element={<KaveriData />} requiredStep={4}  />}
            /> 
             <Route
              path="/OwnerDetails"
              element={<PrivateRoute element={<OwnerDetails />} requiredStep={5} />}
            />
            <Route
              path="/LocationDetails"
              element={<PrivateRoute element={<LocationDetails />} requiredStep={6} />}
            />
            <Route
              path="/AreaDimension"
              element={<PrivateRoute element={<AreaDimension />}requiredStep={7}  />}
            />
            <Route
              path="/SiteDetails"
              element={<PrivateRoute element={<SiteDetails />} requiredStep={8} />}
            />
            <Route
              path="/BuildingDetails"
              element={<PrivateRoute element={<BuildingDetails />} requiredStep={8} />}
            />
            <Route
              path="/MultiStoreyBuildingDetails"
              element={<PrivateRoute element={<MultiStoreyBuildingDetails  />} requiredStep={8}/>}
            />
            <Route
              path="/ClassificationDocumentUploadPage"
              element={<PrivateRoute element={<ClassificationDocumentUploadPage />} requiredStep={9} />}
            />
           
              <Route
              path="/ESignPage"
              element={<PrivateRoute element={<ESignPage />} />}
            /> */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
