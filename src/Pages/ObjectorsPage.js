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
    IsCommuncationAddress:"Y",
    TypeOfUpload:"",
    MOBILENUMBER:"",
    communicationAddress:"N"
  });
  const { t } = useTranslation();
 

  const navigate = useNavigate();

 
 
  const [loading, setLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [tabledata5EkycVerifed, setTablesDataEKYCVerified] = useState([]);
  const [tablesdata8, setTableData8] = useState([]);
  const [KAVERI_DOC_DETAILS, setKAVERI_DOC_DETAILS] = useState([]);
  const [KAVERI_PROP_DETAILS, setKAVERI_PROP_DETAILS] = useState([]);
  const [KAVERI_PARTIES_DETAILS, setKAVERI_PARTIES_DETAILS] = useState([]);
  const [tabledata5EkycNotVerifed, setTablesDataEkycNotVerifed] = useState([]);
  const location = useLocation();
  const [editableIndex, setEditableIndex] = useState(-1);
  const [otpFieldsVisible, setOtpFieldsVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileExtension, setfileExtension] = useState([]);
  const [EkycResponseData,setEkycResponseData] = useState(null);
  
  const [otpNumber, setOtpNumber] = useState(0)
  const [otpButtonDisabled, setOtpButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(30); 
  const [countdownInterval, setCountdownInterval] = useState(null);
  const [isCommunicationAddress,setIsCommunicationAddress] = useState(false)
  
 
  React.useEffect(() => {
    return () => {
      clearInterval(countdownInterval);
    };
  }, [countdownInterval]);
  const handleGenerateOtp = async (index) => {
    try {
      const response = await axiosInstance.get("E-KYCAPI/SendOTP?OwnerMobileNo=" + formData.MOBILENUMBER);
      toast.success(response.data.otpResponseMessage);
     
      setOtpNumber(response.data.otp);
      formData.MOBILEVERIFY = "NOT VERIFIED";
      setOtpButtonDisabled(true);
      setTimer(30);
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);


      setTimeout(() => {
        setOtpButtonDisabled(false);
        clearInterval(interval);
      }, 30000);


      setCountdownInterval(interval);
    } catch (error) {
      console.log("failed to send otp" + error)
    }

  };
  const handleKaveriDocumentData = async () => {

    if (formData.RegistrationNumber.length === 0) {
      toast.error(`${t("Please Enter the Registration Number")}`);
      return
    }


    try {
      setLoading(true)

      let response = await axiosInstance.post(`KaveriAPI/GetKaveriDocData?RegistrationNoNumber=${formData.RegistrationNumber}&BOOKS_APP_NO=${JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))}&PropertyCode=${JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))}&LoginId=crc`)
      await axiosInstance.post(`BBMPCITZAPI/UPD_COL_NCL_PROPERTY_COMPARE_MATRIX_TEMP?BOOKS_PROP_APPNO=${JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))}&propertyCode=${JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))}&COLUMN_NAME=KAVERIDOC_AVAILABLE&COLUMN_VALUE=1&loginID=23`);



      const result = response.data;

      if (result.success) {


        await fetchData("KAVERI_DOC_DATA")
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
  const handleVerifyOtp = () => {
    if (formData.OwnerOTP === otpNumber.toString()) {
      toast.success(`${t("otpVerifiedSuccess")}`);
      formData.MOBILEVERIFY = "Verified";
      setOtpFieldsVisible(false);
    } else {
      toast.error(`${t("Invalid OTP Entered")}`);
    }
  };
 
 
  const fetchData = React.useCallback(async () => {
    setLoading(true);
    
    let response2 = null;
    let book = JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))
    try {
      const response = await axiosInstance.get(`BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_BBD_DRAFT_React?ULBCODE=555&P_BOOKS_PROP_APPNO=${JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))}&Propertycode=${JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))}&Page=ADDRESS`);
      if(book !== null){
       response2 = await axiosInstance.get(`BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP_React?ULBCODE=555&P_BOOKS_PROP_APPNO=${JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))}&Propertycode=${JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))}&Page=TAX_DETAILS`);
      }
      else {
        response2 = null
      }
     

      const { Table1 = [], Table5 = [], } = response.data;
      let NCLtable1Item = [];
     
      
      if (response2) {
        const {  Table1: NCLTABLE1 = [] } = response2.data;
        NCLtable1Item = NCLTABLE1.length > 0 ? NCLTABLE1[0] : [];
       
       
       
       

      } else {
        setIsEditable(true)
      }
      
      const table1Item = Table1.length > 0 ? Table1[0] : [];

      const table5Item = Table5.length > 0 ? Table5[0] : [];

      
     
   

      setFormData({
        propertyType: NCLtable1Item.PROPERTYCATEGORYID || "0",
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
        verifySASNUM: NCLtable1Item.PUID !== null ? NCLtable1Item.PUID || "" : "",
      });

   
      
     
    
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
  }, [location.search,fetchData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 5 * 1024 * 1024;
    if (file && file.size > maxSize) {
      toast.error(`${t('fileSizeExceeded')}`);
      e.target.value = null;
      setSelectedFile(null);
      return;
    }
    const fileName = file.name;
    const fileExtension = fileName.split('.').pop().toLowerCase();
    if (!['pdf'].includes(fileExtension)) {
      toast.error(`${t("selectPdfFileOnly ")}`);
      e.target.value = null;
      setSelectedFile(null);
      return
    }
    setfileExtension(fileExtension);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(file);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleFileDelete = () => {
    setSelectedFile(null);
    setfileExtension('');
  }
  const handleFileDocumentDelete = () => {
    setSelectedFile(null);
    setfileExtension('');
  }
 
  
  const handleBack = () => {
   
    
    sessionStorage.removeItem("SETPROPERTYCODE");
    sessionStorage.removeItem("SETPROPERYID");
    navigate("/BBDDraft");
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
    debugger
    var ownerNumber = 1;

    if (tabledata5EkycVerifed.length > 0) {
      const maxOwnerNumber = Math.max(...tabledata5EkycVerifed.map(item => item.OWNERNUMBER));
      ownerNumber = maxOwnerNumber + 1;
    }
    sessionStorage.setItem("OWNERTYPE", JSON.stringify("NEWOWNER"))
    var response = await axiosInstance.post("E-KYCAPI/RequestEKYC?OwnerNumber=" + ownerNumber + "&BOOK_APP_NO=" + 1+ "&PROPERTY_CODE=" + JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')))


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
      let s = tabledata5EkycNotVerifed.some(x =>x.MOBILEVERIFY === "Verified");
      if(!s){
      if (formData.MOBILENUMBER === null || formData.MOBILENUMBER === undefined) {
        toast.error(`${t("enterValidMobileNumber")}`)
        return
      }
      if (formData.MOBILENUMBER.length <= 0 && formData.MOBILENUMBER.length < 10) {
        toast.error(`${t("enterValidMobileNumber")}`)
        return
      }
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
        loginId: 'crc'
      };

      const queryString = new URLSearchParams(params).toString();


      const response = await axiosInstance.get(`Name_Match/UPD_NCL_PROPERTY_OWNER_TEMP_MOBILEVERIFY?${queryString}`);
      console.log(response.data);
      toast.success(`${t("ownerEditedSuccess")}`)
      await fetchData();
    }
    else if(Type === "EKYC"){
      debugger
      const params = {
        IDENTIFIERTYPE: formData.IDENTIFIERTYPEID || 0,
        IdentifierName:formData.IDENTIFIERNAME,
        NAMEMATCHSCORE:0,
        MOBILENUMBER: formData.MOBILENUMBER || "0",
        MOBILEVERIFY: formData.MOBILEVERIFY !== "" ? formData.MOBILEVERIFY : "NOT VERIFIED",
        loginId: 'crc'
      };

      const queryString = new URLSearchParams(params).toString();

     
      const response = await axiosInstance.post(`Name_Match/INS_NCL_PROPERTY_OWNER_TEMP_WITH_EKYCDATA?${queryString}`,EkycResponseData);
      console.log(response.data);
      toast.success(`${t("ownerEditedSuccess")}`)
      setEkycResponseData(null);
      await fetchData();
    }
    } catch (error) {
      toast.error(`${t("errorSavingData")}`, error)
    }

  };
  const handleSubmit = async (e) => {
    
    if (e.key === 'Enter') {
      e.preventDefault();
    }
    if (isEditable) {  //change sp
      setLoading(true);
      const data = {
       propertyCode: formData.propertyNumber,
        categoryId: formData.propertyType,
        loginId: "crc",
      };
      try {
        await axiosInstance.post('BBMPCITZAPI/INS_UPD_NCL_PROPERTY_CATEGORY_SASDATA_TEMP', data
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
        setIsEditable(false);
        setLoading(false);
        sessionStorage.setItem("userProgress", 4);
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
    <Container maxWidth="lg">
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
                    <Button variant="contained" color="primary" onClick={() => AddEKYCOwner()}>
                        {t("VerifyE-KYC")}
                      </Button>
                  </Box>

</Grid>
<br></br>
<br></br>
<br></br>
        
      <Grid container spacing={3}>
      {EkycResponseData !== null &&
      <>
      <Grid item xs={12} sm={2}>
                    <div style={{ marginLeft: '10px', position: 'relative', textAlign: 'center' }}>
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
                          >
                            <MenuItem value="">--Select--</MenuItem>
                            {tablesdata8.map((item) => (
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
                          variant="standard"
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
                            variant="standard"
                          />

                          {otpFieldsVisible && (
                            <Grid>
                              <br></br>
                              {!otpButtonDisabled && (
                                <>
                                  <Button variant="contained" color="primary" onClick={() => handleGenerateOtp()}>
                                    {t("GenerateOTP")}
                                  </Button>
                                </>
                              )}
                              {otpButtonDisabled && (
                                <Typography >
                                  Resend OTP in {timer} seconds
                                </Typography>

                              )}
                              <TextField
                                fullWidth
                                label={t('Enter OTP')}
                                name="OwnerOTP"
                                value={formData.OwnerOTP}
                                onChange={handleChange}
                                variant="standard"
                              />

                              <Button variant="contained" color="primary" onClick={() => handleVerifyOtp()}>
                                Verify OTP
                              </Button>
                              <br></br>
                            </Grid>
                          )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label={t('MobileVerification')}
                          name="MOBILEVERIFY"
                          value={formData.MOBILEVERIFY === null ? "NOT VERIFIED" : formData.MOBILEVERIFY}
                          onChange={handleChange}
                          InputProps={{
                            readOnly: true,
                          }}
                          variant="filled"
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
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>   {t("MobileVerification")}</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>   {t("E-KYCStatus")}</TableCell>
        {/* <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>   {t("NAMEMATCHSTATUS")}</TableCell> */}
      </TableRow>
    </TableHead>
    <TableBody>
      {tabledata5EkycVerifed.length === 0 ? (
        <TableRow>
          <TableCell colSpan={12} align="center">
            {t("Nodataavailable")}
          </TableCell>
        </TableRow>
      ) : (
        tabledata5EkycVerifed.map((row,index) => {

          return (
            <TableRow key={index}>
              <TableCell>{row.OWNERNUMBER}</TableCell>
              <TableCell>{row.OWNERNAME}</TableCell>
              <TableCell>{row.IDENTIFIERNAME}</TableCell>
              <TableCell>{row.OWNERADDRESS}</TableCell>
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
              <TableCell>{row.MOBILEVERIFY}</TableCell>
              <TableCell>{row.EKYCSTATUS}</TableCell>
            
            </TableRow>
          );
        })
      )}
    </TableBody>
  </Table>
</TableContainer>
<br></br>
          
          <Grid item xs={12} sm={6}>

          <Box display="flex" alignItems="center">
                    <Typography variant="body1" sx={{ ml: 1 }}>
                      Upload detailed objection in writing with your signatures,name,mobile Number and address : 
                    </Typography>
                    <Button
                      component="label"
                      variant="contained"
                      disabled={false}
                      startIcon={<CloudUploadIcon />}
                      sx={{ ml: 2 }}
                      
                    >
                      {t("Uploadfile")}
                      <VisuallyHiddenInput type="file" accept=".pdf" onChange={handleFileChange} />
                    </Button>
                    {selectedFile && (
                    <Box display="flex" alignItems="center" mt={2}>
                      <Typography variant="body1">{selectedFile.name}</Typography>
                      <Button color="error" onClick={handleFileDelete} sx={{ ml: 2 }}>
                        {t("Delete")}
                      </Button>
                    </Box>
                  )}
                  <Typography variant="body1" sx={{ ml: 1, color: '#df1414' }}>
                    {t("MaximumFileSizeMB")}
                  </Typography>
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
                    name="DoorPlotNo"
                    value={formData.DoorPlotNo}
                    onChange={handleChange}
                    variant={isEditable ? "outlined" : "filled"}
                  //  onBlur={handleBlur}
                  //  className={touched.DoorPlotNo && !!errors.DoorPlotNo ? 'shake' : ''}
                 //   error={touched.DoorPlotNo && !!errors.DoorPlotNo}
                //    helperText={touched.DoorPlotNo && errors.DoorPlotNo}
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
                    value={formData.NearestLandmark}
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
                  //  onBlur={handleBlur}
                   // className={touched.pincode && !!errors.pincode ? 'shake' : ''}
                 //   error={touched.pincode && !!errors.pincode}
                 //   helperText={touched.pincode && errors.pincode}
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
        {formData.TypeOfUpload === "RegistrationNumber" && (
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
        {(formData.TypeOfUpload === "RegistrationNumber" && KAVERI_DOC_DETAILS.length > 0 && KAVERI_PROP_DETAILS.length > 0 && KAVERI_PARTIES_DETAILS.length > 0) &&
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

        {formData.TypeOfUpload === "OldRegistrationNumber" &&

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
            <VisuallyHiddenInput type="file" accept=".pdf" onChange={handleFileChange} />
          </Button>
          {selectedFile && (
                    <Box display="flex" alignItems="center" mt={2}>
                      <Typography variant="body1">{selectedFile.name}</Typography>
                      <Button color="error" onClick={handleFileDelete} sx={{ ml: 2 }}>
                        {t("Delete")}
                      </Button>
                    </Box>
                  )}
                  <Typography variant="body1" sx={{ ml: 1, color: '#df1414' }}>
                    {t("MaximumFileSizeMB")}
                  </Typography>
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
                  <Button variant="contained" color="primary" onClick={handleAddressEdit}>
                      {t("Edit")}
                    </Button>
                  <Button variant="contained" color="success" onClick={handleSubmit} >
                  Finish
                  </Button>
                </Box>
              </Grid>
      </Box>
    </Container>
  );
};


export default ObjectorsPage;
