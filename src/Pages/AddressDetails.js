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
    streetid: '',
    streetName: "",
    Street: "",
    doorno: '',
    buildingname: '',
    areaorlocality: '',
    landmark: '',
    pincode: '',
    propertyphoto: '',
    categoryId: 2,
    puidNo: '',
    loginId: 'crc',
    verifySASNUM: "",
    lat1: 0,
    long1: 0
  });
  const validationSchema = Yup.object().shape({
    DoorPlotNo: Yup.string().required('Door/Plot Number is required'),
    BuildingLandName: Yup.string().required('Building/Land Name is required'),
    AreaLocality: Yup.string().required('Area/Locality is required'),
    NearestLandmark: Yup.string().required('Nearest Landmark is required'),
    Pincode: Yup.string()
      .required('Pincode is required')
      .matches(/^\d{6}$/, 'Pincode must be a 6-digit number'),
    verifySASNUM: Yup.string().required('SAS Application Number is required'),
    streetid: Yup.string().required('Street Name is required'),
  });

  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileExtension, setfileExtension] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [handlemapClicks, sethandlemapClicks] = useState(false);
  const [handleSASClicks, sethandleSASClicks] = useState(false);
  const [lat2, setlat1] = useState(0);
  const [long2, setlong1] = useState(0);
  const [tableData, setTableData] = useState([
  ]);
  const [SAStableData, setSASTableData] = useState([]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = JSON.parse(sessionStorage.getItem('BBD_DRAFT_API'));
      const response2 = JSON.parse(sessionStorage.getItem('NCL_TEMP_API'));
      const response3 = await axiosInstance.get('BBMPCITZAPI/GetMasterTablesData?UlbCode=555');

      const { Table1 = [], Table5 = [], } = response.data;
      const { Table17 = [], Table1: NCLTABLE1 = [], Table7 = [] } = response2.data;
      const { Table2 = [] } = response3.data;
      const table1Item = Table1.length > 0 ? Table1[0] : [];
      const NCLtable1Item = NCLTABLE1.length > 0 ? NCLTABLE1[0] : [];

      const table5Item = Table5.length > 0 ? Table5[0] : [];
      const table17Item = Table17.length > 0 ? Table17[0] : [];
      const table7Item = Table7.length > 0 ? Table7[0] : [];

      const filteredData = Table2.filter(item =>
        item.STREETID !== 99999 && item.WARDID === table1Item.WARDID
      );
      setTableData(filteredData);
      setPreviewUrl(`data:image1/png;base64,${table17Item.PROPERTYPHOTO}`);
      setFormData({
        propertyEID: table1Item.PROPERTYID || '',
        address: table1Item.ADDRESS || '',
        district: table1Item.DISTRICTNAME || '',
        wardNumber: table1Item.WARDNUMBER || '',
        propertyNumber: table1Item.PROPERTYCODE || '',
        ulbname: table1Item.ULBNAME || '',
        ownerName: table5Item.OWNERNAME || '',
        streetName: table1Item.STREETNAME_EN || '',
        DoorPlotNo: table17Item.DOORNO || '',
        BuildingLandName: table17Item.BUILDINGNAME || '',
        streetid: NCLtable1Item.STREETID || '',
        NearestLandmark: table17Item.LANDMARK || '',
        Pincode: table17Item.PINCODE || '',
        AreaLocality: table17Item.AREAORLOCALITY || '',
        lat1: table7Item.LATITUDE || 0,
        long1: table7Item.LONGITUDE || 0,
        verifySASNUM: NCLtable1Item.PUID !== null ? NCLtable1Item.PUID || 0 : table1Item.PUID ? table1Item.PUID : 0,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('There was an error!', error);
      return <ErrorPage errorMessage={error} />;
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const { t } = useTranslation();
  const [previewUrl, setPreviewUrl] = useState('');
  const handleFileChange = (e) => {
    if (!isEditable) return;
    setSelectedFile(e.target.files[0]);
    const file = e.target.files[0];
    const fileName = file.name;
    const fileExtension = fileName.split('.').pop().toLowerCase();
    setfileExtension(fileExtension);
    const maxSize = 200 * 1024;
    if (file && file.size > maxSize) {
      toast.error('File size exceeds 200 KB limit');
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

  const handleSubmit = async () => {
    debugger
    
    var propertyphoto2 = "";
    if (isEditable) {
      if (selectedFile) {
        propertyphoto2 = await getPropertyphoto(selectedFile);
      }
      if(fileExtension.length === 0){
        toast.error("Please Upload the Property Photo");
        return;
      }
      setLoading(true);
      const data = {
        propertyCode: formData.propertyNumber,
        streetid: formData.streetid,
        doorno: formData.DoorPlotNo,
        buildingname: formData.BuildingLandName,
        areaorlocality: formData.AreaLocality,
        landmark: formData.NearestLandmark,
        pincode: formData.Pincode,
        propertyphoto: propertyphoto2,
        categoryId: 2,
        puidNo: formData.verifySASNUM,
        loginId: "crc",
        eidappno: JSON.parse(sessionStorage.getItem('EIDAPPNO')),
        latitude: formData.lat1.toString(),
        longitude: formData.long1.toString()
      };
      try {
        await axiosInstance.post('BBMPCITZAPI/GET_PROPERTY_CTZ_PROPERTY', data
        )
        setSelectedFile(null);
        const response1 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP?ULBCODE=555&EIDAPPNO=' + JSON.parse(sessionStorage.getItem('EIDAPPNO')) + '&Propertycode=' + JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')) + '');
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
        //await fetchData(); 
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
    console.log('New address:', newAddress);
    var parts = newAddress.address.split(', ');
    var doorNo = '';
    var street = '';
    var pincode = '';
    var area = '';
    if (parts.length == 3) {
      area = parts[0].trim();
      setFormData({
        ...formData,
        lat1: lat2 !== undefined ? newAddress.lat : 0,
        long1: long2 !== undefined ? newAddress.lng : 0,
        AreaLocality: area

      });
    } else {
      var pincodeRegex = /\b\d{6}\b/;
      var pincodes = newAddress.address.match(pincodeRegex);
      doorNo = parts[0].trim();
      pincode = pincodes[0];
      area = parts[0].trim();
      setFormData({
        ...formData,
        lat1: lat2 !== undefined ? newAddress.lat : 0,
        long1: long2 !== undefined ? newAddress.lng : 0,
        DoorPlotNo: doorNo.length > 0 ? doorNo : "",
        Pincode: pincode,
        AreaLocality: area

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

      const response = await axiosInstance.get('BBMPCITZAPI/GetTaxDetails?applicationNo=' + formData.verifySASNUM)
      const { Table = [] } = response.data;
      if (Table.length === 0) {
        toast.error("No Application Found");
      }
      setSASTableData(Table);
    }
    else {
      sethandleSASClicks(false);
      setSASTableData([]);
    }
  };

  const handleNavigation = () => {
    navigate('/AreaDimension/select')
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
        <Formik
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange={handleChange}
          enableReinitialize
        >
          {({ errors, touched, handleBlur }) => (
            <Form>
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
              <Grid container spacing={4} alignItems={"center"}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant={isEditable ? "standard" : "filled"}
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
                  <Button color='success' variant={"contained"} onClick={async () => handleSASClick()}>Verify SAS Application Number</Button>
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

              <Button color='success' variant={"contained"} onClick={handleMapClick}>Click Here to Capture Property Location</Button>
              <br></br>
              <br></br>
              {handlemapClicks ?
                <GoogleMaps lat={13.0074} long={77.5688} onLocationChange={handleAddressChange} />
                : ""}
              <br></br>
              <br></br>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label={t("doorPlotNo")}
                    name="DoorPlotNo"
                    value={formData.DoorPlotNo}
                    onChange={handleChange}
                    variant={isEditable ? "standard" : "filled"}
                    onBlur={handleBlur}
                    className={touched.DoorPlotNo && !!errors.DoorPlotNo ? 'shake' : ''}
                    error={touched.DoorPlotNo && !!errors.DoorPlotNo}
                    helperText={touched.DoorPlotNo && errors.DoorPlotNo}
                    InputProps={{
                      readOnly: !isEditable,
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
                    name="BuildingLandName"
                    value={formData.BuildingLandName}
                    onChange={handleChange}
                    variant={isEditable ? "standard" : "filled"}
                    onBlur={handleBlur}
                    className={touched.BuildingLandName && !!errors.BuildingLandName ? 'shake' : ''}
                    error={touched.BuildingLandName && !!errors.BuildingLandName}
                    helperText={touched.BuildingLandName && errors.BuildingLandName}
                    InputProps={{
                      readOnly: !isEditable,
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
                    variant={isEditable ? "standard" : "filled"}
                    InputProps={{
                      readOnly: !isEditable,
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
                    name="Pincode"
                    type="number"
                    value={formData.Pincode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touched.Pincode && !!errors.Pincode ? 'shake' : ''}
                    error={touched.Pincode && !!errors.Pincode}
                    helperText={touched.Pincode && errors.Pincode}
                    variant={isEditable ? "standard" : "filled"}
                    InputProps={{
                      readOnly: !isEditable,
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
                    name="AreaLocality"
                    value={formData.AreaLocality}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touched.AreaLocality && !!errors.AreaLocality ? 'shake' : ''}
                    error={touched.AreaLocality && !!errors.AreaLocality}
                    helperText={touched.AreaLocality && errors.AreaLocality}
                    variant={isEditable ? "standard" : "filled"}
                    InputProps={{
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
                      <Typography variant="body1" sx={{ ml: 1, color: '#df1414' }}>
                        Maximum File Size should not exceed 200 KB
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" gap={2}>
                  <Button variant="contained" color="primary" onClick={handleAddressEdit}>
                    Edit Address
                  </Button>
                  <Button variant="contained" color="success" type="submit">
                    {t("save")}
                  </Button>

                  <Button variant="contained" color="primary" onClick={handleNavigation}>
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
