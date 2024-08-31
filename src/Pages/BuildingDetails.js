import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Grid, Box, Container, Typography, Tooltip, IconButton,
  FormControl, MenuItem, Select, InputLabel,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormHelperText
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../components/Axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import '../components/Shake.css';
const BuildingDetails = () => {
  const [formData, setFormData] = useState({
    BuildingNumber: "",
    BuildingName: '',
    floornumber: "",
    features: '',
    Typeofuse: '',
    yearOfConstruction: '',
    SelfuseArea: "",
    RentedArea: "",
    TotalArea: '',
    SelfuseAreaMts: "",
    RentedAreaMts: "",
    TotalAreaMts: '',
    BesomCustomerID: '',
    BWSSBMeterNumber: ''
  });
  const { t } = useTranslation();
  const validationSchema = Yup.object().shape({
    BuildingNumber: Yup.string().required(`${t('buildingNumberRequired')}`),
    BuildingName: Yup.string().required(`${t('buildingNameRequired')}`),
    floornumber: Yup.string().required(`${t('floorNumberRequired')}`),
    features: Yup.string().required(`${t('usageCategoryRequired')}`),
    yearOfConstruction: Yup.string()
      .required(`${t('yearUsageRequired')}`)
      .matches(/^\d{4}$/, 'Year Usage must be a 4-digit number'),
    Typeofuse: Yup.string().required(`${t('typeOfUseRequired')}`),
    SelfuseArea: Yup.string().required(`${t('selfUseAreaRequired')}`),
    RentedArea: Yup.string().required(`${t('rentedAreaRequired')}`),
  //  BWSSBMeterNumber: Yup.string().required('BWSSB Meter Number is required'),
  //  BesomCustomerID: Yup.string().required('Bescom Customer ID is required'),

  });
  const [tableData, setTableData] = useState([
  ]);
  const navigate = useNavigate();
  const [tablesdata2, setTablesData2] = useState([]);
  const [tablesdata3, setTablesData3] = useState([]);
  const [tablesdata4, setTablesData4] = useState([]);
  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "features") {
      try {
        if (value !== "") {
          const response = await axiosInstance.get(`BBMPCITZAPI/GetNPMMasterTable?FeaturesHeadID=${value}`);
          if (response.data.Table.length > 0) {
            setTablesData3(response.data.Table);
          }
        }
      } catch (error) {
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
        }, 2000);
      }
    }
    if (name === 'SelfuseArea' || name === 'RentedArea') {
      const selfuseAreaValue = name === 'SelfuseArea' ? value : formData.SelfuseArea;
      const RentedAreaValue = name === 'RentedArea' ? value : formData.RentedArea;
      const totalArea = Math.round(parseFloat(selfuseAreaValue) + parseFloat(RentedAreaValue));
      formData.TotalArea = totalArea;
      formData.SelfuseAreaMts =(parseFloat(selfuseAreaValue) * 0.092903).toFixed(2).toString()
      formData.RentedAreaMts =     (parseFloat(RentedAreaValue) * 0.092903).toFixed(2).toString()
      formData.TotalAreaMts = (parseFloat(totalArea) * 0.092903).toFixed(2).toString()
      
    }
    if (name === "yearOfConstruction") {
      if (/^\d{0,4}$/.test(value)) {
        setFormData(prevFormData => ({
          ...prevFormData,
          [name]: value
        }));
      }
      return
    }
   
    setFormData({
      ...formData,
      [name]: value
    });
  };

 
  const fetchData = async () => {
    try {
      const response1 = await axiosInstance.get('BBMPCITZAPI/GetMasterTablesData?UlbCode=555');
      const response2 = JSON.parse(sessionStorage.getItem('NCL_TEMP_API'));
      const { Table15 = [], Table16 = [] } = response1.data;

      const { Table8 = [] } = response2.data;
      const table8Item = Table8.length > 0 ? Table8 : [];
      const table16Item = Table16.length > 0 ? Table16 : [];
      const table15Item = Table15.length > 0 ? Table15 : [];
      setTableData(table8Item);
      setTablesData2(table16Item);
      setTablesData4(table15Item);
    } catch (error) {
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
      }, 2000);
    }

  }
  const handleSubmit = async () => {
    // 
    

    var BUILDINGUSAGETYPEID = 0;
    if (formData.RentedArea === 0) {
      BUILDINGUSAGETYPEID = 4;
    }
    else if (formData.SelfuseArea === 0) {
      BUILDINGUSAGETYPEID = 5;
    }
    else if (formData.SelfuseArea !== 0 && formData.SelfuseArea !== 0) {
      BUILDINGUSAGETYPEID = 6;
    }
    const data = {
      propertyCode: JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')),
      floornumberid: formData.floornumber,
      floortypeid: formData.floornumber,
      createdby: "crc",
      buildingusagetypeid: BUILDINGUSAGETYPEID,
      ulbcode: 555,
      featureheadid: formData.features,
      featureid: formData.Typeofuse,
      builtyear: formData.yearOfConstruction,
      rrno: formData.BesomCustomerID || null,
      watermeterno: formData.BWSSBMeterNumber,
      buildingnumberid: formData.BuildingNumber,
      buildingblockname: formData.BuildingName || null,
      ownUseArea: formData.SelfuseArea,
      rentedArea: formData.RentedArea,
      p_BOOKS_PROP_APPNO: JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))
    }

    try {
      await axiosInstance.post('BBMPCITZAPI/DEL_INS_SEL_NCL_PROP_BUILDING_TEMP?ULBCODE=555', data
      )

      const response1 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP?ULBCODE=555&P_BOOKS_PROP_APPNO=' + JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO')) + '&Propertycode=' + JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')) + '');
      sessionStorage.setItem('NCL_TEMP_API', JSON.stringify(response1));
      await toast.success(`${t("detailsSavedSuccess")}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(async () => {
        await fetchData();
        //    handleNavigation()
      }, 2000);
    } catch (error) {
      await toast.error(`${t("errorSavingData")}` + error, {
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

  };
  const back = () => {
    navigate('/AreaDimension')
  }
  const handleNavigation = () => {

    navigate('/OwnerDetails');

  }
  const handleDelete = async (id) => {

    const data = {
      propertyCode: JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')),
      //  floortypeid: id.FLOORTYPEID,
      floortypeid: id.BUILDINGROWID,
      p_BOOKS_PROP_APPNO: JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))
    }
    try {
      await axiosInstance.post('BBMPCITZAPI/DEL_SEL_NCL_PROP_BUILDING_TEMP?ULBCODE=555', data
      )
      const response1 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP?ULBCODE=555&P_BOOKS_PROP_APPNO=' + JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO')) + '&Propertycode=' + JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')) + '');
      sessionStorage.setItem('NCL_TEMP_API', JSON.stringify(response1));
      await toast.succss(`${t("detailsDeletedSuccess")}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(async () => {
        await fetchData();
        //    handleNavigation()
      }, 2000);


    } catch (error) {
      await toast.error(`${t("Error Deleting data!")}` + error, {
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
  };

  const handleEdit = async (row) => {
    try {
      if (row.FEATUREHEADID !== null && row.FEATUREHEADID !== "") {
        const response3 = await axiosInstance.get(`BBMPCITZAPI/GetNPMMasterTable?FeaturesHeadID=${row.FEATUREHEADID}`);
        if (response3.data.Table.length > 0) {
          setTablesData3(response3.data.Table);
        }
      }
      setFormData({
        BuildingNumber: row.BUILDINGBLOCKID || 0,
        BuildingName: row.BUILDINGBLOCKNAME || '',
        floornumber: row.FLOORNUMBERID || '',
        features: row.FEATUREHEADID || '',
        Typeofuse: row.FEATUREID || '',
        yearOfConstruction: row.BUILTYEAR || '',
        SelfuseArea: row.AREA || 0,
        RentedArea: row.RENTEDAREA || 0,
        TotalArea: row.TOTALAREA || '',
        BesomCustomerID: row.RRNO || '',
        BWSSBMeterNumber: row.WATERMETERNO || ''
      });
    } catch (error) {
      toast.error(`${t("Error Getting data!")}` + error, {
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

  };
  useEffect(() => {

    fetchData();

  }, []);
 
  return (
    <Container maxWidth="xl">
      <ToastContainer />
      <Box sx={{ backgroundColor: '#f0f0f0', padding: 4, borderRadius: 2, mt: 8 }}>
        <Formik
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange={true}
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
                {t("DetailsOfUsageOfBuilt-upArea")}
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type='number'
                    label={t("BuildingNumber")}
                    name="BuildingNumber"
                    value={formData.BuildingNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    
                    className={touched.BuildingNumber && !!errors.BuildingNumber ? 'shake' : ''}
                    error={touched.BuildingNumber && !!errors.BuildingNumber}
                    helperText={touched.BuildingNumber && errors.BuildingNumber}
                    InputProps={{
                      style: { backgroundColor: '#ffff' } ,
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
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    InputProps={{
                      style: { backgroundColor: '#ffff' } ,
                      endAdornment: (
                        <Tooltip title={t("cityInfo")}>
                          <IconButton color="primary">
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      )
                    }}
                    label={t("BuildingName")}
                    name="BuildingName"
                    value={formData.BuildingName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touched.BuildingName && !!errors.BuildingName ? 'shake' : ''}
                    error={touched.BuildingName && !!errors.BuildingName}
                    helperText={touched.BuildingName && errors.BuildingName}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl
                    fullWidth
                    error={touched.floornumber && !!errors.floornumber}
                    sx={{ marginBottom: 3 }}
                    className={touched.floornumber && !!errors.floornumber ? 'shake' : ''}
                  >
                    <InputLabel>{t("floornumber")}</InputLabel>
                    <Select
                      name="floornumber"
                      value={formData.floornumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ backgroundColor: '#ffff' }}
                    >
                      <MenuItem value="">--Select--</MenuItem>
                      {tablesdata4.map((item) => (
                        <MenuItem key={item.FLOORNUMBERID} value={item.FLOORNUMBERID}>
                          {item.FLOORNUMBER_EN}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {touched.floornumber && errors.floornumber ? errors.floornumber : ''}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl
                    fullWidth
                    error={touched.features && !!errors.features}
                    sx={{ marginBottom: 3 }}
                    className={touched.features && !!errors.features ? 'shake' : ''}
                  >
                    <InputLabel>{t("UsageCategory")}</InputLabel>
                    <Select
                      name="features"
                      value={formData.features}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ backgroundColor: '#ffff' }}
                    >
                      <MenuItem value="">--Select--</MenuItem>
                      {tablesdata2.map((item) => (
                        <MenuItem key={item.FEATUREHEADID} value={item.FEATUREHEADID}>
                          {item.FEATUREHEADNAME_EN}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {touched.features && errors.features ? errors.features : ''}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl
                    fullWidth
                    error={touched.Typeofuse && !!errors.Typeofuse}
                    sx={{ marginBottom: 3 }}
                    className={touched.Typeofuse && !!errors.Typeofuse ? 'shake' : ''}
                  >
                    <InputLabel>{t("Typeofuse")}</InputLabel>
                    <Select
                      name="Typeofuse"
                      value={formData.Typeofuse}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ backgroundColor: '#ffff' }}
                    >
                      <MenuItem value="">--Select--</MenuItem>
                      {tablesdata3.map((item) => (
                        <MenuItem key={item.FEATUREID} value={item.FEATUREID}>
                          {item.FEATURENAME_EN}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {touched.Typeofuse && errors.Typeofuse ? errors.Typeofuse : ''}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label={t("YearUsage")}
                    placeholder='yyyy'

                    name="yearOfConstruction"
                    value={formData.yearOfConstruction}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touched.yearOfConstruction && !!errors.yearOfConstruction ? 'shake' : ''}
                    error={touched.yearOfConstruction && !!errors.yearOfConstruction}
                    helperText={touched.yearOfConstruction && errors.yearOfConstruction}
                    InputProps={{
                      maxLength: 4,
                      style: { backgroundColor: '#ffff' } ,
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

              </Grid>

              <Grid container spacing={4}>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label={t("SelfUseAreafts")}
                    name="SelfuseArea"
                    type="number"
                    value={formData.SelfuseArea}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touched.SelfuseArea && !!errors.SelfuseArea ? 'shake' : ''}
                    error={touched.SelfuseArea && !!errors.SelfuseArea}
                    helperText={touched.SelfuseArea && errors.SelfuseArea}
                    InputProps={{
                      style: { backgroundColor: '#ffff' } ,
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
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label={t("RentedAreafts")}
                    name="RentedArea"
                    type="number"
                    value={formData.RentedArea}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touched.RentedArea && !!errors.RentedArea ? 'shake' : ''}
                    error={touched.RentedArea && !!errors.RentedArea}
                    helperText={touched.RentedArea && errors.RentedArea}
                    InputProps={{
                      style: { backgroundColor: '#ffff' } ,
                      endAdornment: (
                        <Tooltip title={t("streetInfo")}>
                          <IconButton color="primary">
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    variant='filled'
                    label={t("TotalAreafts")}
                    name="TotalArea"
                    value={formData.TotalArea}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: true,
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
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    variant='filled'
                    label={t("SelfUseAreamts")}
                    name="SelfuseAreaMts"
                    value={formData.SelfuseAreaMts}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: true,
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
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    variant='filled'
                    label={t("RentedAreamts")}
                    name="RentedAreaMts"
                    value={formData.RentedAreaMts}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: true,
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
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    variant='filled'
                    label={t("TotalAreamts")}
                    name="TotalAreaMts"
                    value={formData.TotalAreaMts}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: true,
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
                {/* <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label={"BESCOM Customer ID :"}
                    name="BesomCustomerID"
                    value={formData.BesomCustomerID}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touched.BesomCustomerID && !!errors.BesomCustomerID ? 'shake' : ''}
                    error={touched.BesomCustomerID && !!errors.BesomCustomerID}
                    helperText={touched.BesomCustomerID && errors.BesomCustomerID}
                    InputProps={{
                      style: { backgroundColor: '#ffff' } ,
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
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label={"BWSSB Meter Number :"}
                    name="BWSSBMeterNumber"
                    value={formData.BWSSBMeterNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touched.BWSSBMeterNumber && !!errors.BWSSBMeterNumber ? 'shake' : ''}
                    error={touched.BWSSBMeterNumber && !!errors.BWSSBMeterNumber}
                    helperText={touched.BWSSBMeterNumber && errors.BWSSBMeterNumber}
                    InputProps={{
                      style: { backgroundColor: '#ffff' } ,
                      endAdornment: (
                        <Tooltip title={t("areaLocalityInfo")}>
                          <IconButton color="primary">
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      )
                    }}
                  />
                </Grid> */}
                
              
              <Grid item xs={20} sm={4}></Grid>
              <Grid item xs={16} sm={4}>
              <Button variant="contained" color="success" type="submit">
                 {t("Save+")}
                </Button>
                </Grid>
                <Grid item xs={12} sm={4}></Grid>
                </Grid>
              <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("BuildingNumber")}</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("BuildingName")}</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("floornumber")}</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("UsageCategory")}</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("Typeofuse")}</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("YearUsage")}</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("SelfUseArea")}</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("RentedArea")}</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("TotalArea")}</TableCell>
                      {/* <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>BESCOM Customer ID :</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>ಬಿ ಡಬ್ಲ್ಯೂ ಎಸ್ ಎಸ್ ಬಿ ಮೀಟರ್ ಸಂಖ್ಯೆ :</TableCell> */}
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("Edit")}</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("Delete")}</TableCell>
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
                      tableData.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.BUILDINGBLOCKID}</TableCell>
                          <TableCell>{row.BUILDINGBLOCKNAME}</TableCell>
                          <TableCell>{row.FLOORNUMBER}</TableCell>
                          <TableCell>{row.FEATUREHEADNAME}</TableCell>
                          <TableCell>{row.FEATURENAME}</TableCell>
                          <TableCell>{row.BUILTYEAR}</TableCell>
                          <TableCell>{row.AREA}</TableCell>
                          <TableCell>{row.RENTEDAREA}</TableCell>
                          <TableCell>{row.TOTALAREA}</TableCell>
                          {/* <TableCell>{row.ACCOUNTID}</TableCell>
                          <TableCell>{row.WATERMETERNO}</TableCell> */}
                          <TableCell>
                            <Tooltip title="Edit">
                              <IconButton color="primary" onClick={() => handleEdit(row)}>
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Delete">
                              <IconButton color="secondary" onClick={() => handleDelete(row)}>
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box display="flex" justifyContent="center" gap={2} mt={3}>
                <Button variant="contained" color="primary" onClick={back}>
                {t("Previous")}
                </Button>
                

                <Button variant="contained" color="primary" onClick={handleNavigation}>
                {t("next")}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default BuildingDetails;
