import React, { useState } from 'react';
import {
  Button, Box, Container, Typography, Grid, TextField, Radio, RadioGroup, FormControlLabel, FormControl,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select, InputLabel, CircularProgress,IconButton 
} from '@mui/material';
//import InfoIcon from '@mui/icons-material/Info';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../components/Axios';
import { toast, ToastContainer } from 'react-toastify';
import LabelWithAsterisk from '../components/LabelWithAsterisk'
import MaskingValue from '../components/MaskingValue';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import GetAppIcon from '@mui/icons-material/GetApp';
import AmalgamationDocumentUploadPage from './AmalgamationDocumentUploadPage';
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
const Amalgamation = () => {
  const [formData, setFormData] = useState({
    AmalgamationOrderNo: "",
    AmalgamationOrderDate: "",
    CHECKBANDI_EAST: "",
    CHECKBANDI_NORTH : "",
    CHECKBANDI_SOUTH: "",
    CHECKBANDI_WEST: "",
    cornerSite: "N",
    UGD:"N",
    ulbCode: "",
    ASSESMENTNUMBER:"",
    Oddsite:"",
    SiteArea:"",
    SurveyNo:"",
    PropertyPhoto:"",
    loginId:"",
    MOBILEVERIFY: "",

  });
  const [tableData, setTableData] = useState([
  ]);
  const navigate = useNavigate();
   const [selectedIDFile, setSelectedIDFile] = useState(null);
  const location = useLocation();
  const [isEditable,setIsEditable] = useState(true);
  const [searchFields, setSearchFields] = useState([{ id: 1, value: "" }]);
  const [tablesdata8, setTableData8] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editableIndex, setEditableIndex] = useState(-1);
  const [otpFieldsVisible, setOtpFieldsVisible] = useState(false);
  const [alertShown, setAlertShown] = useState(false);
  const [EkycResponseData,setEkycResponseData] = useState(null)
  const [otpNumber, setOtpNumber] = useState(0)
  const { t } = useTranslation();
  const [otpButtonDisabled, setOtpButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(30); 
  const [countdownInterval, setCountdownInterval] = useState(null);
   const handleAddField = () => {
    setSearchFields([...searchFields, { id: searchFields.length + 1, value: "" }]);
  };
  const handleDownload = (base64Data, documentdescription) => {
    try {
    const filename = `${documentdescription}`;

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
  const handleIDFileChange = (e) => {
      debugger
      const file = e.target.files[0];
      const maxSize = 200 * 1024;
      if (file && file.size > maxSize) {
        toast.error(`${t("File size exceeds 200 KB limit")}`);
        e.target.value = null;
        setSelectedIDFile(null);
        return;
      }
      if(file === undefined){
        return
      }
      const fileName = file.name;
      const fileExtension = fileName.split('.').pop().toLowerCase();
      if (!['jpg', 'jpeg',].includes(fileExtension)) {
        toast.error(`${t("Please Select Only '.jpg','.jpeg' File")}`);
        e.target.value = null;
        setSelectedIDFile(null);
        return
      }
   //   setfileExtension(fileExtension);
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedIDFile(file);
        };
        reader.readAsDataURL(file);
      }
    };
    const handleIDFileDelete = () => {
      setSelectedIDFile(null);
    //  setfileExtension('');
    }
  const handleSearch = async () => {
    
    if (searchFields.some(field => field.value.trim() === "")) {
      toast.error("All search fields must be filled.");
      return;
    }
  
    
    if (searchFields.length < 2) {
      toast.error("Please add at least two search fields.");
      return;
    }
  debugger
    const searchValues = searchFields.map(field => field.value);
    const response = await axiosInstance.post("AmalgamationAPI/GetAmalgamationProperty" , searchValues);
    
    setTableData(response.data.Table || []);
  };
  

  const handleReset = () => {
    setSearchFields([{ id: 1, value: "" }]);
    setTableData([])
  };
  const handleSearchFieldChange = (index, e) => {
    const updatedFields = [...searchFields];
    updatedFields[index].value = e.target.value;
    setSearchFields(updatedFields);
  }

  const handleChange = (e) => {
debugger
    const { name, value } = e.target;
   
    if (name === "MOBILENUMBER") {
      if (formData.MOBILENUMBER === value || value.trim() === "") {
        setOtpFieldsVisible(false);
        setAlertShown(false);
      } else {
       debugger
       let noOfMobile = tablesdata8.filter(row => row.MOBILENUMBER === value);
        if(noOfMobile.length === 0){
        setOtpFieldsVisible(true);
        if (!alertShown) {
          alert(`${t("MobileValidation")}`);
          setAlertShown(true);
        }
      }
      else {
       formData.MOBILEVERIFY = "Verified";
       setOtpFieldsVisible(false);
      }
      }
      if (name === "MOBILENUMBER") {
        if (/^\d{0,10}$/.test(value)) {
          setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
          }));
        }
        return
      }
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
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

  const handleVerifyOtp = () => {
    if (formData.OwnerOTP === otpNumber.toString()) {
      toast.success(`${t("otpVerifiedSuccess")}`);
      formData.MOBILEVERIFY = "Verified";
      setOtpFieldsVisible(false);
    } else {
      toast.error(`${t("Invalid OTP Entered")}`);
    }
  };
 
  const handleSave = async (Type) => {

    try {

      if (otpFieldsVisible) {
        toast.error(`${t("verifyOtp")}`)
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
    if(tableData.length === 0){
      toast.error(`${t("Search Property First")}`)
      return

    }
    if(tableData.length < 2){
        toast.error(`${t("Minimum 2 Properties Required")}`)
        return
    }
    if(tableData.length !== searchFields.length){
        toast.error(`${t("The Number of Properties Searched and Added are not same")}`) 
        return
    }
    if(EkycResponseData === null){
        toast.error(`${t("EKYC Data is EMPTY")}`)
        return
        }
    
debugger
    const ekycVaultRef = EkycResponseData.vaultRefNumber;
    const propertyIds = [...new Set(tableData.map(row => row.PROPERTYID))];

    for (const propertyId of propertyIds) {
        const propertyVaultRefs = tableData
            .filter(row => row.PROPERTYID === propertyId)
            .map(row => row.VAULTREFNUMBER);

        if (!propertyVaultRefs.includes(ekycVaultRef)) {
            toast.error(`${t("Aadhar does not match for property ID")} ${propertyId}`);
            return;
        }
    }

       if(Type === "EKYC"){
      
      const params = {
      
      
        MOBILENUMBER: formData.MOBILENUMBER || "0",
        MOBILEVERIFY: formData.MOBILEVERIFY !== "" ? formData.MOBILEVERIFY : "NOT VERIFIED",
        loginId: JSON.parse(sessionStorage.getItem('SETLOGINID')),
        EMAIL:formData.EMAIL || "No Email Provided",
      };

      const queryString = new URLSearchParams(params).toString();

     
      const response = await axiosInstance.post(`SearchAPI/INS_NCL_PROPERTY_SEARCH_TEMP_WITH_EKYCDATA?${queryString}`,EkycResponseData);
      console.log(response.data);
      
    debugger
      toast.success(`${t("owner Added Successfully")}`)
      debugger
      setEkycResponseData(null);
      setTableData8(response.data.Table || [])
      sessionStorage.setItem('SETMUTATIONID',response.data.Table[0].P_MUTAPPLID)
    }
    } catch (error) {
      toast.error(`${t("errorSavingData")}`, error)
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
     
      const callEditEYCDate = async () => {
        var ownerNumber = await EditOwnerDetailsFromEKYCData(txnno);
        if (ownerNumber !== "") {
          console.log(ownerNumber)
        }
      }
      callEditEYCDate();
    }

   // fetchData();
  }, [location.search]);
  const handleSubmit = (e) => {
    if(tableData.length === 0 ){
      toast.error(`${t("Search Property First")}`)
      return
    }
    if(tableData.length < 2){
        toast.error(`${t("Minimum 2 Properties Required")}`)
        return
    }
    if(tablesdata8.length === 0){
        toast.error(`${t("Verify E-KYC First")}`)
        return
    }
    
    // Submit form data logic here
  };
 
  const EditOwnerDetailsFromEKYCData = async (txno) => {
    
    let ownerType = "NEWOWNER"
    try {
     const ekycResponse =  await axiosInstance.get("Name_Match/GET_BBD_NCL_OWNER_BYEKYCTRANSACTION?transactionNumber=" + txno + "&OwnerType=" + ownerType)
   
       
      
        setEkycResponseData(ekycResponse.data);
   
    
       return ""
    } catch (error) {
      console.log("EditOwnerDetailsFromEKYCData", error)
    }

  };
  const back = () => {
   
     window.location.href = 'https://bbmpeaasthi.karnataka.gov.in';
    
  };
  const AddEKYCOwner = async () => {
    try {
        if(tableData.length === 0){
            toast.error(`${t("Search Property First")}`)
            return
      
          }
        var response = await axiosInstance.post("E-KYCAPI/INS_NCL_SEARCH_MAIN")
    
    
        window.location.href = response.data; 
    }
        catch(error)
        {
          console.log(error)
        }
      };
  
 
  const handleBack = () => {
    window.location.href = "https://bbmpeaasthi.karnataka.gov.in";
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
      <ToastContainer />
      <Box sx={{ backgroundColor: '#f0f0f0', padding: 1, borderRadius: 2, mt: 2 }}>
        <form onSubmit={handleSubmit}>
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
           Amalgamation
          </Typography>
 <Grid container spacing={2} alignItems={"center"} justifyContent="center">
         
         
 {searchFields.map((field, index) => (
        <Grid item xs={12} sm={3} key={field.id}>
          <TextField
            label="Property EPID"
            value={field.value}
            onChange={(e) => handleSearchFieldChange(index, e)}
            fullWidth
            sx={{ marginBottom: 2, backgroundColor: "#fff" }}
          />
        </Grid>
      ))}

      <Grid item>
        <IconButton color="primary" onClick={handleAddField}>
        <Button variant="contained" color="success">
              Add PropertyId +
            </Button>
        </IconButton>
      </Grid>
          
          <Box display="flex" justifyContent="center" gap={2} mt={0.5} width="100%">
          <Button variant="contained" color="primary" onClick={handleBack}>
              {("Previous")}
            </Button>
            <Button variant="contained" color="success" onClick={handleSearch}>
              {("Search")}
            </Button>
            <Button variant="contained" color="primary" onClick={handleReset}>
              {("Reset")}
            </Button>
          
          </Box>
        </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Existing Owners As Per E-Khata
            </Typography>
            {tablesdata8.length === 0 && (
            <Button variant="contained" color="warning" onClick={AddEKYCOwner}>
            {t("VerifyE-KYC")}
            </Button>
        )}
          </Box>
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>

                 
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("Property Id")}</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("Owner Name")}</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("Owner Address")}</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("Property Type")}</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("ASSESMENT NUMBER")}</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("Mobile Number")}</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("CheckBandhi North")}</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("CheckBandhi South")}</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("CheckBandhi East")}</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("CheckBandhi West")}</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={12} align="center">
                      {t("Nodataavailable")}
                    </TableCell>
                  </TableRow>
                ) : (
                  tableData.map((row,index) => (
                    <TableRow key={index}>
                            <TableCell>{row.PROPERTYID}</TableCell>
                            <TableCell>{row.OWNERNAME}</TableCell>
                            <TableCell>{row.OWNERADDRESS}</TableCell>
                            <TableCell>{row.PROPERTYCATEGORYID}</TableCell>
                            <TableCell>{row.ASSESMENTNUMBER}</TableCell>
                            <TableCell>{MaskingValue({value:row.MOBILENUMBER,maskingLength:4})}</TableCell>
                            <TableCell>{row.CHECKBANDI_NORTH}</TableCell>
                            <TableCell>{row.CHECKBANDI_SOUTH}</TableCell>
                            <TableCell>{row.CHECKBANDI_EAST}</TableCell>
                            <TableCell>{row.CHECKBANDI_WEST}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <br></br>
          <Grid container >
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
                              <br></br>
                              <br></br>
                              
                              <TextField
                                fullWidth
                                label={t('Enter OTP')}
                                name="OwnerOTP"
                                value={formData.OwnerOTP}
                                onChange={handleChange}
                                variant="filled"
                                InputProps={{
                           
                                  style: { backgroundColor:  "#ffff" },
                                }}
                              />
<br></br><br></br>
                              <Button variant="contained" color="primary" onClick={() => handleVerifyOtp()}>
                                Verify OTP
                              </Button>
                              <br></br>
                            </Grid>
                          )}
                         
                              </Grid>
                  
                    <Grid item xs={12} sm={6}>
                    
                        <Typography sx={{
            fontWeight: 'bold',
            fontFamily: "sans-serif",
            marginTop: 2,
            color: '#',
            fontSize: {
              xs: '1rem',
              sm: '1rem',
              md: '1.2rem',
            }
          }}>{t('MobileVerification')} : {formData.MOBILEVERIFY}</Typography>
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
                  <br></br>
                  <br></br>
                  <Grid item xs={15} sm={12}>
                    <Box display="flex" justifyContent="center" gap={10}>
                        <Button variant="contained" color="primary" onClick={() => handleSave("EKYC")}>
                          {t("Save")}
                        </Button>
                     
                    </Box>
                  </Grid>
               
              
                  </>
                  
      }

        </Grid>



          <br></br>
          <Typography>{t("Actual Owners Applying For Amalgamation")}</Typography>

          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>

                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>   {t("OwnerNo.")}</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>   {t("OwnerName")}</TableCell>
                  
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>   {t("Address")}</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>   {t("MobileNumber")}</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>   {t("OwnerPhoto")}</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>   {t("MobileVerification")}</TableCell>
                 
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
                        <TableCell>{row.OWNERNAME}</TableCell>
                  
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
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container spacing={2} >
  {/* Door No */}
  <Grid container item xs={12} sm={12} alignItems="center" justifyContent="center" gap={1}>
    <Grid item xs={12} sm={3.2} style={{ textAlign: "left" }} >
      <span style={{ fontWeight: "bold" }}>{<LabelWithAsterisk text={t('Amalgamation Order No')} />}</span>
    </Grid>
    <Grid item xs={12} sm={5.9}>
    <TextField
                    
                    fullWidth 
                    label={<LabelWithAsterisk text={"Enter Amalgamation Order No"} />}
                    name="AmalgamationOrderNo"
                    value={formData.AmalgamationOrderNo}
                    onChange={handleChange}
                
                    variant={isEditable ? "outlined" : "filled"}
                    InputProps={{
                      readOnly: !isEditable,
                      style: { backgroundColor: !isEditable ? '' : "#ffff" },
                      
                    }}
                  />
    </Grid>
  </Grid>
  <Grid container item xs={12} sm={12} alignItems="center" justifyContent="center" gap={2}>
    <Grid item xs={12} sm={3} style={{ textAlign: "right" }}>
      <span style={{ fontWeight: "bold" }}>{<LabelWithAsterisk text={t('Amalgamation Order Date')} />}</span>
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label={<LabelWithAsterisk text={t('Amalgamation Order Date')} />}
        name="amaslamationOrderDate"
        value={formData.AmalgamationOrderDate}
        onChange={handleChange}
        variant={isEditable ? "outlined" : "filled"}
        InputProps={{
          readOnly: !isEditable,
          style: { backgroundColor: !isEditable ? '' : "#ffff" },
        }}
      />
    </Grid>
  </Grid>

  {/* Building/Land Name */}
  <Grid container item xs={12} sm={12} alignItems="center" justifyContent="center" gap={2}>
    <Grid item xs={12} sm={3} style={{ textAlign: "right" }}>
      <span style={{ fontWeight: "bold" }}>{t("CheckBandhi EAST")}</span>
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label={t("CheckBandhi EAST")}
        name="CHECKBANDI_EAST"
        value={formData.CHECKBANDI_EAST}
        onChange={handleChange}
        variant={isEditable ? "outlined" : "filled"}
        InputProps={{
          readOnly: !isEditable,
          style: { backgroundColor: !isEditable ? '' : "#ffff" },
        }}
      />
    </Grid>
  </Grid>

  {/* Area/Locality */}
  <Grid container item xs={12} sm={12} alignItems="center" justifyContent="center" gap={2}>
    <Grid item xs={12} sm={3} style={{ textAlign: "right" }}>
      <span style={{ fontWeight: "bold" }}>{<LabelWithAsterisk text={t('CheckBandhi West')} />}</span>
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label={<LabelWithAsterisk text={t('CheckBandhi West')} />}
        name="CHECKBANDI_WEST"
        value={formData.CHECKBANDI_WEST}
        onChange={handleChange}
        variant={isEditable ? "outlined" : "filled"}
        InputProps={{
          readOnly: !isEditable,
          style: { backgroundColor: !isEditable ? '' : "#ffff" },
        }}
      />
    </Grid>
  </Grid>

  {/* Pincode */}
  <Grid container item xs={12} sm={12} alignItems="center" justifyContent="center" gap={2}>
    <Grid item xs={12} sm={3} style={{ textAlign: "right" }}>
      <span style={{ fontWeight: "bold" }}>{<LabelWithAsterisk text={t('CHECKBANDI NORTH')} />}</span>
    </Grid>
    <Grid item xs={12} sm={6}>
    <TextField
        fullWidth
        label={<LabelWithAsterisk text={t('CHECKBANDI NORTH')} />}
        name="CHECKBANDI NORTH"
        value={formData.CHECKBANDI_NORTH}
        onChange={handleChange}
        variant={isEditable ? "outlined" : "filled"}
        InputProps={{
          readOnly: !isEditable,
          style: { backgroundColor: !isEditable ? '' : "#ffff" },
        }}
      />
    </Grid>
  </Grid>
  <Grid container item xs={12} sm={12} alignItems="center" justifyContent="center" gap={2}>
    <Grid item xs={12} sm={3} style={{ textAlign: "right" }}>
      <span style={{ fontWeight: "bold" }}>{<LabelWithAsterisk text={t('CHECKBANDI SOUTH')} />}</span>
    </Grid>
    <Grid item xs={12} sm={6}>
    <TextField
        fullWidth
        label={<LabelWithAsterisk text={t('CHECKBANDI SOUTH')} />}
        name="CHECKBANDI SOUTH"
        value={formData.CHECKBANDI_SOUTH}
        onChange={handleChange}
        variant={isEditable ? "outlined" : "filled"}
        InputProps={{
          readOnly: !isEditable,
          style: { backgroundColor: !isEditable ? '' : "#ffff" },
        }}
      />
    </Grid>
  </Grid>
 
  <Grid container item xs={12} sm={12} alignItems="center" justifyContent="center" gap={2}>
    <Grid item xs={12} sm={3} style={{ textAlign: "right" }}>
      <span style={{ fontWeight: "bold" }}>{<LabelWithAsterisk text={t('Assesment Number')} />}</span>
    </Grid>
    <Grid item xs={12} sm={6}>
      
    <TextField
    fullWidth
                    label={<LabelWithAsterisk text={"Assesment Number"} />}
                    name="ASSESMENTNUMBER"
                    value={formData.ASSESMENTNUMBER}
                    onChange={handleChange}
                    
                    variant={isEditable ? "outlined" : "filled"}
                    InputProps={{
                      readOnly: !isEditable,
                      style: { backgroundColor: !isEditable ? '' : "#ffff" },
                      
                    }}
                  />
    </Grid>
  </Grid>
  <Grid container item xs={12} sm={12} alignItems="center" justifyContent="center" gap={2}>
    <Grid item xs={12} sm={3} style={{ textAlign: "right" }}>
      <span style={{ fontWeight: "bold" }}>{<LabelWithAsterisk text={t('Upload Property Photo')} />}</span>
    </Grid>
    <Grid item xs={12} sm={6}>
    <Box display="flex" alignItems="center" flexDirection="column" textAlign="center" mb={2}>
                
    
                  
    
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    sx={{ mt: 1, mb: 1, px: 1, py: 1 }}
                  >
                    {t("Uploadfile")}
                    <VisuallyHiddenInput type="file" accept=".jpg,.jpeg" onChange={handleIDFileChange} />
                  </Button>
    
                  {selectedIDFile && (
                    <Box display="flex" alignItems="center" justifyContent="center" mt={2} sx={{ color: 'text.secondary' }}>
                      <Typography variant="h6">{selectedIDFile.name}</Typography>
                      <Button color="error" onClick={handleIDFileDelete} sx={{ ml: 2 }}>
                        {t("Delete")}
                      </Button>
                    </Box>
                  )}
    
                  <Typography variant="body2" sx={{ mt: 1, color: '#df1414',fontSize:'1rem' }}>
                  Maximum File Size should not exceed 200 KB
                  </Typography>
                </Box>
    
                {formData.IDExtension && (
                  <Box display="flex" alignItems="center" justifyContent="center" mt={2} sx={{ p: 1, backgroundColor: '#f9f9f9', borderRadius: 1 }}>
                    <Typography variant="h6" color="textSecondary" sx={{ mr: 1 }}>
                      {t("Uploaded Document:")}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ mr: 2 }}>
                      {formData.IDExtension}
                    </Typography>
                    <IconButton onClick={() => handleDownload(formData.IDDocument, formData.IDExtension)}>
                      <GetAppIcon color="primary" />
                    </IconButton>
                  </Box>
                )}
   
    </Grid>
  </Grid>
  <Grid container item xs={12} sm={12} alignItems="center" justifyContent="center" gap={2}>
    <Grid item xs={12} sm={3} style={{ textAlign: "right" }}>
      <span style={{ fontWeight: "bold" }}>{<LabelWithAsterisk text={t('Site Area (mt)')} />}</span>
    </Grid>
    <Grid item xs={12} sm={6}>
    <TextField
                      fullWidth
                      label={< LabelWithAsterisk text={t("Site Area (mt)")} />}
                      name="SiteArea"
                      value={formData.SiteArea || ''}
                      onChange={handleChange}
                      variant="outlined"
                      InputProps={{
                     
                        style: { backgroundColor:  "#ffff" },
                      }}
                    />
                    </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={12} alignItems="center" justifyContent="center" gap={2}>
    <Grid item xs={12} sm={3} style={{ textAlign: "right" }}>
      <span style={{ fontWeight: "bold" }}>{<LabelWithAsterisk text={t('Survey No')} />}</span>
    </Grid>
    <Grid item xs={12} sm={6}>
    <TextField
                      fullWidth
                      label={< LabelWithAsterisk text={t("Survey No")} />}
                      name="SiteArea"
                      value={formData.SiteArea || ''}
                      onChange={handleChange}
                      variant="outlined"
                      InputProps={{
                     
                        style: { backgroundColor:  "#ffff" },
                      }}
                    />
                    </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={12} alignItems="center" justifyContent="center" gap={2}>
                    <Grid item xs={12} sm={3} style={{ textAlign: "right" }}>
                    <span style={{ fontWeight: "bold" }}>{<LabelWithAsterisk text={t('Odd Site ?')} />}</span>
                       
                      </Grid>
                        <Grid item xs={12} sm={6}>
                        <FormControl component="fieldset" sx={{ ml: 1, mb: 0.5 }}>
                          <RadioGroup
                            row
                            name="Oddsite"
                            value={formData.Oddsite}
                            onChange={handleChange}
                            sx={{ display: 'flex', alignItems: 'center' }}
                          >
                            <FormControlLabel value="Y" control={<Radio disabled={!isEditable} />} label={t("Yes")} sx={{ mr: 4 }} />
                            <FormControlLabel value="N" control={<Radio disabled={!isEditable} />} label={t("No")} />
                          </RadioGroup>
                        </FormControl>
                        </Grid>
                        </Grid>
                     
                        <Grid container item xs={12} sm={12} alignItems="center" justifyContent="center" gap={2}>
                    <Grid item xs={12} sm={3} style={{ textAlign: "right" }}>
                    <span style={{ fontWeight: "bold" }}>{<LabelWithAsterisk text={t('Corner Site ?')} />}</span>
                       
                      </Grid>
                        <Grid item xs={12} sm={6}>
                        <FormControl component="fieldset" sx={{ ml: 1, mb: 0.5 }}>
                          <RadioGroup
                            row
                            name="cornerSite"
                            value={formData.cornerSite}
                            onChange={handleChange}
                            sx={{ display: 'flex', alignItems: 'center' }}
                          >
                            <FormControlLabel value="Y" control={<Radio disabled={!isEditable} />} label={t("Yes")} sx={{ mr: 4 }} />
                            <FormControlLabel value="N" control={<Radio disabled={!isEditable} />} label={t("No")} />
                          </RadioGroup>
                        </FormControl>
                        </Grid>
                        </Grid>
                        <Grid container item xs={12} sm={12} alignItems="center" justifyContent="center" gap={2}>
                    <Grid item xs={12} sm={3} style={{ textAlign: "right" }}>
                    <span style={{ fontWeight: "bold" }}>{<LabelWithAsterisk text={t('UGD ?')} />}</span>
                       
                      </Grid>
                        <Grid item xs={12} sm={6}>
                        <FormControl component="fieldset" sx={{ ml: 1, mb: 0.5 }}>
                          <RadioGroup
                            row
                            name="UGD"
                            value={formData.UGD}
                            onChange={handleChange}
                            sx={{ display: 'flex', alignItems: 'center' }}
                          >
                            <FormControlLabel value="Y" control={<Radio disabled={!isEditable} />} label={t("Yes")} sx={{ mr: 4 }} />
                            <FormControlLabel value="N" control={<Radio disabled={!isEditable} />} label={t("No")} />
                          </RadioGroup>
                        </FormControl>
                        </Grid>
                        </Grid>
                        </Grid>
                    {/* <AmalgamationDocumentUploadPage /> */}
          <Box display="flex" justifyContent="center" gap={2} mt={3}>
            <Button variant="contained" color="primary" onClick={back}>
              {t("Previous")}
            </Button>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              {t("submit")}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Amalgamation;
