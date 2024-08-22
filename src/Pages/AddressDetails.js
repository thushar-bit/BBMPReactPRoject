import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Grid, Box, Container, Typography, CircularProgress, Tooltip, IconButton,
  FormControl, FormHelperText, MenuItem, Select, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../components/Axios';
import ErrorPage from './ErrorPage';
import GoogleMaps from '../components/GoogleMaps';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import '../components/Shake.css';
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

const AddressDetails = () => {
  const [formData, setFormData] = useState({
    propertyCode: '',
    propertyNumber:"",
    propertyEID:"",
    district:"",
    ulbname:"",
    buildingname:"",
    NearestLandmark:"",
    DoorPlotNo:"",
    streetid: '',
    streetName: "",
    Street: "",
    doorno: '',
    areaorlocality: '',
    landmark: '',
    propertyType: '',
    pincode: '',
    propertyphoto: '',
    categoryId: 2,
    puidNo: '',
    loginId: 'crc',
    verifySASNUM: "",
    lat1: 0,
    long1: 0,
    wardNumber:"",
    ownerName:""
  });
  const validationSchema = Yup.object().shape({
    DoorPlotNo: Yup.string().required('Door/Plot Number is required').notOneOf(['0'], 'Door Name cannot be "0"'),
    buildingname: Yup.string().required('Building/Land Name is required'),
    areaorlocality: Yup.string().required('Area/Locality is required'),
    NearestLandmark: Yup.string().required('Nearest Landmark is required'),
    pincode: Yup.string()
      .required('Pincode is required')
      .matches(/^\d{6}$/, 'Pincode must be a 6-digit number'),
    verifySASNUM: Yup.string().required('SAS Application Number is required').notOneOf(['0'], 'SAS Number cannot be "0"'),
    streetid: Yup.string().required('Street Name is required').notOneOf(['0'], 'Street Name cannot be "0"'),
    propertyType:Yup.string().required('Property Type is required').notOneOf(['0'], 'Property Type cannot be Select'),
    lat1:Yup.string().required('latitude is required').notOneOf(['0'], 'latitude cannot be "0"'),
    long1:Yup.string().required('longitude is required').notOneOf(['0'], 'longitude cannot be "0"'),
  });

  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileExtension, setfileExtension] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [handlemapClicks, sethandlemapClicks] = useState(false);
  const [handleSASClicks, sethandleSASClicks] = useState(true);
  const [fieldvalue,setFieldValue] = useState("")
  const [lat2, setlat1] = useState(0);
  const [long2, setlong1] = useState(0);
  
  const [tableData, setTableData] = useState([
  ]);
  const [SAStableData, setSASTableData] = useState([]);
  const fetchData = React.useCallback( async () => {
    setLoading(true);
    try {
      const response = JSON.parse(sessionStorage.getItem('BBD_DRAFT_API'));
      const response2 = JSON.parse(sessionStorage.getItem('NCL_TEMP_API'));
      const response3 = await axiosInstance.get('BBMPCITZAPI/GetMasterTablesData?UlbCode=555');

      const { Table1 = [], Table5 = [], } = response.data;
let NCLtable1Item = [];
let Table11Item = [];
let table4Item = [];
      if(response2){
      const { Table11 = [], Table1: NCLTABLE1 = [], Table4 = [] } = response2.data;
       NCLtable1Item = NCLTABLE1.length > 0 ? NCLTABLE1[0] : [];
       Table11Item = Table11.length > 0 ? Table11[0] : [];
       table4Item = Table4.length > 0 ? Table4[0] : [];
      setPreviewUrl(`data:image1/png;base64,${Table11Item.PROPERTYPHOTO || ""}`);
      setPropertyPhoto(Table11Item.PROPERTYPHOTO || "");
     
      }else {
      setIsEditable(true)
      }
      const { Table2 = [] } = response3.data;
      const table1Item = Table1.length > 0 ? Table1[0] : [];
     
      const table5Item = Table5.length > 0 ? Table5[0] : [];
      

      const filteredData = Table2.filter(item =>
        item.STREETID !== 99999 && item.WARDID === table1Item.WARDID
      );
      setTableData(filteredData);
  
      setFormData({
        propertyType: NCLtable1Item.PROPERTYCATEGORYID || "0" ,
        propertyEID: table1Item.PROPERTYID || '',
        address: table1Item.ADDRESS || '',
        district: table1Item.DISTRICTNAME || '',
        wardNumber: table1Item.WARDNUMBER || '',
        propertyNumber: table1Item.PROPERTYCODE || '',
        ulbname: table1Item.ULBNAME || '',
        ownerName: table5Item.OWNERNAME || '',
        streetName: table1Item.STREETNAME_EN || '',
        DoorPlotNo: Table11Item.DOORNO || '',
        buildingname: Table11Item.BUILDINGNAME || '',
        streetid: NCLtable1Item.STREETID || '',
        NearestLandmark: Table11Item.LANDMARK || '',
        pincode: Table11Item.PINCODE || '',
        areaorlocality: Table11Item.AREAORLOCALITY || '',
        lat1: table4Item.LATITUDE || 0,
        long1: table4Item.LONGITUDE || 0,
        verifySASNUM: NCLtable1Item.PUID !== null ? NCLtable1Item.PUID || 0 : table1Item.PUID ? table1Item.PUID : 0,
      });
      const sasNum = NCLtable1Item.PUID !== null ? NCLtable1Item.PUID || 0 : table1Item.PUID ? table1Item.PUID : 0;
      const responseSAS = await axiosInstance.get('BBMPCITZAPI/GetTaxDetails?applicationNo=' + sasNum + '&propertycode='+JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))+'&P_BOOKS_PROP_APPNO='+JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))+'&loginId=crc')
      const { Table = [] } = responseSAS.data;
      
      if (Table.length === 0) {
        toast.error("No SAS Applications Found");
      }
      setSASTableData(Table);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('There was an error!', error);
      return <ErrorPage errorMessage={error} />;
    }
    setLoading(false);
  }, []); 

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    
    const { name, value } = e.target;
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

  const { t } = useTranslation();
  const [previewUrl, setPreviewUrl] = useState('');
  const [propertyPhoto, setPropertyPhoto] = useState('');

  const handleFileChange = (e) => {
    if (!isEditable) return;
    setSelectedFile(e.target.files[0]);
    const file = e.target.files[0];
    const fileName = file.name;
    const fileExtension = fileName.split('.').pop().toLowerCase();
    setfileExtension(fileExtension);
    const maxSize = 500 * 1024;
    if (file && file.size > maxSize) {
      toast.error('File size exceeds 500 KB limit');
      e.target.value = null;
      setSelectedFile(null);
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(file);
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileDelete = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setfileExtension('');
  };
  const handleBack = () => {
    sessionStorage.removeItem("BBD_DRAFT_API");
    sessionStorage.removeItem("NCL_TEMP_API");
    sessionStorage.removeItem("P_BOOKS_PROP_APPNO");
    sessionStorage.removeItem("SETPROPERTYCODE");
    sessionStorage.removeItem("SETPROPERYID");
    navigate("/BBDDraft");
  }
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

const CopyBookData = async () => {
  try {
    if(JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO')) === null){
      const response4 = await axiosInstance.get(`BBMPCITZAPI/COPY_DATA_FROM_BBDDRAFT_NCLTEMP?LoginId=crc&propertycode=${JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))}&propertyid=${JSON.parse(sessionStorage.getItem('SETPROPERYID'))}`);
      const response3 = await axiosInstance.get(`BBMPCITZAPI/Get_Ctz_ObjectionModPendingAppl?LoginId=crc&propertycode=${JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))}&propertyid=${JSON.parse(sessionStorage.getItem('SETPROPERYID'))}`);
      if (response3.data === "There is a issue while copying the data from Book Module.No Data Found") {
       toast.error("There is a issue while copying the data from Book Module.No Data Found")
       return false
         }
         sessionStorage.setItem('P_BOOKS_PROP_APPNO', JSON.stringify(response3.data.P_BOOKS_PROP_APPNO));
         return true;
    }
    else{
      return true;
    }
  } catch (error) {
    <ErrorPage errorMessage={error}/>
    return false;
  }
  
}

  const handleSubmit = async () => {
  debugger
    
    var propertyphoto2 = "";
    if (isEditable) {
      if (selectedFile) {
        propertyphoto2 = await getPropertyphoto(selectedFile);
      }
      if(propertyPhoto.length === 0){
        if(propertyphoto2.length === 0){
        toast.error("Please Upload the New Property Photo");
        return;
        }
      }
      setLoading(true);
      const copy = await CopyBookData();
      if(copy){
        toast.success("Copy From BBMP Books Data Was Successfull.")
      }else{
        toast.error("Something Went wrong.Copy of Book Data was Not SuccessFull")
      }
      
     if(formData.DoorPlotNo === "" || formData.DoorPlotNo === null || formData.DoorPlotNo === undefined){
      toast.error("Please Enter the Door No")
      return
     }
        
      const data = {
        propertyCode: formData.propertyNumber,
        categoryId:formData.propertyType,
        streetid: formData.streetid,
        doorno: formData.DoorPlotNo,
        buildingname: formData.buildingname,
        areaorlocality: formData.areaorlocality,
        landmark: formData.NearestLandmark,
        pincode: formData.pincode,
        propertyphoto: propertyphoto2.length > 0 ? propertyphoto2 : propertyPhoto,
        puidNo: formData.verifySASNUM,
        loginId: "crc",
        P_BOOKS_PROP_APPNO: JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO')),
        latitude: formData.lat1.toString(),
        longitude: formData.long1.toString()
      };
      try {
        await axiosInstance.post('BBMPCITZAPI/GET_PROPERTY_CTZ_PROPERTY', data
        )
        setSelectedFile(null);
        const response1 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP?ULBCODE=555&P_BOOKS_PROP_APPNO=' + JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO')) + '&Propertycode=' + JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')) + '');
        sessionStorage.setItem('NCL_TEMP_API', JSON.stringify(response1));
        setTimeout(() => {
         toast.success("Details Saved Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }, 1000);

        setIsEditable(false);
        await fetchData(); 
        setLoading(false);
      } catch (error) {
        await toast.error("Error saving data ", error, {
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
        }, 2000);
      }
    } else {
      await toast.warning("No changes to save", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setLoading(false);
  }

  const handleMapClick = () => {
    if (handleMapClick === true) {
      sethandlemapClicks(false)
    }
    else {
      sethandlemapClicks(true)
    }
  };

  const handleAddressChange = (newAddress) => {
    
   
    if (!newAddress || !newAddress.address) {
      console.error('Address is undefined');
      return;
    }
    var parts = newAddress.address.split(', ');
    var doorNo = "";
    var pincode = "";
    var area = "";
 
   
    if (parts.length === 3) {
      area = parts[0].trim();
      setFormData({
        ...formData,
        lat1: lat2 !== undefined ? newAddress.lat : 0,
        long1: long2 !== undefined ? newAddress.lng : 0,
        areaorlocality: area

      });
    } else {
      var pincodeRegex = /\b\d{6}\b/;
      var pincodes = newAddress.address.match(pincodeRegex);
      doorNo = parts[0].trim();
      if(pincodes != null){
      pincode = pincodes[0];
    }
      area = parts[0].trim();
      setFormData({
        ...formData,
        lat1: lat2 !== undefined ? newAddress.lat : 0,
        long1: long2 !== undefined ? newAddress.lng : 0,
        DoorPlotNo: doorNo.length > 0 ? doorNo : "",
        pincode: pincode,
        areaorlocality: area

      });
    }

  };

  const handleSASClick = async () => {

    if (handleSASClicks === false) {
      sethandleSASClicks(true);
      if (formData.verifySASNUM.length === 0) {
        toast.error("Please Provide SAS Application Number");
        return
      }
      const copy = await CopyBookData();
      if(copy){
        toast.success("Copy From BBMP Books Data Was Successfull.")
      }else{
        toast.error("Something Went wrong.Copy of Book Data was Not SuccessFull")
        return
      }
      const response = await axiosInstance.get('BBMPCITZAPI/GetTaxDetails?applicationNo=' + formData.verifySASNUM + '&propertycode='+JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))+'&P_BOOKS_PROP_APPNO='+JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))+'&loginId=crc')

     
      const { Table = [] } = response.data;
      if (Table.length === 0) {
        toast.error("No SAS Applications Found");
      }
      setSASTableData(Table);
    }
    else {
      sethandleSASClicks(false);
      setSASTableData([]);
    }
  };

  const handleNavigation = async () => {
    if(propertyPhoto.length === 0){
      toast.error("Please Save the Address Details Before Going to Next Step");
      return;
      }
      navigate('/AreaDimension')
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
                    label="Property EID"
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
                    value={formData.wardNumber}
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
                    label={t("propertyNumber")}
                    name="propertyNumber"
                    value={formData.propertyNumber}
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
                    label={t("ownerName")}
                    name="ownerName"
                    value={formData.ownerName}
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
              <Typography
                variant="h6"
                align="center"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  fontFamily: "sans-serif",
                  marginBottom: 3,
                  color: '#1565c0',
                  fontSize: {
                    xs: '1.5rem',
                    sm: '2rem',
                    md: '2.5rem',
                  }
                }}
              >
                {t("PostalAddressofProperty")}
              </Typography>
              <GoogleMaps lat={13.0074} long={77.5688} onLocationChange={handleAddressChange} />
              <Formik
          initialValues={formData}
          validationSchema={validationSchema}
          //onSubmit={handleSubmit}
          onSubmit={(values, { setSubmitting }) => {
            
            if (fieldvalue === 'save') {
             handleSubmit()

            } else if (fieldvalue === 'next') {
            
              handleNavigation();
            }
            setSubmitting(false);
          }}
          validateOnChange={false}
          enableReinitialize
        >
          {({ errors, touched, handleBlur }) => (
            <Form>
              <br></br>
              <br></br>
              <FormControl fullWidth sx={{ marginBottom: 3 }}
              error={touched.propertyType && !!errors.propertyType}
              className={touched.propertyType && !!errors.propertyType ? 'shake' : ''}>
            <InputLabel>Select the Property Type</InputLabel>
            <Select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              inputProps={{ readOnly: !isEditable }}
              onBlur={handleBlur}
              sx={{backgroundColor: !isEditable? '' : "#ffff"}}
            >
              <MenuItem value="0">Select</MenuItem>
              <MenuItem value="1">Vacant Site</MenuItem>
              <MenuItem value="2">Site with Building</MenuItem>
              <MenuItem value="3">Multistorey Flats</MenuItem>
            </Select>
            <FormHelperText>
                      {touched.propertyType && errors.propertyType ? errors.propertyType : ''}
                    </FormHelperText>
          </FormControl>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t("doorPlotNo")}
                    name="DoorPlotNo"
                    value={formData.DoorPlotNo}
                    onChange={handleChange}
                    variant={isEditable ? "outlined" : "filled"}
                    onBlur={handleBlur}
                    className={touched.DoorPlotNo && !!errors.DoorPlotNo ? 'shake' : ''}
                    error={touched.DoorPlotNo && !!errors.DoorPlotNo}
                    helperText={touched.DoorPlotNo && errors.DoorPlotNo}
                    InputProps={{
                      readOnly: !isEditable,
                      style: { backgroundColor:  !isEditable ? '': "#ffff" } ,
                      endAdornment: (
                        <Tooltip title={t("doorPlotNoInfo")}>
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
                    label={t("buildingLandName")}
                    name="buildingname"
                    value={formData.buildingname}
                    onChange={handleChange}
                    variant={isEditable ? "outlined" : "filled"}
                    onBlur={handleBlur}
                    className={touched.buildingname && !!errors.buildingname ? 'shake' : ''}
                    error={touched.buildingname && !!errors.buildingname}
                    helperText={touched.buildingname && errors.buildingname}
                    InputProps={{
                      readOnly: !isEditable,
                      style: { backgroundColor:  !isEditable ? '': "#ffff" } ,
                      endAdornment: (
                        <Tooltip title={t("buildingLandNameInfo")}>
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
                    label={t("nearestLandmark")}
                    name="NearestLandmark"
                    value={formData.NearestLandmark}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touched.NearestLandmark && !!errors.NearestLandmark ? 'shake' : ''}
                    error={touched.NearestLandmark && !!errors.NearestLandmark}
                    helperText={touched.NearestLandmark && errors.NearestLandmark}
                    variant={isEditable ? "outlined" : "filled"}
                    InputProps={{
                      readOnly: !isEditable,
                      style: { backgroundColor:  !isEditable ? '': "#ffff" } ,
                      endAdornment: (
                        <Tooltip title={t("nearestLandmarkInfo")}>
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
                    label={t("pincode")}
                    name="pincode"
                    type="number"
                    value={formData.pincode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touched.pincode && !!errors.pincode ? 'shake' : ''}
                    error={touched.pincode && !!errors.pincode}
                    helperText={touched.pincode && errors.pincode}
                    variant={isEditable ? "outlined" : "filled"}
                    InputProps={{
                      readOnly: !isEditable,
                      style: { backgroundColor:  !isEditable ? '': "#ffff" } ,
                      endAdornment: (
                        <Tooltip title={t("pincodeInfo")}>
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
                    label={t("areaLocality")}
                    name="areaorlocality"
                    value={formData.areaorlocality}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touched.areaorlocality && !!errors.areaorlocality ? 'shake' : ''}
                    error={touched.areaorlocality && !!errors.areaorlocality}
                    helperText={touched.areaorlocality && errors.areaorlocality}
                    variant={isEditable ? "outlined" : "filled"}
                    InputProps={{
                      style: { backgroundColor:  !isEditable ? '': "#ffff" } ,
                      readOnly: !isEditable,
                      endAdornment: (
                        <Tooltip title={t("areaLocalityInfo")}>
                          <IconButton color="primary">
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>

                  <FormControl
                    fullWidth
                    error={touched.streetid && !!errors.streetid}
                    sx={{ marginBottom: 3 }}
                    className={touched.streetid && !!errors.streetid ? 'shake' : ''}
                  >
                    <InputLabel >Street Name :</InputLabel>
                    <Select
                      name="streetid"
                      value={formData.streetid}
                      onChange={handleChange}
                      inputProps={{ readOnly: !isEditable }}
                      onBlur={handleBlur}
                      sx={{backgroundColor: !isEditable? '' : "#ffff"}}
                    >
                      <MenuItem value="">--Select--</MenuItem>
                      {tableData.map((item) => (
                        <MenuItem key={item.STREETID} value={item.STREETID}>
                          {item.STREETNAME1}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {touched.streetid && errors.streetid ? errors.streetid : ''}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t("Lattitude")}
                    name="lat1"
                    value={formData.lat1}
                    onChange={handleChange}
                    variant={"filled"}
                    className={touched.lat1 && !!errors.lat1 ? 'shake' : ''}
                    error={touched.lat1 && !!errors.lat1}
                    helperText={touched.lat1 && errors.lat1}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <Tooltip title={t("areaLocalityInfo")}>
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
                    label={t("Longitude")}
                    name="long1"
                    value={formData.long1}
                    onChange={handleChange}
                    variant={"filled"}
                    className={touched.long1 && !!errors.long1 ? 'shake' : ''}
                    error={touched.long1 && !!errors.long1}
                    helperText={touched.long1 && errors.long1}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <Tooltip title={t("areaLocalityInfo")}>
                          <IconButton color="primary">
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center">
                    <Typography variant="body1" sx={{ ml: 1 }}>
                      {t("uploadPropertyPhoto")}
                    </Typography>
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      sx={{ ml: 2 }}
                      disabled={!isEditable}
                    >
                      {t("Uploadfile")}
                      <VisuallyHiddenInput type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} />
                    </Button>

                  </Box>
                  {previewUrl && (
                    <div style={{ marginLeft: '10px', position: 'relative' }}>
                      <img
                        src={previewUrl}
                        alt="No Images Found"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '200px',
                          width: 'auto', // Allow the width to adjust responsively
                          height: 'auto', // Allow the height to adjust responsively
                        }}
                      />
                    </div>
                  )}

                  {selectedFile && (
                    <Box display="flex" alignItems="center" mt={2}>
                      <Typography variant="body1">{selectedFile.name}</Typography>
                      <Button color="error" variant='outlined' onClick={handleFileDelete} sx={{ ml: 2 }}>
                        Delete Image
                      </Button>
                    </Box>
                  )}
                </Grid>
              </Grid>
              <br></br>
              <Grid container spacing={4} alignItems={"center"}>
                <Grid item xs={12} sm={6}>
                  
                  <TextField
                    fullWidth
                    variant={isEditable ? "outlined" : "filled"}
                    label="SAS Application Number"
                    name="verifySASNUM"
                    value={formData.verifySASNUM}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touched.verifySASNUM && !!errors.verifySASNUM ? 'shake' : ''}
                    error={touched.verifySASNUM && !!errors.verifySASNUM}
                    helperText={touched.verifySASNUM && errors.verifySASNUM}
                    InputProps={{
                      readOnly: !isEditable,
                      style: { backgroundColor:  !isEditable ? '': "#ffff" } ,
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
                <Grid item xs={12} sm={6}>
                  <Button color='success' variant={"contained"}  disabled={!isEditable} onClick={async () => handleSASClick()}>Verify SAS Application Number</Button>
                </Grid>
              </Grid>
              <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Application Number</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>PID</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>KHATHA SURVEY NO</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Owner Name</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Property Address</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Site Area</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Built Up Area</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {SAStableData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={12} align="center">
                          No data available
                        </TableCell>
                      </TableRow>
                    ) : (
                      SAStableData.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.APPLICATIONNUMBER}</TableCell>
                          <TableCell>{row.PID}</TableCell>
                          <TableCell>{row.KHATHA_SURVEY_NO}</TableCell>
                          <TableCell>{row.OWNERNAME}</TableCell>
                          <TableCell>{row.PROPERTYADDRESS}</TableCell>
                          <TableCell>{row.SITEAREA}</TableCell>
                          <TableCell>{row.BUILTUPAREA}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <br></br>
              <br></br>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" gap={2}>
                <Button variant="contained" color="primary" onClick={handleBack}>
                    Back
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleAddressEdit}>
                    Edit
                  </Button>
                  <Button variant="contained" color="success" type="submit"  onClick={() => setFieldValue('save')}>
                    {t("save")}
                  </Button>

                  <Button variant="contained" color="primary"  type="submit"
        onClick={() => setFieldValue('next')} >
                    Next
                  </Button>
                </Box>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default AddressDetails;
