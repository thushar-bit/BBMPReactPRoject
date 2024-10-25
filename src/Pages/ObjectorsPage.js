import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Grid, Box, Container, Typography, CircularProgress, Tooltip, IconButton, 
  FormControl,  MenuItem, Select, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Radio
  ,FormControlLabel,RadioGroup
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { useNavigate,useLocation } from 'react-router-dom';
import axiosInstance from '../components/Axios';
import ErrorPage from './ErrorPage';
import LabelWithAsterisk from '../components/LabelWithAsterisk'
import MaskingValue from '../components/MaskingValue';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GetAppIcon from '@mui/icons-material/GetApp';
import { styled } from '@mui/material/styles';
import ObjectionDocumentUploadPage from './ObjectionDocumentUploadPage';
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
const ObjectorsPage = () => {
  const [formData, setFormData] = useState({
    propertyCode: '',
    propertyNumber: "",
    propertyEID: "",
    district: "",
    ulbname: "",
    buildingname: "",
    NearestLandmark: "",
    DoorPlotNo: "",
    streetid: '',
    streetName: "",
    nclStreetName:"",
    Street: "",
    doorno: '',
    areaorlocality: '',
    landmark: '',
    pincode: '',
    propertyphoto: '',
    loginId: 'crc',
    wardNumber: "",
    wardName: "",
    BBDOldWardNumber: "",
    BBDOldPropertyNumber: "",
    BBDSasApplicationNumber:"",
    BBDAddress:"",
    BBDPropertyType:"",
    BBDPropertyCategory:"",
    ReasonCategory:"",
    ReasonDetails:"",
  
    TypeOfUpload:"",
    MOBILENUMBER:"",
    EMAIL:"",
    communicationAddress:"N",
    ReasonExtension:"",
    ReasonDocument:"",
    NameExtension:"",
    NameDocument:""
  });
  const { t } = useTranslation();
 

  const navigate = useNavigate();
  const location = useLocation();
 
 
  const [loading, setLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const [tablesdata8, setTableData8] = useState([]);
  const [KaveriDocumentold,setKaveriDocumentOld] = useState([])
  const [KAVERI_DOC_DETAILS, setKAVERI_DOC_DETAILS] = useState([]);
  const [KAVERI_PROP_DETAILS, setKAVERI_PROP_DETAILS] = useState([]);
  const [KAVERI_PARTIES_DETAILS, setKAVERI_PARTIES_DETAILS] = useState([]);
 

  const [tableIdentifier,setIdentifier] = useState([])
  const [editableIndex, setEditableIndex] = useState(-1);
  const [otpFieldsVisible, setOtpFieldsVisible] = useState(false);
  const [selectedNameFile, setSelectedNameFile] = useState(null);
  const [selectedReasonFile, setSelectedReasonFile] = useState(null);
  const [fileExtension, setfileExtension] = useState([]);
  const [EkycResponseData,setEkycResponseData] = useState(null);
  
 
  const [isCommunicationAddress,setIsCommunicationAddress] = useState(false)
  
 
 
  const handleDownload = (base64Data, documentdescription) => {
    try {
    const filename = `${documentdescription}`;
debugger
    const mimeTypes = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    };

    const mimeType = mimeTypes[".pdf"] || 'application/octet-stream';


    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length).fill().map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });


    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();


    URL.revokeObjectURL(link.href);
  }
  catch(error){
    console.log(error)
  }
  };
  const handleKaveriDocumentData = async () => {

    if (formData.RegistrationNumber.length === 0) {
      toast.error(`${t("Please Enter the Registration Number")}`);
      return
    }
if(tablesdata8.length ===0){
  toast.error("Please Verify with Atleast one EKYC Owner")
  return
}

    try {
      setLoading(true)
      let response = await axiosInstance.post(`ObjectionAPI/GetObjectionKaveriDocData?RegistrationNoNumber=${formData.RegistrationNumber}&objectionid=${JSON.parse(sessionStorage.getItem('OBJECTIONID'))}&PropertyCode=${JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))}&LoginId=crc`)
      const result = response.data;
      if (result.success) {
        await fetchData("Kaveri")
        setLoading(false)
      }
      else {
        setTimeout(() => {
          toast.error(result.message)
        }, 200);
        setLoading(false)
        return
      }
      setTimeout(() => {
        toast.success(`${t("detailsFetchedSuccess")}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,

        });
      }, 500)
    }
    catch (error) {
      toast.error(`${t("errorSavingData")}` + error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate('/ErrorPage', { state: { errorMessage: error.message, errorLocation: window.location.pathname } });
      }, 1000);
    }
  };
 
 
  const fetchData = React.useCallback(async (ISKaveri) => {
    setLoading(true);
    debugger
    let response2 = null;

    let objectionid = null;

    
       objectionid = JSON.parse(sessionStorage.getItem('OBJECTIONID'));
      
    
    
    try {
      
      const response = await axiosInstance.get(`BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_BBD_DRAFT_React?ULBCODE=555&Propertycode=${JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))}&Page=ADDRESS`);
      if(objectionid === "1"){
       response2 = await axiosInstance.get(`ObjectionAPI/GET_PROPERTY_OBJECTORS_CITZ_NCLTEMP?ULBCODE=555&Propertycode=${JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))}&objectionid=${1}`);
      }else{
        response2 = await axiosInstance.get(`ObjectionAPI/GET_PROPERTY_OBJECTORS_CITZ_NCLTEMP?ULBCODE=555&Propertycode=${JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))}&objectionid=${JSON.parse(sessionStorage.getItem('OBJECTIONID'))}`);
      }
      const {Table1:Identifier=[],Table2:TableMain=[],Table3:TableReasons=[],Table4:TableOwner=[],Table5:KaveriDocument=[],Table6:ReasonDocument=[],Table7:TableKaveriDocument=[],Table8:TableKaveriprop=[],Table9:TableKaveriParties=[]} = response2.data;
      setIdentifier(Identifier.length > 0 ? Identifier : [])
      setTableData8(TableOwner.length > 0 ? TableOwner : [])
      setKaveriDocumentOld(KaveriDocument.length > 0 ? KaveriDocument : [])
      setKAVERI_DOC_DETAILS(TableKaveriDocument.length > 0 ? TableKaveriDocument : [])
      setKAVERI_PROP_DETAILS(TableKaveriprop.length > 0 ? TableKaveriprop : [])
      setKAVERI_PARTIES_DETAILS(TableKaveriParties.length > 0 ? TableKaveriParties : [])
      debugger
      const allDocuments = [...ReasonDocument]; 

 if(ISKaveri === "Kaveri"){
  setKaveriDocumentOld(KaveriDocument.length > 0 ? KaveriDocument : [])
  setKAVERI_DOC_DETAILS(TableKaveriDocument.length > 0 ? TableKaveriDocument : [])
  setKAVERI_PROP_DETAILS(TableKaveriprop.length > 0 ? TableKaveriprop : [])
  setKAVERI_PARTIES_DETAILS(TableKaveriParties.length > 0 ? TableKaveriParties : [])
  return
 }
      
      let response3 = []
      response3 = TableMain;
      if (response3.length > 0 && ISKaveri !== "Kaveri") {
        let reasonDocuments = allDocuments.filter(x => x.TYPEOFDOCUMENT === "R");
        let nameDocuments = allDocuments.filter(x => x.TYPEOFDOCUMENT === "N");
        const { Table1 = [], Table5 = [], } = response.data;
        const table1Item = Table1.length > 0 ? Table1[0] : [];
        const table5Item = Table5.length > 0 ? Table5[0] : [];
       
        setFormData({
          communicationAddress:TableMain.length > 0? TableMain[0].ISCOMMUNICATION :"N",
          TypeOfUpload:TableMain.length > 0? TableMain[0].TYPEOFKAVERIUPLOAD :"",
          ReasonCategory:TableReasons.length > 0 ?TableReasons[0].REASONID.toString() : "",
          ReasonDetails:TableReasons.length > 0 ?TableReasons[0].REASONDETAILS : "",
          doorno:TableOwner.length > 0 ? TableOwner[0].DOORNO : "",
          areaorlocality: TableOwner.length > 0 ?TableOwner[0].LOCALITY : "",
          buildingname:TableOwner.length > 0 ? TableOwner[0].BUILDINGNAME : "",
          pincode:TableOwner.length > 0 ? TableOwner[0].PINCODE : "",
          ReasonExtension: reasonDocuments.length > 0 ? reasonDocuments[0].DOCUMENTDETAILS : "",
          ReasonDocument: reasonDocuments.length > 0 ? reasonDocuments[0].SCANNEDDOCUMENT : "",
          NameExtension:nameDocuments.length > 0 ?nameDocuments[0].DOCUMENTDETAILS:"" ,
          NameDocument:nameDocuments.length > 0 ?nameDocuments[0].SCANNEDDOCUMENT:"",
          propertyEID: table1Item.PROPERTYID || '',
          address: table1Item.ADDRESS || '',
          district: table1Item.DISTRICTNAME || '',
          BBDOldWardNumber:table1Item.OLDWARDNUMBER198 || "",
          BBDOldPropertyNumber:table1Item.MUNICIPALOLDNUMBER || "",
          BBDSasApplicationNumber:table1Item.PUID || "",
          BBDAddress:table1Item.ADDRESS ? table1Item.ADDRESS : "",
          BBDPropertyType:table1Item.PROPERTYCATEGORYID  ? table1Item.PROPERTYCATEGORYID : "0",
          BBDPropertyCategory:table1Item.PROPERTYCLASSIFICATIONID ? table1Item.PROPERTYCLASSIFICATIONID === 1 ? "ನಮೂನೆ-ಎ ವಹಿ" : "ನಮೂನೆ-ಬಿ ವಹಿ": "",
          wardNumber: table1Item.WARDID || '',
          wardName: table1Item.WARDNAME || "",
          propertyNumber: table1Item.PROPERTYCODE || '',
          ulbname: table1Item.ULBNAME || '',
          ownerName: table5Item.OWNERNAME || '',
          streetName: table1Item.STREETNAME_EN || '',
        });
        if(TableMain[0].ISCOMMUNICATION === "Y"){
          setIsCommunicationAddress(true)
        }else {
          setIsCommunicationAddress(false)
        }
      } else if(ISKaveri !== "Kaveri") {
        setIsEditable(true)
        const { Table1 = [], Table5 = [], } = response.data;
      const table1Item = Table1.length > 0 ? Table1[0] : [];
      const table5Item = Table5.length > 0 ? Table5[0] : [];
      setFormData({
        propertyEID: table1Item.PROPERTYID || '',
        address: table1Item.ADDRESS || '',
        district: table1Item.DISTRICTNAME || '',
        BBDOldWardNumber:table1Item.OLDWARDNUMBER198 || "",
        BBDOldPropertyNumber:table1Item.MUNICIPALOLDNUMBER || "",
        BBDSasApplicationNumber:table1Item.PUID || "",
        BBDAddress:table1Item.ADDRESS ? table1Item.ADDRESS : "",
        BBDPropertyType:table1Item.PROPERTYCATEGORYID  ? table1Item.PROPERTYCATEGORYID : "0",
        BBDPropertyCategory:table1Item.PROPERTYCLASSIFICATIONID ? table1Item.PROPERTYCLASSIFICATIONID === 1 ? "ನಮೂನೆ-ಎ ವಹಿ" : "ನಮೂನೆ-ಬಿ ವಹಿ": "",
        wardNumber: table1Item.WARDID || '',
        wardName: table1Item.WARDNAME || "",
        propertyNumber: table1Item.PROPERTYCODE || '',
        ulbname: table1Item.ULBNAME || '',
        ownerName: table5Item.OWNERNAME || '',
        streetName: table1Item.STREETNAME_EN || '',
      });
      }
      
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('There was an error!', error);
      return <ErrorPage errorMessage={error} />;
    }
    setLoading(false);
  }, [t]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (e) => {
debugger
    const { name, value } = e.target;
    if(name === "communicationAddress"){
        if(value === "Y"){
            setIsCommunicationAddress(true)
        }
        else {
            setIsCommunicationAddress(false)
        }
      
    }
    else if(name === "ReasonCategory"){
        if(value !== "3"){
            formData.TypeOfUpload = ""
        }
    }
    if (name === "pincode") {
      if (/^\d{0,6}$/.test(value)) {
        setFormData({
          ...formData,
          [name]: value
        });
      }
      return
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };
 
  const handleAddressEdit = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (isEditable === false) {
      setIsEditable(true);
    } else {
      setIsEditable(false);
    }
  };
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const txnno = params.get('txnno');
try {
    if (txnno !== null && txnno !== undefined) {
     
      console.log('E-KYC completed successfully with txnno:', txnno);
      setTimeout(() => {
        toast.success("E-KYC completed successfully");
      }, 500);
      let ownerType = JSON.parse(sessionStorage.getItem('OWNERTYPE'));
      const callEditEYCDate = async () => {
        var ownerNumber = await EditOwnerDetailsFromEKYCData(txnno, ownerType);
        if (ownerNumber !== "") {
          console.log(ownerNumber)
        }
      }
      callEditEYCDate();
    }

    fetchData();
  }
  catch(error){
    console.log(error)
  }  
  }, [location.search,fetchData]);

  const handleReasonFileChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 5 * 1024 * 1024;
    if (file && file.size > maxSize) {
      toast.error(`${t('fileSizeExceeded')}`);
      e.target.value = null;
      setSelectedReasonFile(null);
      return;
    }
    const fileName = file.name;
    const fileExtension = fileName.split('.').pop().toLowerCase();
    if (!['pdf'].includes(fileExtension)) {
      toast.error(`${t("selectPdfFileOnly ")}`);
      e.target.value = null;
      setSelectedReasonFile(null);
      return
    }
    setfileExtension(fileExtension);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedReasonFile(file);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleNameFileChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 5 * 1024 * 1024;
    if (file && file.size > maxSize) {
      toast.error(`${t('fileSizeExceeded')}`);
      e.target.value = null;
      setSelectedNameFile(null);
      return;
    }
    const fileName = file.name;
    const fileExtension = fileName.split('.').pop().toLowerCase();
    if (!['pdf'].includes(fileExtension)) {
      toast.error(`${t("selectPdfFileOnly ")}`);
      e.target.value = null;
      setSelectedNameFile(null);
      return
    }
    setfileExtension(fileExtension);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedNameFile(file);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleFileNameDelete = () => {
    setSelectedNameFile(null);
    setfileExtension('');
  }
  const handleFileReasonDelete = () => {
    setSelectedReasonFile(null);
    setfileExtension('');
  }
 
  
  const handleBack = () => {
   
    
    sessionStorage.removeItem("SETPROPERTYCODE");
    sessionStorage.removeItem("SETPROPERYID");
    navigate("/PropertyList");
  }
  const EditOwnerDetailsFromEKYCData = async (txno, ownerType) => {
    
    ownerType = "NEWOWNER"
    try {
     const ekycResponse =  await axiosInstance.get("Name_Match/GET_BBD_NCL_OWNER_BYEKYCTRANSACTION?transactionNumber=" + txno + "&OwnerType=" + ownerType)
   
       
       if(ownerType === "OLDOWNER")
        {
       
      formData.IDENTIFIERNAME = ekycResponse.data.identifierNameEng;

        setEkycResponseData(ekycResponse.data);
        setFormData((prevState) => ({
          ...prevState,
          IDENTIFIERNAME: ekycResponse.data.identifierNameEng,
        }));
       }
       if(ownerType === "NEWOWNER"){
        setEkycResponseData(ekycResponse.data);
     
     formData.IDENTIFIERNAME = ekycResponse.data.identifierNameEng;
     setFormData((prevState) => ({
      ...prevState,
      IDENTIFIERNAME: ekycResponse.data.identifierNameEng,
    }));
       }
       return ""
    } catch (error) {
      console.log("EditOwnerDetailsFromEKYCData", error)
    }

  };
  const AddEKYCOwner = async () => {
    
    

    
    sessionStorage.setItem("OWNERTYPE", JSON.stringify("NEWOWNER"))
    var response = await axiosInstance.post("E-KYCAPI/INS_NCL_OBJECTION_MAIN?ULBCODE=" + 555 +  "&Propertycode=" + JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')) + "&PropertyEID="+JSON.parse(sessionStorage.getItem('SETPROPERYID')) )


    window.location.href = response.data;
  };
  
  const handleSave = async (Type) => {

    try {

      if (otpFieldsVisible) {
        toast.error(`${t("verifyOtp")}`)
        return
      }
      if (formData.IDENTIFIERTYPEID === null || formData.IDENTIFIERTYPEID === undefined || formData.IDENTIFIERTYPEID === 0) {
        toast.error(`${t("selectRelationshipType")}`)
        return
      }
      if (formData.IDENTIFIERTYPEID.length === 0) {
        toast.error(`${t("selectRelationshipType")}`)
        return
      }
      if (formData.IDENTIFIERNAME === null || formData.IDENTIFIERNAME === undefined) {
        toast.error(`${t("enterRelationName")}`)
        return
      }
      if (formData.IDENTIFIERNAME.length <= 0) {
        toast.error(`${t("enterRelationName")}`)
        return
      }
     
      if (formData.MOBILENUMBER === null || formData.MOBILENUMBER === undefined) {
        toast.error(`${t("enterValidMobileNumber")}`)
        return
      }
      if (formData.MOBILENUMBER.length <= 0 || formData.MOBILENUMBER.length < 10 || formData.MOBILENUMBER.length > 11) {
        toast.error(`${t("enterValidMobileNumber")}`)
        return
      }
    

      if(Type === "AFTEREKYC")
      {
      setEditableIndex(-1);
      const params = {
        P_BOOKS_PROP_APPNO: 1,
        propertyCode: formData.PROPERTYCODE,
        ownerNumber: formData.OWNERNUMBER,
        IDENTIFIERTYPE: formData.IDENTIFIERTYPEID || 0,
        IDENTIFIERNAME_EN: formData.IDENTIFIERNAME || "",
        MOBILENUMBER: formData.MOBILENUMBER || "0",
        MOBILEVERIFY: formData.MOBILEVERIFY !== "" ? formData.MOBILEVERIFY : "NOT VERIFIED",
        EMAIL:formData.EMAIL,
        PROPERTYID:JSON.parse(sessionStorage.getItem('SETPROPERYID')),
        loginId: 'crc'
      };
debugger
      const queryString = new URLSearchParams(params).toString();


      const response = await axiosInstance.get(`Name_Match/UPD_NCL_PROPERTY_OWNER_TEMP_MOBILEVERIFY?${queryString}`);
      console.log(response.data);
      toast.success(`${t("ownerEditedSuccess")}`)
      await fetchData();
    }
    else if(Type === "EKYC"){
      
      const params = {
        IDENTIFIERTYPE: formData.IDENTIFIERTYPEID || 0,
        IdentifierName:formData.IDENTIFIERNAME,
        NAMEMATCHSCORE:0,
        MOBILENUMBER: formData.MOBILENUMBER || "0",
        MOBILEVERIFY: formData.MOBILEVERIFY !== "" ? formData.MOBILEVERIFY : "NOT VERIFIED",
        loginId: 'crc',
        EMAIL:formData.EMAIL,
        PROPERTYID:JSON.parse(sessionStorage.getItem('SETPROPERYID')),
      };

      const queryString = new URLSearchParams(params).toString();

     
      const response = await axiosInstance.post(`ObjectionAPI/INS_NCL_PROPERTY_OBJECTOR_TEMP_WITH_EKYCDATA?${queryString}`,EkycResponseData);
      console.log(response.data);
      debugger
      sessionStorage.setItem('OBJECTIONID',response.data.Table[0].OBJECTIONID)
      toast.success(`${t("ownerEditedSuccess")}`)
      setEkycResponseData(null);
      await fetchData();
    }
    } catch (error) {
      toast.error(`${t("errorSavingData")}`, error)
    }

  };
  const getPropertyphoto = (selectedFile) => {
    return new Promise((resolve, reject) => {
      if (!selectedFile) {
        resolve(''); // Return an empty string if no file is selected
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        const propertyphoto = reader.result.split(',')[1];
        resolve(propertyphoto);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleValidation = async () =>{
    debugger
    let propertyDocumentName = "";
    let PropertyDocumentReason = ""
    try {
    if (selectedNameFile !== null) {
      propertyDocumentName = await getPropertyphoto(selectedNameFile);
    }
    if(propertyDocumentName.length === 0)
      {
        if(formData.NameDocument.length === 0){
      toast.error("Please Upload the Name Document");
      return false
        }
    }
    if(formData.ReasonCategory === 0 || formData.ReasonCategory.length === 0)
      {
      toast.error("Please Select the Reason ");
      return false
    }
    if(formData.ReasonCategory !== "3" && formData.ReasonCategory !== "5"){
      if(selectedReasonFile !== null) {
      PropertyDocumentReason = await getPropertyphoto(selectedReasonFile);
      }
      if(PropertyDocumentReason.length === 0)
        {
          if(formData.ReasonDocument.length === 0){
        toast.error("Please Upload the Reason Document")
        return false
          }
      }
      }
      if(formData.ReasonCategory === "5")
        {
        if(formData.ReasonDetails.length === 0){
          toast.error("Please enter the Reason Details")
          return false
        }
      }
      if(tablesdata8.length ===0){
        toast.error("Please Verify with Atleast one EKYC Owner")
        return false
      }
      if(formData.ReasonCategory === "3"){
        await fetchData("Kaveri")
      if(formData.TypeOfUpload.length === 0){
        toast.error("Please Select the Type of Registration Document")
        return false
      }
      else if(formData.TypeOfUpload === "RegistrationNumber") {
        
        if(KAVERI_DOC_DETAILS.length === 0){
          toast.error("Please Verify with the Registation No")
          return false
        }
      }
      else if(formData.TypeOfUpload === "OldRegistrationNumber"){
       
        if(KaveriDocumentold.length === 0){
        toast.error("Please Upload the Kaveri Document")
        
        return false
        }
      }
    }
      return true
    }
      catch(error){
toast.error(error)
console.log(error)
      }
    }


  
  const handleFinalSubmit = async (e) => {
    
    if (e.key === 'Enter') {
      e.preventDefault();
    }
       
    let propertyDocumentName = "";
    let PropertyDocumentReason = ""
    if (isEditable) { 
      debugger
      let IsValidation = await handleValidation() 
      
      if(IsValidation){ 
      setLoading(true);
      if(selectedReasonFile !== null) {
        PropertyDocumentReason = await getPropertyphoto(selectedReasonFile);
        }
        if (selectedNameFile !== null) {
          propertyDocumentName = await getPropertyphoto(selectedNameFile);
        }
        if(formData.ReasonCategory === "3"){
          if(formData.TypeOfUpload === ""){
           await fetchData()
          }
        }
      const data = {
        objectionid: JSON.parse(sessionStorage.getItem('OBJECTIONID')),
        propertycode: JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')),
        scanneddocumentobjection: propertyDocumentName,
        reasondocument: PropertyDocumentReason,
        iscommunicationaddress: formData.communicationAddress,
        reasonid: formData.ReasonCategory,
        reasondetails: formData.ReasonDetails ?? "",
        ulbcode: 555,
        namedocumentdetails: selectedNameFile !== null  ? selectedNameFile.name : "",
        reasondocumentdetails: selectedReasonFile !== null ? selectedReasonFile.name : "",
        documentextension: "pdf",
        doorno: formData.doorno,
        buildingname: formData.buildingname,
        arealocatlity: formData.areaorlocality,
        pincode: formData.pincode,
        createdby: "thushar",
        typeofdocument:formData.TypeOfUpload
      };
      debugger
      try {
        await axiosInstance.post('ObjectionAPI/INS_NCL_PROPERTY_OBJECTORS_FINAL_SUBMIT', data
        )
        setTimeout(() => {
        toast.success(`${t("detailsSavedSuccess")}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }, 100)
       // setIsEditable(false);
       fetchData();
        setLoading(false);
        // sessionStorage.setItem("userProgress", 4);
      } catch (error) {
        await toast.error(`${t("errorSavingData")}`, error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate('/ErrorPage', { state: { errorMessage: error.message, errorLocation: window.location.pathname } });
        }, 500);
      }
    } else {
      sessionStorage.setItem("userProgress", 4);
       
    
    }
    setLoading(false);
  }

  }
    

  

  



  function GradientCircularProgress() {
    return (
      <React.Fragment>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
      </React.Fragment>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <GradientCircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ backgroundColor: '#f0f0f0', padding: 4, borderRadius: 2, mt: 8 }}>
        <ToastContainer />
     
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            fontFamily: "sans-serif",
            marginBottom: 3,
            color: '#',
            fontSize: {
              xs: '1.5rem',
              sm: '2rem',
              md: '2.5rem',
            }
          }}
        >
          {t("DataAvailableInBBMPBooks")}
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="filled"
              label={t("propertyEID")}
              name="propertyEID"
              value={formData.propertyEID}
              onChange={handleChange}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Tooltip title={t("propertyEIDInfo")}>
                    <IconButton color="primary">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="filled"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Tooltip title={t("cityInfo")}>
                    <IconButton color="primary">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                )
              }}
              label={t("city")}
              name="ulbname"
              value={formData.ulbname}
              onChange={handleChange}

            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="filled"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Tooltip title={t("districtInfo")}>
                    <IconButton color="primary">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                )
              }}
              label={t("district")}
              name="district"
              value={formData.district}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="filled"
              label={t("wardNumber")}
              name="wardNumber"
              value={formData.wardNumber + " ," + formData.wardName}
              onChange={handleChange}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Tooltip title={t("wardNumberInfo")}>
                    <IconButton color="primary">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="filled"
              label={t("oldWardNo")}
              name="BBDOldWardNumber"
              value={formData.BBDOldWardNumber}
              onChange={handleChange}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Tooltip title={t("propertyNumberInfo")}>
                    <IconButton color="primary">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="filled"
              label={t("oldPropertyNo")}
              name="BBDOldPropertyNumber"
              value={formData.BBDOldPropertyNumber}
              onChange={handleChange}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Tooltip title={t("ownerNameInfo")}>
                    <IconButton color="primary">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="filled"
              label={t("SASBaseApplicationNo")}
              name="BBDSasApplicationNumber"
              value={formData.BBDSasApplicationNumber}
              onChange={handleChange}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Tooltip title={t("ownerNameInfo")}>
                    <IconButton color="primary">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="filled"
              label={t("PropertyAddress")}
              name="BBDAddress"
              value={formData.BBDAddress}
              onChange={handleChange}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Tooltip title={t("ownerNameInfo")}>
                    <IconButton color="primary">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth  variant="filled" >
              <InputLabel>
                {t('PropertyType')}
              </InputLabel>
              <Select
                name="BBDPropertyType"
                value={formData.BBDPropertyType}
                onChange={handleChange}
                inputProps={{ readOnly: true }}
              >
                <MenuItem value="0">Select</MenuItem>
                <MenuItem value="1">Vacant Site</MenuItem>
                <MenuItem value="2">Site with Building</MenuItem>
                <MenuItem value="3">Multistorey Flats</MenuItem>
              </Select>

            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="filled"
              label={t("Property Category(A/B)")}
              name="BBDPropertyCategory"
              value={formData.BBDPropertyCategory}
              onChange={handleChange}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Tooltip title={t("ownerNameInfo")}>
                    <IconButton color="primary">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="filled"
              label={t("streetName")}
              name="streetName"
              value={formData.streetName}
              onChange={handleChange}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Tooltip title={t("streetNameInfo")}>
                    <IconButton color="primary">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                )
              }}
            />
          </Grid>
             </Grid>

             

      <br></br>
     <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              fontFamily: "sans-serif",
              marginBottom: 3,
              color: '#',
              fontSize: {
                xs: '1.5rem',
                sm: '2rem',
                md: '2.5rem',
              }
            }}
          >
           Aadhar Authentication of the Objector 
          </Typography>
          
          <Grid item xs={12} sm={6}>

          <Box display="flex" alignItems="center">
                    <Typography variant="body1" sx={{ ml: 1 }}>
                     Aadhar Authentication <span style={{ color: 'red' }}> (If you do not want to give Aadhar ,you can file physical objection application to ARO office) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
                    </Typography>
                    {tablesdata8.length === 0 &&
                    <Button variant="contained" color="primary" onClick={() => AddEKYCOwner()}>
                        {t("VerifyE-KYC")}
                      </Button>
}
                  </Box>
               
</Grid>
<br></br>
<br></br>
<br></br>
        
      <Grid container spacing={3}>
      {EkycResponseData !== null &&
      <>
      <Grid item xs={12} sm={2}>
                    <div style={{ marginLeft: '20px', position: 'relative', textAlign: 'center' }}>
                      <img
                        src={`data:image/png;base64,${EkycResponseData.photoBytes}`}
                        alt="No Images Found"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '200px',
                          width: 'auto',
                          height: 'auto',
                          borderRadius: '8px',
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid container spacing={2}>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={t('OwnerName')}
                        name="OwnerName"
                        value={EkycResponseData.ownerNameEng || ''}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="filled"
                      />
                    </Grid>
                   
                    <Grid item xs={12} sm={6}>
                      </Grid>
                    <Grid item xs={12} sm={6}>
                     
                        <FormControl fullWidth sx={{ marginBottom: 3 }}>
                          <InputLabel>< LabelWithAsterisk text={t("RelationshipType")} /></InputLabel>
                          <Select
                            name="IDENTIFIERTYPEID"
                            value={formData.IDENTIFIERTYPEID}
                            onChange={handleChange}
                            sx={{backgroundColor: "#ffff" }}
                          >
                            <MenuItem value="">--Select--</MenuItem>
                            {tableIdentifier.map((item) => (
                              <MenuItem key={item.IDENTIFIERTYPEID} value={item.IDENTIFIERTYPEID}>
                                {item.IDENTIFIERTYPE_EN}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                     
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      
                        <TextField
                          fullWidth
                          label={< LabelWithAsterisk text={t("RelationName")} />}
                          name="IDENTIFIERNAME"
                          value={formData.IDENTIFIERNAME}
                          onChange={handleChange}
                          variant="outlined"
                          InputProps={{
                           
                            style: { backgroundColor:  "#ffff" },
                          }}
                        />
                      
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography sx={{ fontWeight: 'bold' }}>
                        {t("Gender")}
                      </Typography>
                      <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
                        <RadioGroup row name="Gender" value={EkycResponseData.gender} onChange={handleChange}>
                          <FormControlLabel value="M" control={<Radio disabled={true} />} label={t("Male")} />
                          <FormControlLabel value="F" control={<Radio disabled={true} />} label={t("Female")} />
                          <FormControlLabel value="O" control={<Radio disabled={true} />} label={t("Other")} />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={t('DateOfBirth')}
                        name="DateOfBirth"
                        value={EkycResponseData.dateOfBirth || ''}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="filled"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={t('Address')}
                        name="Address"
                        value={EkycResponseData.addressEng || ''}
                        multiline
                        rows={2}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="filled"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={t('OwnerMaskedAadhar')}
                        name="OwnerAadhar"
                        value={EkycResponseData.maskedAadhaar || ""}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="filled"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    
                          <TextField
                            fullWidth
                            label={< LabelWithAsterisk text={t("MobileNumber")} />}
                            name="MOBILENUMBER"
                            value={formData.MOBILENUMBER || ''}
                            onChange={handleChange}
                            variant="outlined"
                            InputProps={{
                           
                              style: { backgroundColor:  "#ffff" },
                            }}
                          />

                         
                              </Grid>
                  
                    <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label={t('Email')}
                          name="EMAIL"
                          value={formData.EMAIL}
                          onChange={handleChange}
                          InputProps={{
                           
                            style: { backgroundColor:  "#ffff" },
                          }}
                          variant="outlined"
                        />
                  </Grid>
                 
                  </Grid>
                  
                  <br></br>
                  <Grid item xs={12} sm={12}>
                    <Box display="flex" justifyContent="center" gap={2}>
                        <Button variant="contained" color="primary" onClick={() => handleSave("EKYC")}>
                          {t("Save")}
                        </Button>
                     
                    </Box>
                  </Grid>
               
              
                  </>
                  
      }
        </Grid>
        <Typography>Actual Objectors with E-Kyc Verifed</Typography>
<TableContainer component={Paper} sx={{ mt: 4 }}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>   {t("OwnerNo.")}</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>   {t("OwnerName")}</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>   {t("Father/Mother/Husband/SpouseName")}</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>   {t("Address")}</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>   {t("MobileNumber")}</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>   {t("OwnerPhoto")}</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>   EMAIL</TableCell>
        {/* <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>   {t("E-KYCStatus")}</TableCell> */}
        {/* <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>   {t("NAMEMATCHSTATUS")}</TableCell> */}
      </TableRow>
    </TableHead>
    <TableBody>
      {tablesdata8.length === 0 ? (
        <TableRow>
          <TableCell colSpan={12} align="center">
            {t("Nodataavailable")}
          </TableCell>
        </TableRow>
      ) : (
        tablesdata8.map((row,index) => {

          return (
            <TableRow key={index}>
              <TableCell>{row.OWNERNUMBER}</TableCell>
              <TableCell>{row.OBJECTIONNAME_EN}</TableCell>
              <TableCell>{row.IDENTIFIERNAME_EN}</TableCell>
              <TableCell>{row.OBJECTIONADDRESS_EN}</TableCell>
              <TableCell>{MaskingValue({value:row.MOBILENUMBER,maskingLength:4}) || 'N/A'}</TableCell>
              <TableCell> <img
                src={`data:image/png;base64,${row.OWNERPHOTO}`}
                alt="No Images Found"
                style={{
                  maxWidth: '100%',
                  maxHeight: '200px',
                  width: 'auto',
                  height: 'auto',
                  borderRadius: '8px',
                }}
              /></TableCell>
              <TableCell>{row.EMAIL}</TableCell>
              {/* <TableCell>{row.EKYCSTATUS}</TableCell> */}
            
            </TableRow>
          );
        })
      )}
    </TableBody>
  </Table>
</TableContainer>
<br></br>
          
<Grid item xs={12} sm={6}>
  <Box display="flex" alignItems="center" flexDirection="row" flexWrap="wrap">
    <Typography variant="body1" sx={{ ml: 1 }}>
      Upload detailed objection in writing with your signatures, name, mobile number, and address:
    </Typography>
    
    <Button
      component="label"
      variant="contained"
      disabled={false}
      startIcon={<CloudUploadIcon />}
      sx={{ ml: 2 }}
    >
      {t("Uploadfile")}
      <VisuallyHiddenInput type="file" accept=".pdf" onChange={handleNameFileChange} />
    </Button>

    {selectedNameFile && (
      <Box display="flex" alignItems="center" sx={{ ml: 2 }}>
        <Typography variant="body1">{selectedNameFile.name}</Typography>
        <Button color="error" onClick={handleFileNameDelete} sx={{ ml: 2 }}>
          {t("Delete")}
        </Button>
      </Box>
    )}

    <Typography variant="body1" sx={{ ml: 1, color: '#df1414' }}>
      {t("MaximumFileSizeMB")}
    </Typography>

    {formData.NameExtension && (
      <Box display="flex" alignItems="center" sx={{ ml: 2 }}>
        <Typography variant="body1" sx={{ mr: 1, color: '#df1414'  }}>Document Uploaded:</Typography>
        <Typography variant="body1" sx={{ mr: 2 }}>{formData.NameExtension}</Typography>
        <IconButton onClick={() => handleDownload(formData.NameDocument, formData.NameExtension)}>
          <GetAppIcon color="primary" />
        </IconButton>
      </Box>
    )}
  </Box>
</Grid>

<br></br>
<Grid item xs={12} sm={6}>

          <Box display="flex" alignItems="center">
                    <Typography variant="body1" sx={{ ml: 1 }}>
                      Is Communication Address is different than Aadhar Address :
                    </Typography>
                    <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
                <RadioGroup row name="communicationAddress" value={formData.communicationAddress} onChange={handleChange}>
                  <FormControlLabel value="Y" control={<Radio disabled={!isEditable} />} label={t("Yes")} />
                  <FormControlLabel value="N" control={<Radio disabled={!isEditable} />} label={t("No")} />
                </RadioGroup>
              </FormControl>

                  </Box>
</Grid>
{isCommunicationAddress &&
<Grid container spacing={2}>
 
<Grid item xs={4} sm={4}>
                  <TextField
                    fullWidth
                    label={<LabelWithAsterisk text={t('doorPlotNo')} />}
                    name="doorno"
                    value={formData.doorno}
                    onChange={handleChange}
                    variant={isEditable ? "outlined" : "filled"}
                    InputProps={{
                      readOnly: !isEditable,
                      style: { backgroundColor: !isEditable ? '' : "#ffff" },
                    
                    }}
                  />
                </Grid>
                <Grid item xs={4} sm={4}>
                  <TextField
                    fullWidth
                    label={t("buildingLandName")}
                    name="buildingname"
                    value={formData.buildingname}
                    onChange={handleChange}
                    variant={isEditable ? "outlined" : "filled"}
                    InputProps={{
                      readOnly: !isEditable,
                      style: { backgroundColor: !isEditable ? '' : "#ffff" },
                     
                    }}
                  />
                </Grid>

                <Grid item xs={4} sm={4}>
                  <TextField
                    fullWidth
                   label={<LabelWithAsterisk text={t('areaLocality')} />}
                    name="areaorlocality"
                    value={formData.areaorlocality}
                    onChange={handleChange}
                 //   onBlur={handleBlur}
                  
                    variant={isEditable ? "outlined" : "filled"}
                    InputProps={{
                      readOnly: !isEditable,
                      style: { backgroundColor: !isEditable ? '' : "#ffff" },
                     
                    }}
                  />
                </Grid>
                <Grid item xs={4} sm={4}>
                  <TextField
                    fullWidth
                    label={<LabelWithAsterisk text={t('pincode')} />}

                    name="pincode"
                    type="number"
                    value={formData.pincode}
                    onChange={handleChange}
                    variant={isEditable ? "outlined" : "filled"}
                    InputProps={{
                      readOnly: !isEditable,
                      style: { backgroundColor: !isEditable ? '' : "#ffff" },
                    
                    }}
                  />
                </Grid>
                
                </Grid>
}
              <br></br>
              <br></br>

              <Grid item xs={12} sm={6}>

                  <FormControl
                    fullWidth

                   // error={touched.streetid && !!errors.streetid}
                    sx={{ marginBottom: 3 }}
                 //   className={touched.streetid && !!errors.streetid ? 'shake' : ''}
                  >
                    <InputLabel>Reason /Basis for Objection <span style={{ color: 'red' }}> *</span>
                    </InputLabel>
                    <Select
                      name="ReasonCategory"
                      value={formData.ReasonCategory}
                      onChange={handleChange}
                      inputProps={{ readOnly: !isEditable }}
                    //  onBlur={handleBlur}
                      sx={{ backgroundColor: !isEditable ? '' : "#ffff" }}
                    >
                      <MenuItem value="">--Select--</MenuItem>
                      {/* {tableData.map((item) => (
                        <MenuItem key={item.STREETID} value={item.STREETID}>
                          {item.STREETNAME1}
                        </MenuItem>
                      ))} */}
                       <MenuItem value="1">It is Govt/BBMP land</MenuItem>
                       <MenuItem value="2">Court Order</MenuItem>
                       <MenuItem value="3">Latest Registration/Sale Deed in another person name</MenuItem>
                       <MenuItem value="4">Inheritance /Succession Dispute</MenuItem>
                       <MenuItem value="5">Others(specify)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {formData.ReasonCategory === "3"&&
                <Grid item xs={6} sm={3}>
          <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
            <RadioGroup row name="TypeOfUpload" value={formData.TypeOfUpload} onChange={handleChange}>
              <FormControlLabel value="RegistrationNumber" control={<Radio />} label={t("RegistrationNumber")} />
              <FormControlLabel value="OldRegistrationNumber" control={<Radio />} label={
                 <>
                {t("oldRegistrationNumber")}{" "}
                {/* <Typography component="span" style={{ color: 'red' }}>
        {t("CaseRefertoARO")}
      </Typography> */}
                </>
              }
                />
              {/* <FormControlLabel value="DoNotHaveRegistrationDeed" control={<Radio />} label={
    <>
      {t("DoNotHaveRegistrationDeed")}{" "}
      <Typography component="span" style={{ color: 'red' }}>
        {t("CaseRefertoARO")}
      </Typography>
    </>
  }
/> */}
            </RadioGroup>
          </FormControl>
          
        </Grid>
}
        {formData.TypeOfUpload === "RegistrationNumber" && formData.ReasonCategory === "3" && (
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={8}>
              <TextField
                fullWidth

                label={< LabelWithAsterisk text={t("RegistrationNumber")} />}
                placeholder='NMG-X-XXXX-XXXX-XX'
                name="RegistrationNumber"
                value={formData.RegistrationNumber}
                onChange={handleChange}
                InputProps={{
                  style: { backgroundColor: "#ffff" },
                  endAdornment: (
                    <Tooltip title={t("propertyEIDInfo")}>
                      <IconButton color="primary">
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                  )
                }}
              />
            </Grid>
            <Grid item xs={3}>
  <Box display="flex" justifyContent="space-between" alignItems="center">
    <Button
      variant="contained"
      color="success"
      onClick={handleKaveriDocumentData}
      style={{ height: '100%' }}
    >
      {t("KaveriDocumentData")}
    </Button>
  
  </Box>
</Grid>

           
          </Grid>
        )}
        {(formData.TypeOfUpload === "RegistrationNumber" && formData.ReasonCategory === "3" && KAVERI_DOC_DETAILS.length > 0 && KAVERI_PROP_DETAILS.length > 0 && KAVERI_PARTIES_DETAILS.length > 0) &&
          <TableContainer component={Paper} style={{ marginTop: 16 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={4}>
                    <Typography variant="h6" >{t("DocumentInformation")}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>{t("ApplicationNumber")}</strong></TableCell>
                  <TableCell><strong>{t("RegistrationDatetime")}</strong></TableCell>
                  <TableCell><strong>{t("NatureDeed")}</strong></TableCell>
                  <TableCell><strong>{t("FinalRegistrationNumber")}</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {KAVERI_DOC_DETAILS.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      {t("")}  No data available
                    </TableCell>
                  </TableRow>
                ) : (
                  KAVERI_DOC_DETAILS.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.APPLICATIONNUMBER || 'N/A'}</TableCell>
                      <TableCell>{row.REGISTRATIONDATETIME || 'N/A'}</TableCell>
                      <TableCell>{row.NATUREDEED || 'N/A'}</TableCell>
                      <TableCell>{row.REGISTRATIONNUMBER || 'N/A'}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            {/* Property Info Table */}
            <TableContainer component={Paper} style={{ marginTop: 16 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Typography variant="h6">{t("PropertyInformation")}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>{t("PropertyID")}</strong></TableCell>
                    <TableCell><strong>{t("DocumentID")}</strong></TableCell>
                    <TableCell><strong>{t("VillageName")}</strong></TableCell>
                    <TableCell><strong>{t("SRONAME")}</strong></TableCell>
                    <TableCell><strong>{t("HOBLI")}</strong></TableCell>
                    <TableCell><strong>{t("ZoneName")}</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {KAVERI_PROP_DETAILS.map((property, index) => (


                    <TableRow key={index}>
                      <TableCell>{property.PROPERTYID || 'N/A'}</TableCell>
                      <TableCell>{property.DOCUMENTID || 'N/A'}</TableCell>
                      <TableCell>{property.VILLAGENAME || 'N/A'}</TableCell>
                      <TableCell>{property.SRONAME || 'N/A'}</TableCell>
                      <TableCell>{property.HOBLINAME || 'N/A'}</TableCell>
                      <TableCell>{property.ZONENAME || 'N/A'}</TableCell>
                    </TableRow>
                  )
                  )}


                </TableBody>
              </Table>
            </TableContainer>


            {/* Party Info Table */}
            <TableContainer component={Paper} style={{ marginTop: 16 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={8}>
                      <Typography variant="h6">{t("PartyInformation")}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>

                    <TableCell><strong>{t("PartyName")}</strong></TableCell>

                    <TableCell><strong>{t("Address")}</strong></TableCell>
                    <TableCell><strong>{t("Id ProofType")}</strong></TableCell>
                    <TableCell><strong>{t("Id ProofNumber")}</strong></TableCell>
                    <TableCell><strong>{t("Party Type")}</strong></TableCell>
                    <TableCell><strong>{t("Admission Date")}</strong></TableCell>
                    {/* <TableCell><strong>{t("EKYC Owner Name")}</strong></TableCell>
                      <TableCell><strong>{t("Name Match Status")}</strong></TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {KAVERI_PARTIES_DETAILS.map((party, index) => (

                    <TableRow key={index}>

                      <TableCell>{party.PARTYNAME || 'N/A'}</TableCell>

                      <TableCell>{party.PARTYADDRESS || 'N/A'}</TableCell>
                      <TableCell>{party.IDPROOFTYPE || 'N/A'}</TableCell>
                      <TableCell>{MaskingValue({value:party.IDPROOFNUMBER,maskingLength:4}) || 'N/A'}</TableCell>
                      <TableCell>{party.PARTYTYPE || 'N/A'}</TableCell>
                      <TableCell>{party.ADMISSIONDATE || 'N/A'}</TableCell>
                      {/* <TableCell>{party.PARTYTYPE === "Claimant" ? party.EKYC_OWNERNAME : 'N/A'}</TableCell>
                            <TableCell>{party.PARTYTYPE === "Claimant" ? party.NAMEMATCH_SCORE > 60 ? "Matched" : "Not Matched" || 'N/A': 'N/A'}</TableCell> */}
                    </TableRow>
                  )
                  )}
                </TableBody>
              </Table>
            </TableContainer>

          </TableContainer>

        }

        {formData.TypeOfUpload === "OldRegistrationNumber" && formData.ReasonCategory === "3" &&

          <ObjectionDocumentUploadPage />
        }
        {((formData.ReasonCategory === "1") || (formData.ReasonCategory === "2") || (formData.ReasonCategory === "4")) &&
              <Grid item xs={12} sm={6}>

<Box display="flex" alignItems="center">
          <Typography variant="body1" sx={{ ml: 1 }}>
            Upload File :
          </Typography>
          <Button
            component="label"
            variant="contained"
            disabled={false}
            startIcon={<CloudUploadIcon />}
            sx={{ ml: 2 }}
            
          >
            {t("Uploadfile")}
            <VisuallyHiddenInput type="file" accept=".pdf" onChange={handleReasonFileChange} />
          </Button>
          {selectedReasonFile && (
                    <Box display="flex" alignItems="center" mt={2}>
                      <Typography variant="body1">{selectedReasonFile.name}</Typography>
                      <Button color="error" onClick={handleFileReasonDelete} sx={{ ml: 2 }}>
                        {t("Delete")}
                      </Button>
                    </Box>
                  )}
                  <Typography variant="body1" sx={{ ml: 1, color: '#df1414' }}>
                    {t("MaximumFileSizeMB")}
                  </Typography>
                  {formData.ReasonExtension ?
                  <>                  <Typography>Document Uploaded :</Typography>
                  <Typography>{formData.ReasonExtension}</Typography>
                 
                              <IconButton onClick={() => handleDownload(formData.ReasonDocument, formData.ReasonExtension)}>
                                <GetAppIcon color='primary' />
                              </IconButton>
                              </>
                              :
                              ""
                              
                            }
        </Box>
</Grid>
}
<br></br>
{formData.ReasonCategory === "5"&&
<Grid item xs={12} sm={6}>

          <Box display="flex" alignItems="center">
                    <Typography variant="body1" sx={{ ml: 1 }}>
                      Please State the Reason :
                    </Typography>
                    <TextField
                    fullWidth
                    multiline 
                    label={<LabelWithAsterisk text={"Reason"} />}
                    name="ReasonDetails"
                    value={formData.ReasonDetails}
                    onChange={handleChange}
                    variant={isEditable ? "outlined" : "filled"}
                    InputProps={{
                      readOnly: !isEditable,
                      style: { backgroundColor: !isEditable ? '' : "#ffff" },
                      
                    }}
                  />

                  </Box>
</Grid>
}
<br></br>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" gap={2}>
                  <Button variant="contained" color="primary" onClick={handleBack}>
                    {t("Previous")}
                  </Button>
                  {/* <Button variant="contained" color="primary" onClick={handleAddressEdit}>
                      {t("Edit")}
                    </Button> */}
                  <Button variant="contained" color="success" onClick={handleFinalSubmit} >
                  Submit
                  </Button>
                </Box>
              </Grid>
      </Box>
    </Container>
  );
};


export default ObjectorsPage;
