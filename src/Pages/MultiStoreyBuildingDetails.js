import React, { useState } from 'react';
import {
  TextField, Button, Grid, Box, Container, Typography, Tooltip, IconButton, FormHelperText,
  FormControl, MenuItem, Select, InputLabel, Radio, RadioGroup, FormControlLabel,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../components/Axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import '../components/Shake.css';
import LabelWithAsterisk   from '../components/LabelWithAsterisk'
const MultiStoreyBuildingDetails = () => {
  const [ownersharetype, setOwnerSharetype] = useState("")
  const [formData, setFormData] = useState({

    BlockName: '',
    FlatNos: '',
    floornumber: '',
    features: '',
    Typeofuse: '',
    yearOfConstruction: '',
    Totalnumberofparkingunits: '',
    TotalParkingArea: '',
    Occupancy: '',
    BesomCustomerID: '',
    SelectOwnerShareType: '0',
    OwnersShareAreaSqmts: "",
    ParkingFacility: 'N',
  });
  const { t } = useTranslation();
  const validationSchema = Yup.object().shape({
    BlockName: Yup.string().required(`${t('blockNumberRequired')}`),
    FlatNos: Yup.string().required(`${t('flatNumberRequired')}`),
    floornumber: Yup.string().required(`${t('floorNumberRequired')}`),
    features: Yup.string().required(`${t('usageCategoryRequired')}`),
    yearOfConstruction: Yup.string()
    .required(`${t('yearUsageRequired')}`).notOneOf(['0000'], 'Year Usage cannot be all 0')
    .matches(/^[1-9]\d{3}$/, `${t("yearUsageRequiredInvalid")}`),
    Typeofuse: Yup.string().required(`${t('typeOfUseRequired')}`),
    Occupancy: Yup.string().required(`${t('occupancyRequired')}`),
    OwnersShareAreaSqmts: Yup.string().required(`${t('ownerShareAreaRequired')}`),
    SelectOwnerShareType: Yup.string().required(`${t('ownerShareTypeRequired')}`),
  //  BesomCustomerID: Yup.string().required('Bescom Customer ID is required'),
  });
  const [tableData, setTableData] = useState([
  ]);

  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);
  const [isInitialEditable,setInitialEditable] = useState(false);
  const [tablesdata2, setTablesData2] = useState([]);
  const [tablesdata3, setTablesData3] = useState([]);
  const [tablesdata4, setTablesData4] = useState([]);
  const [tablesdata6, setTablesData6] = useState([]);



  const handleChange = async (e) => {

    const { name, value } = e.target;
    if (name === 'ParkingFacility' && value === 'Y') {
      setIsEditable(true);
    } else if (name === 'ParkingFacility' && value === 'N') {
      setIsEditable(false);
    }
    if (name === "SelectOwnerShareType" && value !== '0') {
      if (name === "SelectOwnerShareType" && value === '1') {
        setOwnerSharetype("Owner Share Area(in Sq.mts.) :")

      }
      else if (name === "SelectOwnerShareType" && value === '2') {
        setOwnerSharetype("Owners Share Percent (in Percentile) : ")

      }
      else if (name === "SelectOwnerShareType" && value === '3') {
        setOwnerSharetype("Owner Share Number : ")

      }
    }
    if (name === "features") {
      try {
        
        if (value !== "") {
          const response = await axiosInstance.get(`BBMPCITZAPI/GetNPMMasterTable?FeaturesHeadID=${value}`);
          if (response.data.Table.length > 0) {
            setTablesData3(response.data.Table);
          }
        }
      } catch (error) {
        toast.error(`${t("errorSavingData")}`, error, {
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
const handleEdit = () => {
  if(isInitialEditable)
    {
    setInitialEditable(false);
  }
  else {
    setInitialEditable(true);
  }
}
  const fetchData = async () => {
    try {
      
      const response1 = await axiosInstance.get('BBMPCITZAPI/GetMasterTablesData_React?UlbCode=555&Page=MULTI_STOREY_DETAILS');
      const response2 = await axiosInstance.get(`BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_BBD_DRAFT_React?ULBCODE=555&P_BOOKS_PROP_APPNO=${JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))}&Propertycode=${JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))}&Page=MULTI_STOREY_DETAILS`);
      const response3 = await axiosInstance.get(`BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP_React?ULBCODE=555&P_BOOKS_PROP_APPNO=${JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))}&Propertycode=${JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))}&Page=MULTI_STOREY_DETAILS`);;
      const { Table1:MasterTable1 = [], Table2:MasterTable2 = [], Table3:MasterTable3 = [] } = response1.data;
      const { Table1:BBDTable1 = [] } = response2.data;
      const { Table1:NCLTABLE1 = [] } = response3.data;
      if(NCLTABLE1.length === 0){
        setInitialEditable(true);
      }
      const table1Item = BBDTable1.length > 0 ? BBDTable1 : [];
      const table13Item = NCLTABLE1.length > 0 ? NCLTABLE1[0] : [];
      const table16Item = MasterTable2.length > 0 ? MasterTable2 : [];
      const table15Item = MasterTable1.length > 0 ? MasterTable1 : [];
      const table17Item = MasterTable3.length > 0 ? MasterTable3 : [];

      setTableData(table1Item);
      setTablesData2(table16Item);
      setTablesData4(table15Item);
      setTablesData6(table17Item);
      var sharetype = "0";
      var ownersharetypeValue = "";

      if (table13Item.PLOTAREAOWNERSHARE_AREA !== 0) {
        ownersharetypeValue = table13Item.PLOTAREAOWNERSHARE_AREA
        sharetype = "1";
        setOwnerSharetype("Owner Share Area(in Sq.mts.) :")
      }
      else if (table13Item.PLOTAREAOWNERSHARE_FRACTION !== 0) {
        ownersharetypeValue = table13Item.PLOTAREAOWNERSHARE_FRACTION
        sharetype = "3";
          setOwnerSharetype("Owner Share Number : ")
      }
      else if (table13Item.PLOTAREAOWNERSHARE_NOS !== 0) {
        ownersharetypeValue = table13Item.PLOTAREAOWNERSHARE_NOS
        sharetype = "2";
    setOwnerSharetype("Owners Share Percent (in Percentile) : ")
      }
      else {
        ownersharetypeValue = ""
        sharetype = "0";
      }
      if (table13Item.FEATUREHEADID !== null && table13Item.FEATUREHEADID !== "" && table13Item.FEATUREHEADID !== undefined) {

        const response3 = await axiosInstance.get(`BBMPCITZAPI/GetNPMMasterTable?FeaturesHeadID=${table13Item.FEATUREHEADID}`);
        if (response3.data.Table.length > 0) {
          setTablesData3(response3.data.Table);
        }
      }
      if (table13Item.PARKINGAVAILABLE === "Y") {
        setIsEditable(true);
      }
      setFormData({
        BlockName: table13Item.BLOCKNUMBER || '',
        FlatNos: table13Item.FLATNO || '',
        floornumber: table13Item.FLOORNUMBERID || '',
        features: table13Item.FEATUREHEADID || '',
        Typeofuse: table13Item.FEATUREID || '',
        yearOfConstruction: table13Item.BUILTYEAR || '',
        Totalnumberofparkingunits: table13Item.PARKINGUNITS || '',
        TotalParkingArea: table13Item.PARKINGAREA || '',
        Occupancy: table13Item.BUILDINGUSAGETYPEID || '',
        BesomCustomerID: table13Item.RRNO || '',
        SelectOwnerShareType: sharetype || '',
        OwnersShareAreaSqmts: ownersharetypeValue || '',
        ParkingFacility: table13Item.PARKINGAVAILABLE || 'N',
      });
    } catch (error) {
      toast.error(`${t("errorSavingData")}`, error, {
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

  }
  React.useEffect(() => {

    fetchData();

  }, []);
  const handleSubmit = async (e) => {

if(isEditable || isInitialEditable){
    const data = {
      propertyCode: JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')),
      plotareaownersharE_AREA: formData.SelectOwnerShareType === "1" ? formData.OwnersShareAreaSqmts : 0,
      plotareaownersharE_NOS: formData.SelectOwnerShareType === "2" ? formData.OwnersShareAreaSqmts : 0,
      plotareaownersharE_FRACTION: formData.SelectOwnerShareType === "3" ? formData.OwnersShareAreaSqmts : 0,
      parkingavailable: formData.ParkingFacility || null,
      parkingunits:  formData.ParkingFacility === "Y" ? formData.Totalnumberofparkingunits || null : 0,
      blocknumber: formData.BlockName,
      flatno: formData.FlatNos,
      parkingarea: formData.ParkingFacility === "Y" ? formData.TotalParkingArea || null: "0",
      buildingusagetypeid: formData.Occupancy,
      ulbcode: 555,
      rrno: formData.BesomCustomerID,
      yearofconstruction: formData.yearOfConstruction,
      floornumberid: formData.floornumber,
      featureid: formData.Typeofuse,
      featureheadid: formData.features,
      p_BOOKS_PROP_APPNO: JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))
    };

    try {
      await axiosInstance.post('BBMPCITZAPI/INS_UPD_NCL_PROPERTY_APARTMENT_TEMP1?ULBCODE=555', data
      )

      const response1 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP?ULBCODE=555&P_BOOKS_PROP_APPNO=' + JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO')) + '&Propertycode=' + JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')) + '');
      
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
        setIsEditable(false);
        setInitialEditable(false);
        handleNavigation();
      }, 500);
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
      }, 500);
    }
  }
  else {
    handleNavigation()
  }
  }
  const back = () => {
    navigate('/AreaDimension');
  };

  const handleNavigation = () => {

    navigate('/OwnerDetails');

  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
    }
  };
 

  return (
    <Container maxWidth="xl">
      <ToastContainer />
      <Box sx={{ backgroundColor: '#f0f0f0', padding: 4, borderRadius: 2, mt: 8 }}>
        <Formik
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange={handleChange}
          enableReinitialize
        >
          {({ errors, touched, handleBlur }) => (
             <Form onKeyDown={handleKeyDown}>
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
              {t("DetailsOfUsageOfFlat")}
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    
                    label={<LabelWithAsterisk text={t('BlockName')} />}
                    name="BlockName"
                    value={formData.BlockName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touched.BlockName && !!errors.BlockName ? 'shake' : ''}
                    error={touched.BlockName && !!errors.BlockName}
                    helperText={touched.BlockName && errors.BlockName}
                    InputProps={{
                      style: { backgroundColor:  !isInitialEditable ? '': "#ffff" } ,
                      readOnly: !isInitialEditable,
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
                  <FormControl
                    fullWidth
                    error={touched.floornumber && !!errors.floornumber}
                    sx={{ marginBottom: 3 }}
                    className={touched.floornumber && !!errors.floornumber ? 'shake' : ''}
                  >
                    <InputLabel><LabelWithAsterisk text={t('floornumber')} /></InputLabel>
                    <Select
                      name="floornumber"
                      value={formData.floornumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ backgroundColor: !isInitialEditable?  '':"#ffff" }}
                      inputProps={{ readOnly: !isInitialEditable }}
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
                  <TextField
                    fullWidth
                  
                    label={<LabelWithAsterisk text={t('FlatNo')} />}
                    name="FlatNos"
                    value={formData.FlatNos}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touched.FlatNos && !!errors.FlatNos ? 'shake' : ''}
                    error={touched.FlatNos && !!errors.FlatNos}
                    helperText={touched.FlatNos && errors.FlatNos}
                    InputProps={{
                      style: { backgroundColor:  !isInitialEditable ? '': "#ffff" } ,
                      readOnly: !isInitialEditable,
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
                  <FormControl
                    fullWidth
                    error={touched.features && !!errors.features}
                    sx={{ marginBottom: 3 }}
                    className={touched.features && !!errors.features ? 'shake' : ''}
                  >
                    <InputLabel><LabelWithAsterisk text={t('UsageCategory')} /></InputLabel>
                    <Select
                      name="features"
                      value={formData.features}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ backgroundColor: !isInitialEditable?  '':"#ffff" }}
                      inputProps={{ readOnly: !isInitialEditable }}
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
                    <InputLabel> <LabelWithAsterisk text={t('Typeofuse')} /></InputLabel>
                    <Select
                      name="Typeofuse"
                      value={formData.Typeofuse}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ backgroundColor: !isInitialEditable?  '':"#ffff" }}
                      inputProps={{ readOnly: !isInitialEditable }}
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
                   
                    label={<LabelWithAsterisk text={t('YearUsage')} />}
                    name="yearOfConstruction"
                    value={formData.yearOfConstruction}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touched.yearOfConstruction && !!errors.yearOfConstruction ? 'shake' : ''}
                    error={touched.yearOfConstruction && !!errors.yearOfConstruction}
                    helperText={touched.yearOfConstruction && errors.yearOfConstruction}
                    InputProps={{
                      style: { backgroundColor:  isInitialEditable ? '#ffff': "" } ,
                      readOnly: !isInitialEditable,
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
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {t("ParkingFacility")} 
                  </Typography>
                  <FormControl component="ParkingFacility" sx={{ marginBottom: 3 }}>
                    <RadioGroup row name="ParkingFacility" value={formData.ParkingFacility} onChange={handleChange}>
                      <FormControlLabel value="Y" control={<Radio />} label={t("Yes")} />
                      <FormControlLabel value="N" control={<Radio />} label={t("No")} />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    variant={isEditable ? "outlined" : "filled"}
                    label={t("Totalnumberofparkingunits")}
                    name="Totalnumberofparkingunits"
                  
                    type='number'
                    value={formData.Totalnumberofparkingunits}
                    onChange={handleChange}
                    InputProps={{
                      style: { backgroundColor: isEditable && isInitialEditable? '#ffff' : '' },
                      readOnly: (isEditable && isInitialEditable ? false :true),
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
                    variant={isEditable ? "outlined" : "filled"}
                    label={t("TotalParkingArea")}
                    
                    name="TotalParkingArea"
                    type='number'
                    value={formData.TotalParkingArea}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: (isEditable && isInitialEditable ? false :true),
                      style: { backgroundColor: isEditable && isInitialEditable? '#ffff' : '' },
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
                  <FormControl
                    fullWidth
                    error={touched.Occupancy && !!errors.Occupancy}
                    sx={{ marginBottom: 3 }}
                    className={touched.Occupancy && !!errors.Occupancy ? 'shake' : ''}
                  >
                    <InputLabel><LabelWithAsterisk text={t('Occupancy')} /></InputLabel>
                    <Select
                      name="Occupancy"
                      value={formData.Occupancy}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputProps={{ readOnly: !isInitialEditable }}
                      sx={{ backgroundColor: !isInitialEditable?  '':"#ffff" }}
                    >
                      <MenuItem value="">--Select--</MenuItem>
                      {tablesdata6.map((item) => (
                        <MenuItem key={item.BUILDINGUSAGETYPEID} value={item.BUILDINGUSAGETYPEID}>
                          {item.BUILDINGUSAGETYPE_EN}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {touched.Occupancy && errors.Occupancy ? errors.Occupancy : ''}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                {/* <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label={"BESCOM Customer ID :"}
                    name="BesomCustomerID"
                    type="number"
                    value={formData.BesomCustomerID}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touched.BesomCustomerID && !!errors.BesomCustomerID ? 'shake' : ''}
                    error={touched.BesomCustomerID && !!errors.BesomCustomerID}
                    helperText={touched.BesomCustomerID && errors.BesomCustomerID}
                    InputProps={{
                      style: { backgroundColor:  isInitialEditable ? '#ffff': "" } ,
                      readOnly: !isInitialEditable,
                      endAdornment: (
                        <Tooltip title={t("pincodeInfo")}>
                          <IconButton color="primary">
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      )
                    }}
                  />
                </Grid> */}
                <Grid item xs={12} sm={4}>
                  <FormControl
                    fullWidth
                    error={touched.SelectOwnerShareType && !!errors.SelectOwnerShareType}
                    sx={{ marginBottom: 3 }}
                    className={touched.SelectOwnerShareType && !!errors.SelectOwnerShareType ? 'shake' : ''}
                  >
                    <InputLabel><LabelWithAsterisk text={t('SelectOwnerShareType')} /></InputLabel>
                    <Select
                      name="SelectOwnerShareType"
                      value={formData.SelectOwnerShareType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputProps={{ readOnly: !isInitialEditable }}
                      sx={{ backgroundColor: !isInitialEditable?  '':"#ffff" }}
                    >
                      <MenuItem value="">--Select--</MenuItem>
                      <MenuItem value="1">ಮಾಲೀಕರ ಹಕ್ಕಿನ ವಿಸ್ತೀರ್ಣ / Owner Share Area</MenuItem>
                      <MenuItem value="2">ಮಾಲೀಕರ ಹಕ್ಕಿನ ಶೇಕಡವಾರು / Owner Share Percent</MenuItem>
                      <MenuItem value="3">ಮಾಲೀಕರ ಹಕ್ಕಿನ ಪ್ರಮಾಣಪತ್ರಗಳ ಸಂಖ್ಯೆ / Owner Share Number</MenuItem>
                    </Select>
                    <FormHelperText>
                      {touched.SelectOwnerShareType && errors.SelectOwnerShareType ? errors.SelectOwnerShareType : ''}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                  
                    label={<LabelWithAsterisk text={ownersharetype} />}
                    name="OwnersShareAreaSqmts"
                    value={formData.OwnersShareAreaSqmts}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touched.OwnersShareAreaSqmts && !!errors.OwnersShareAreaSqmts ? 'shake' : ''}
                    error={touched.OwnersShareAreaSqmts && !!errors.OwnersShareAreaSqmts}
                    helperText={touched.OwnersShareAreaSqmts && errors.OwnersShareAreaSqmts}
                    type='number'
                    InputProps={{
                      style: { backgroundColor:  isInitialEditable ? '#ffff': "" } ,
                      readOnly:!isInitialEditable,
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
                
              </Grid>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {t("DataAvailableInBBMPBooks")} 
              </Typography>
              <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table>
                  <TableHead>
                    <TableRow>

                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("BLOCKNO")}</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("FLOORNO")}</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("FlatNo")}</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("CARPETAREA")}</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("ADDITIONALAREA")}</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("SUPERBUILTUPAREA")}</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("PARKINGAVAILABLE")}</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("PARKINGUNITS")}</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("PARKINGAREA")}</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("OWNERSHARETYPE")}</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("SHARETYPEVALUE")}</TableCell>
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
                          <TableCell>{row.BLOCKNUMBER}</TableCell>
                          <TableCell>{row.FLOORNUMBERID}</TableCell>
                          <TableCell>{row.FLATNO}</TableCell>
                          <TableCell>{row.CARPETAREA}</TableCell>
                          <TableCell>{row.ADDITIONALAREA}</TableCell>
                          <TableCell>{row.SUPERBUILTUPAREA}</TableCell>
                          <TableCell>{row.PARKINGAVAILABLE}</TableCell>
                          <TableCell>{row.PARKINGAREA}</TableCell>
                          <TableCell>{row.SHARETYPE}</TableCell>
                          <TableCell>{row.SHARETYPEVALUE}</TableCell>
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
                <Button variant="contained" color="primary" onClick={handleEdit}>
                {t("Edit")}
                </Button>
                <Button variant="contained" color="success" type="submit">
                {t('save')}
                </Button>

               
           
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default MultiStoreyBuildingDetails;
