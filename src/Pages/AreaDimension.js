import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Grid, Box, Container, Typography, Tooltip, IconButton,
  Radio, RadioGroup, FormControlLabel, FormControl,
  MenuItem,
  Select,
  InputLabel
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../components/Axios';
const AreaDimension = () => {
  const [formData, setFormData] = useState({
    east: '',
    Bookeast:'',
    noofSides:"",
    west: '',
    north: '',
    south: '',
    ns: "",
    ew: "",
    plotAreaSqFt: "",
    plotAreaSqMt: "",
    Bookwest: '',
    Booknorth: '',
    Booksouth: '',
    Bookns: "",
    Bookew: "",
    BookplotAreaSqFt: "",
    BookplotAreaSqMt: "",
    builtUpAreaSqFt: "",
    builtUpAreaSqMt: "",
    modify: 'no',
    modifycheckbandi: 'no',
    oddSite: '',
    propertyType: "",
    ApartCarpetArea: "",
    ApartAddtionalArea: "",
    ApartSuperBuiltArea: "",
    cal1: "",
    cal2: "",
    cal3: "",
    cal4: "",
    cal5: "",
    cal6: "",
    cal7: "",
    cal8: "",
    cal9:"",
    cal10:"",
    sqFt: "",
    sqMt: ""
  });
  const { t } = useTranslation();
  const [isEditable, setIsEditable] = useState(false);
  const [isEditablecheckbandhi, setIsEditablecheckbandi] = useState(false);
  const navigate = useNavigate();
  const [isOddSiteEnabled, setIsOddSiteEnabled] = useState(false);
  const calculateArea = (numberOfSides, formData) => {
    
    // Extract the cal values dynamically based on the number of sides
    const values = Array.from({ length: numberOfSides }, (_, i) =>
      parseFloat(formData[`cal${i + 1}`])
    );
  
    // Check if all relevant values are greater than 0 and not NaN
    if (values.some(val => val <= 0 || isNaN(val))) {
      return { areaFt: '', areaMt: '' }; // Return empty if any value is invalid
    }
  
    let areaFt = 1;
  
    if (numberOfSides === 3) {
     
      const [a, b, c] = values;
      const s = (a + b + c) / 2;
      areaFt = Math.sqrt(s * (s - a) * (s - b) * (s - c));
      areaFt=Math.round(areaFt * 100) / 100;
    } else {
      
      const s = values.reduce((acc, val) => acc + val, 0) / 2;

      for (const side of values) {
          areaFt *= (s - side);
        }
      areaFt=Math.round(Math.sqrt(areaFt) * 100) / 100;
    }
  
    // Convert to meters (ft to m conversion)
    const areaMt = areaFt > 0 ? Math.round(areaFt * 0.092903 * 100) / 100 : '';
  
    return { areaFt, areaMt };
  };
  
  const handleChange = (e) => {

    const { name, value } = e.target;
    const updatedValue = parseFloat(value) || 0;
    
    if (name === 'ns' || name === 'ew') {
      const nsValue = name === 'ns' ? updatedValue : formData.ns;
      const ewValue = name === 'ew' ? updatedValue : formData.ew;
      if (nsValue !== 0 && ewValue !== 0) {
        const plotAreaSqFt = Math.round((nsValue > 0 ? nsValue : 1) * (ewValue > 0 ? ewValue : 1) * 100) / 100;
        const plotAreaSqMt = Math.round(plotAreaSqFt * 0.092903 * 100) / 100;
        formData.plotAreaSqFt = plotAreaSqFt;
        formData.plotAreaSqMt = plotAreaSqMt;
      }
      else {
        formData.plotAreaSqFt = 0;
        formData.plotAreaSqMt = 0;
      }
    }
    if (name.startsWith('cal')) {

const updatedFormData = {
  ...formData,
  [name]: value,
};
      const { areaFt, areaMt } = calculateArea(formData.noofSides, updatedFormData);

    
     formData.sqFt = areaFt;
     formData.sqMt = areaMt;
      
      setFormData(prevData => ({
        ...prevData,
       // sqFt: areaFt.toString(),
      //  sqMt: areaMt.toString()
      }));
    }
    if (name === 'modify' && value === 'yes') {
      setIsEditable(true);
    } else if (name === 'modify' && value === 'no') {
      setIsEditable(false);
    }
    if (name === 'modifycheckbandi' && value === 'yes') {
      setIsEditablecheckbandi(true);
    } else if (name === 'modifycheckbandi' && value === 'no') {
      setIsEditablecheckbandi(false);
    }
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const fetchData = async () => {
    
    try {
      const response = JSON.parse(sessionStorage.getItem('BBD_DRAFT_API'));
      const response2 = JSON.parse(sessionStorage.getItem('NCL_TEMP_API'));
      const {
        Table1: Table1Data = [],
        Table2: Table2Data = [],
        Table3: Table3Data = [],
        Table7: Table7Data = []
      } = response.data;
      const {
        Table1: NCLTable1Data = [],
        Table2: NCLTable2Data = [],
        Table3: NCLTable3Data = [],
        Table7: NCLTable7Data = []
      } = response2.data;
      setFormData((prevFormData) => ({
        ...prevFormData,
        propertyType: NCLTable1Data.length > 0 ? NCLTable1Data[0].PROPERTYCATEGORYID || "0" : "0",
        east: NCLTable1Data.length > 0 ? NCLTable1Data[0].CHECKBANDI_EAST : "",
        west: NCLTable1Data.length > 0 ? NCLTable1Data[0].CHECKBANDI_WEST || '' : '',
        north: NCLTable1Data.length > 0 ? NCLTable1Data[0].CHECKBANDI_NORTH || '' : '',
        south: NCLTable1Data.length > 0 ? NCLTable1Data[0].CHECKBANDI_SOUTH || ''  : '',
        ns: NCLTable3Data.length > 0 ? NCLTable3Data[0].NORTHSOUTH || '' : '',
        ew: NCLTable3Data.length > 0 ? NCLTable3Data[0].EASTWEST || '' : '',
        plotAreaSqFt: NCLTable2Data.length > 0 ? NCLTable2Data[0].SITEAREAFT || '' :  '',
        plotAreaSqMt: NCLTable2Data.length > 0 ? NCLTable2Data[0].SITEAREA || '' : '',
        Bookeast:  Table1Data.length > 0 ? Table1Data.CHECKBANDI_EAST || '' : '',
        Bookwest: Table1Data.length > 0 ? Table1Data.CHECKBANDI_WEST || '' : '',
        Booknorth: Table1Data.length > 0 ? Table1Data.CHECKBANDI_NORTH || '' : '',
        Booksouth:  Table1Data.length > 0 ? Table1Data.CHECKBANDI_SOUTH || '' : '',
        Bookns:  Table3Data.length > 0 ? Table3Data[0].NORTHSOUTH || '' : '',
        Bookew:  Table3Data.length > 0 ? Table3Data[0].EASTWEST || '' : '',
        BookplotAreaSqFt:  Table2Data.length > 0 ? Table2Data[0].SITEAREAFT || '' : '',
        BookplotAreaSqMt:  Table2Data.length > 0 ? Table2Data[0].SITEAREA || '' : '',
        builtUpAreaSqFt: NCLTable2Data.length > 0 ? NCLTable2Data[0].BUILDINGAREAFT || '' : Table2Data.length > 0 ? Table2Data[0].BUILDINGAREAFT || '' : '',
        builtUpAreaSqMt: NCLTable2Data.length > 0 ? NCLTable2Data[0].BUILDINGAREA || '' : Table2Data.length > 0 ? Table2Data[0].BUILDINGAREA || '' : '',
        ApartCarpetArea: NCLTable7Data.length > 0 ? NCLTable7Data[0].CARPETAREA || '' : Table7Data.length > 0 ? Table7Data[0].CARPETAREA || '' : '',
        ApartAddtionalArea: NCLTable7Data.length > 0 ? NCLTable7Data[0].ADDITIONALAREA || '' : Table7Data.length > 0 ? Table7Data[0].ADDITIONALAREA || '' : '',
        ApartSuperBuiltArea: NCLTable7Data.length > 0 ? NCLTable7Data[0].SUPERBUILTUPAREA || 0 : Table7Data.length > 0 ? Table7Data[0].SUPERBUILTUPAREA || '' : '',
        cal1: NCLTable3Data.length > 0 ? NCLTable3Data[0].EWODDSITE1FT || '' : Table3Data.length > 0 ? Table3Data[0].EWODDSITE1FT || '' : '',
        cal2: NCLTable3Data.length > 0 ? NCLTable3Data[0].EWODDSITE2FT || '' : Table3Data.length > 0 ? Table3Data[0].EWODDSITE1FT || '' : '',
        cal3: NCLTable3Data.length > 0 ? NCLTable3Data[0].EWODDSITE3FT || '': Table3Data.length > 0 ? Table3Data[0].EWODDSITE1FT || '' : '',
        cal4: NCLTable3Data.length > 0 ? NCLTable3Data[0].EWODDSITE4FT || '' : Table3Data.length > 0 ? Table3Data[0].EWODDSITE1FT || '' : '',
        cal5: NCLTable3Data.length > 0 ? NCLTable3Data[0].NSODDSITE1FT || '' : Table3Data.length > 0 ? Table3Data[0].NSODDSITE1FT || '' : '',
        cal6: NCLTable3Data.length > 0 ? NCLTable3Data[0].NSODDSITE2FT || '' : Table3Data.length > 0 ? Table3Data[0].NSODDSITE1FT || '' : '',
        cal7: NCLTable3Data.length > 0 ? NCLTable3Data[0].NSODDSITE3FT || '' : Table3Data.length > 0 ? Table3Data[0].NSODDSITE1FT || '' : '',
        cal8: NCLTable3Data.length > 0 ? NCLTable3Data[0].NSODDSITE4FT || '' : Table3Data.length > 0 ? Table3Data[0].NSODDSITE1FT || '' : '',
        cal9: NCLTable3Data.length > 0 ? NCLTable3Data[0].SIDE9 || '' : Table3Data.length > 0 ? Table3Data[0].SIDE9 || '' : '',
        cal10: NCLTable3Data.length > 0 ? NCLTable3Data[0].SIDE10 || '' : Table3Data.length > 0 ? Table3Data[0].SIDE10 || '' : '',
        noofSides: NCLTable3Data.length > 0 ? NCLTable3Data[0].ODDSITENOOFSIDES || '' : Table3Data.length > 0 ? Table3Data[0].ODDSITENOOFSIDES || '' : '',
        oddSite: NCLTable3Data.length > 0 ? NCLTable3Data[0].ODDSITE || '' : Table3Data.length > 0 ? Table3Data[0].ODDSITE || '' : '',
      }));
      
      if(NCLTable3Data.length > 0){
        if(NCLTable3Data[0].ODDSITE === "Y"){
          setIsOddSiteEnabled(true)
         
        }
        else {
          setIsOddSiteEnabled(false)
        }
      }
      else if(Table3Data.length > 0){
        if(Table3Data[0].ODDSITE === "Y"){
          setIsOddSiteEnabled(true)
          
        }
        else {
          setIsOddSiteEnabled(false)
        }
      }
    }
    catch (error) {
      navigate('/ErrorPage', { state: { errorMessage: error.message, errorLocation: window.location.pathname } });
    }
  }
  useEffect(  () => {
    fetchData();
  }, []);
  useEffect(() => {
    if (isOddSiteEnabled) {
      handleCalulationNCL(formData);
    }
  }, [formData, isOddSiteEnabled]);
  
  const handleCalulation = () => {
   
    const { areaFt, areaMt } = calculateArea(formData.noofSides, formData);
   formData.sqFt = areaFt;
   formData.sqMt = areaMt;
    setFormData(prevData => ({
      ...prevData,
     
    }));

  }
  const handleCalulationNCL = (TableData) => {
    
    const { areaFt, areaMt } = calculateArea(formData.noofSides, TableData);
    formData.sqFt = areaFt;
    formData.sqMt = areaMt;
        setFormData(prevData => ({
          ...prevData,
          sqFt: areaFt.toString(),
          sqMt: areaMt.toString()
         
        }));
    
      }
      const validateFormData = (formData) => {
        const errors = {};
      
        const isInvalid = (value) => value === '' || value === '0';
        if(formData.propertyType !== 3)
          {
        if (isInvalid(formData.east) || isInvalid(formData.west) || isInvalid(formData.north) || isInvalid(formData.south)) {
          errors.checkbandhi = 'Please ensure all Checkbandhi values are Entered.';
        }
      }
        if(formData.propertyType == 3){
        if (isInvalid(formData.ApartCarpetArea) || isInvalid(formData.ApartAddtionalArea) || isInvalid(formData.ApartSuperBuiltArea)) {
          errors.apartmentValues = 'Please ensure all Apartment values are Entered and More than 0.';
        }
      }
      
        if (formData.oddSite === "Y" && formData.propertyType !== 3) {
          for (let i = 1; i <= formData.noofSides ; i++) {
            if (isInvalid(formData[`cal${i}`])) {
              if(i == 1){
                errors[`cal${i}`] = `Please ensure Road Side Length is Entered and More than 0.`;
              }else {
                errors[`cal${i}`] = `Please ensure Length${i} value is Entered and More than 0.`;

              }
            }
          }
        } else {
          // Validate ns and ew
          if (isInvalid(formData.ns)) {
            errors.nsEw = 'Please ensure N-S (ft) values are Entered and More than 0.';
          }
          else if(isInvalid(formData.ew)) {
            errors.nsEw = 'Please ensure E-W (ft) values are Entered and More than 0.';
          }
        }
      
        return errors;
      };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateFormData(formData);

    if (Object.keys(validationErrors).length > 0) {
      const errorMessages = Object.values(validationErrors).join('\n');
      toast.error(errorMessages);
      return;
    }
    if (isEditablecheckbandhi === true && formData.propertyType !== 3) //only checkbandhi data
    {
      
      const checkbandhidata =
       {
        propertyCode: JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')),
        checkbandI_NORTH: formData.north,
        checkbandI_SOUTH: formData.south,
        checkbandI_EAST: formData.east,
        checkbandI_WEST: formData.west,
        loginId: "crc",
        p_BOOKS_PROP_APPNO: JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))
      }

      try {
        await axiosInstance.post('BBMPCITZAPI/UPD_NCL_PROPERTY_MAIN_TEMP_CHECKBANDI', checkbandhidata
        )

        const response1 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP?ULBCODE=555&P_BOOKS_PROP_APPNO=' + JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO')) + '&Propertycode=' + JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')) + '');
        sessionStorage.setItem('NCL_TEMP_API', JSON.stringify(response1));
        setIsEditablecheckbandi(false);
        setFormData({
          ...formData,
          modifycheckbandi: 'no',
        });
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
          navigate('/ErrorPage', { state: { errorMessage: error.message } });
        }, 2000);
      }
    }
   
    if ((formData.propertyType === 1 || formData.propertyType === 2)  && (isEditable))
     {
      const data = {
        propertyCode: JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')),
        evenoroddsite: formData.oddSite === "Y" ? "ODD" : "EVEN",
        sitearea: formData.plotAreaSqMt || null,
        siteareaft: formData.plotAreaSqFt || null,
        buildingarea: formData.builtUpAreaSqMt || null,
        buildingareaft: formData.builtUpAreaSqFt || null,
        eastwest: formData.ew.toString() || null,
        northsouth: formData.ns.toString() || null,
        ewoddsitE1FT: formData.cal1 || null,
        ewoddsitE2FT: formData.cal2 || null,
        ewoddsitE3FT: formData.cal3 || null,
        ewoddsitE4FT: formData.cal4 || null,
        nsoddsitE1FT: formData.cal5 || null,
        nsoddsitE2FT: formData.cal6 || null,
        nsoddsitE3FT: formData.cal7 || null,
        nsoddsitE4FT: formData.cal8 || null,
        sidE9:formData.cal9 || null,
        sidE10:formData.cal10 || null,
        oddSiteSides:formData.noofSides || null,
        loginId: "crc",
        p_BOOKS_PROP_APPNO: JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))
      };

      try {
        await axiosInstance.post('BBMPCITZAPI/UPD_NCL_PROPERTY_SITE_DIMENSION_TEMP', data
        )

        const response1 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP?ULBCODE=555&P_BOOKS_PROP_APPNO=' + JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO')) + '&Propertycode=' + JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')) + '');
        sessionStorage.setItem('NCL_TEMP_API', JSON.stringify(response1));

      
        setTimeout(async () => {
        
          setIsEditable(false);
          setIsEditablecheckbandi(false);
          setFormData({
            ...formData,
            modify: 'no',
            modifycheckbandi: 'no',
          });
        }, 1000);

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
          navigate('/ErrorPage', { state: { errorMessage: error.message } });
        }, 2000);
      }
    }
    else if (formData.propertyType === 3 && isEditable === true) //only 3
    {
      const data = {
        propertyCode: JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')),
        carpetarea: formData.ApartCarpetArea || null,
        additionalarea: formData.ApartAddtionalArea ||null,
        superbuiltuparea: formData.ApartSuperBuiltArea ||null,
        loginId: "crc",
        p_BOOKS_PROP_APPNO: JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))
      };

      try {
        await axiosInstance.post('BBMPCITZAPI/UPD_NCL_PROPERTY_APARTMENT_TEMP_AREA', data
        )
        const response1 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP?ULBCODE=555&P_BOOKS_PROP_APPNO=' + JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO')) + '&Propertycode=' + JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')) + '');
        sessionStorage.setItem('NCL_TEMP_API', JSON.stringify(response1));
      
        setTimeout(async () => {
        
          setIsEditable(false);
          setFormData({
            ...formData,
            modify: 'no',
          });
        }, 2000);

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
          navigate('/ErrorPage', { state: { errorMessage: error.message } });
        }, 2000);
      }
    }
    if(isEditable || isEditablecheckbandhi){
     toast.success(`${t("detailsSavedSuccess")}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
    setTimeout(() => {
    handleNavigation();
  }, 2000);
  };
  const back = () => {
    navigate('/AddressDetails')
  }
  const handleNavigation = () => {
    if(isEditable && isEditablecheckbandhi){
      toast.error(`${t("Please Save the Details Before Going to Next Section")}`)
      return
    }
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length > 0) {
      const errorMessages = Object.values(validationErrors).join('\n');
      toast.error(errorMessages);
      return;
    }
    if (formData.propertyType === 1) {
      navigate('/SiteDetails')
    } else if (formData.propertyType === 2) {
      navigate('/BuildingDetails')
    }
    else if (formData.propertyType === 3) {

      navigate('/MultiStoreyBuildingDetails')
    } else {

      toast.error(`${t("propertyTypeNotFound")}`);
      setTimeout(() => {
        navigate("/AddressDetails")
      }, 1000);

    }
  }
  const handleOddSiteChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === 'oddSite' && value === 'N') {
      setIsOddSiteEnabled(false);
     
    } else if (name === 'oddSite' && value === 'Y') {
      setIsOddSiteEnabled(true);
      handleCalulation()
    }
  }

  return (

    <Container maxWidth="lg">
      <Box sx={{ backgroundColor: '#f0f0f0', padding: 4, borderRadius: 2, mt: 8 }}>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              marginBottom: 3,
            }}
          >
            {t("PropertyUseDetails")}
          </Typography>

          {formData.propertyType === 3 && (
            <Grid container spacing={3}>

              <Grid item xs={6} sm={3}>
                <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
                  <RadioGroup row name="modify" value={formData.modify} onChange={handleChange}>
                    <FormControlLabel value="yes" control={<Radio />} label={t("Modify")} />
                    <FormControlLabel value="no" control={<Radio />} label={t("NoModifications")} />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  fullWidth
                  label={t("CarpetArea")}
                        
                  name="ApartCarpetArea"
                  value={formData.ApartCarpetArea}
                  onChange={handleChange}
                  type="number"
                  variant={isEditable ? "outlined" : "filled"}
                  InputProps={{
                    readOnly: !isEditable,
                    style: { backgroundColor: !isEditable ? '' : "#ffff" },
                    endAdornment: (
                      <Tooltip title="Calculated as N-S * E-W">
                        <IconButton>
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  fullWidth
                  label={t("AdditionalArea")}
                  
                  name="ApartAddtionalArea"
                  value={formData.ApartAddtionalArea}
                  onChange={handleChange}
                  type="number"
                  variant={isEditable ? "outlined" : "filled"}
                  InputProps={{
                    readOnly: !isEditable,
                    style: { backgroundColor: !isEditable ? '' : "#ffff" },
                    endAdornment: (
                      <Tooltip title="Calculated as N-S * E-W">
                        <IconButton>
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  fullWidth
                  label={t("SuperBuiltArea")}
                    
                  name="ApartSuperBuiltArea"
                  value={formData.ApartSuperBuiltArea}
                  onChange={handleChange}
                  type="number"
                  variant={isEditable ? "outlined" : "filled"}
                  InputProps={{
                    readOnly: !isEditable,
                    style: { backgroundColor: !isEditable ? '' : "#ffff" },
                    endAdornment: (
                      <Tooltip title="Calculated as N-S * E-W">
                        <IconButton>
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    )
                  }}
                />
              </Grid>

            </Grid>
          )}
          {(formData.propertyType === 1) && (
            <div>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Schedule Of The Property
              </Typography>
              <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
                <RadioGroup row name="modifycheckbandi" value={formData.modifycheckbandi} onChange={handleChange}>
                  <FormControlLabel value="yes" control={<Radio />} label={t("Modify")} />
                  <FormControlLabel value="no" control={<Radio />} label={t("NoModifications")} />
                </RadioGroup>
              </FormControl>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label={t("East")}
                    name="Bookeast"
                    value={formData.Bookeast}
                    onChange={handleChange}
                    variant={"filled"}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <Tooltip title="Converted from Sq.ft">
                          <IconButton>
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label={t("West")}
                    name="Bookwest"
                  
                    value={formData.Bookwest}
                    onChange={handleChange}
                     variant={"filled"}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <Tooltip title="Converted from Sq.ft">
                          <IconButton>
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label={t("North")}
                    name="Booknorth"
              
                    value={formData.Booknorth}
                    onChange={handleChange}
                     variant={"filled"}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <Tooltip title="Converted from Sq.ft">
                          <IconButton>
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label={t("South")}
                    name="Booksouth"
                   
                    value={formData.Booksouth}
                    onChange={handleChange}
                     variant={"filled"}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <Tooltip title="Converted from Sq.ft">
                          <IconButton>
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      )
                    }}
                  />
                </Grid>
              </Grid>
              <br></br>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label={t("East")}
                    name="east"
                    value={formData.east}
                    onChange={handleChange}
                    variant={isEditablecheckbandhi ? "outlined" : "filled"}
                    InputProps={{
                      readOnly: !isEditablecheckbandhi,
                      style: { backgroundColor: !isEditablecheckbandhi ? '' : "#ffff" },
                      endAdornment: (
                        <Tooltip title="Converted from Sq.ft">
                          <IconButton>
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label={t("West")}
                    name="west"
                  
                    value={formData.west}
                    onChange={handleChange}
                    variant={isEditablecheckbandhi ? "outlined" : "filled"}
                    InputProps={{
                      readOnly: !isEditablecheckbandhi,
                      style: { backgroundColor: !isEditablecheckbandhi ? '' : "#ffff" },
                      endAdornment: (
                        <Tooltip title="Converted from Sq.ft">
                          <IconButton>
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label={t("North")}
                    name="north"
              
                    value={formData.north}
                    onChange={handleChange}
                    variant={isEditablecheckbandhi ? "outlined" : "filled"}
                    InputProps={{
                      readOnly: !isEditablecheckbandhi,
                      style: { backgroundColor: !isEditablecheckbandhi ? '' : "#ffff" },
                      endAdornment: (
                        <Tooltip title="Converted from Sq.ft">
                          <IconButton>
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label={t("South")}
                    name="south"
                    value={formData.south}
                    onChange={handleChange}
                    variant={isEditablecheckbandhi ? "outlined" : "filled"}
                    InputProps={{
                      readOnly: !isEditablecheckbandhi,
                      style: { backgroundColor: !isEditablecheckbandhi ? '' : "#ffff" },
                      endAdornment: (
                        <Tooltip title="Converted from Sq.ft">
                          <IconButton>
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      )
                    }}
                  />
                </Grid>
              </Grid>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginY: 2 }}>
                Additional Details
              </Typography>
              <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
                <RadioGroup row name="modify" value={formData.modify} onChange={handleChange}>
                  <FormControlLabel value="yes" control={<Radio />} label={t("Modify")} />
                  <FormControlLabel value="no" control={<Radio />} label={t("NoModifications")} />
                </RadioGroup>
              </FormControl>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginY: 2 }}>
                Odd Site
              </Typography>
              <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
                <RadioGroup row name="oddSite" value={formData.oddSite} onChange={handleOddSiteChange}>
                  <FormControlLabel value="Y" control={<Radio disabled={!isEditable} />} label={t("Yes")} />
                  <FormControlLabel value="N" control={<Radio disabled={!isEditable} />} label={t("No")} />
                </RadioGroup>
              </FormControl>
              <Typography variant="h6" sx={{ fontWeight: 'bold', }}>
              </Typography>

              {(isOddSiteEnabled === false) && (
                
                <Grid container spacing={3}>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      fullWidth
                      label="N-S (ft)"
                      name="Bookns"
                      value={formData.Bookns}
                      onChange={handleChange}
                      type="number"
                      variant={ "filled"}
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <Tooltip title="Converted from Sq.ft">
                            <IconButton>
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      fullWidth
                      label="E-W (ft)"
                      name="Bookew"
                      value={formData.Bookew}
                      onChange={handleChange}
                      type="number"
                      variant={"filled"}
                      InputProps={{
                        readOnly: true,
                       
                        endAdornment: (
                          <Tooltip title="Converted from Sq.ft">
                            <IconButton>
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      fullWidth
                      label="PLOT AREA(N-S*E-W) (Sq.ft)"
                      name="BookplotAreaSqFt"
                      value={formData.BookplotAreaSqFt}
                      onChange={handleChange}
                      type="number"
                      variant={"filled"}
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <Tooltip title="Calculated as N-S * E-W">
                            <IconButton>
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      fullWidth
                      label="(Sq.Mt)"
                      name="BookplotAreaSqMt"
                      value={formData.BookplotAreaSqMt}
                      onChange={handleChange}
                      type="number"
                      variant={"filled"}
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <Tooltip title="Converted from Sq.ft">
                            <IconButton>
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        )
                      }}
                    />

                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      fullWidth
                      label="N-S (ft)"
                      name="ns"
                      value={formData.ns}
                      onChange={handleChange}
                      type="number"
                      variant={isEditable ? "outlined" : "filled"}
                      InputProps={{
                        readOnly: !isEditable,
                        style: { backgroundColor: !isEditable ? '' : "#ffff" },
                        endAdornment: (
                          <Tooltip title="Converted from Sq.ft">
                            <IconButton>
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      fullWidth
                      label="E-W (ft)"
                      name="ew"
                      value={formData.ew}
                      onChange={handleChange}
                      type="number"
                      variant={isEditable ? "outlined" : "filled"}
                      InputProps={{
                        readOnly: !isEditable,
                        style: { backgroundColor: !isEditable ? '' : "#ffff" },
                        endAdornment: (
                          <Tooltip title="Converted from Sq.ft">
                            <IconButton>
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      fullWidth
                      label="PLOT AREA(N-S*E-W) (Sq.ft)"
                      name="plotAreaSqFt"
                      value={formData.plotAreaSqFt}
                      onChange={handleChange}
                      type="number"
                      variant={"filled"}
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <Tooltip title="Calculated as N-S * E-W">
                            <IconButton>
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      fullWidth
                      label="(Sq.Mt)"
                      name="plotAreaSqMt"
                      value={formData.plotAreaSqMt}
                      onChange={handleChange}
                      type="number"
                      variant={"filled"}
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <Tooltip title="Converted from Sq.ft">
                            <IconButton>
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        )
                      }}
                    />

                  </Grid>
                </Grid>
              )}
            </div>
          )}
          {(formData.propertyType === 2) && (
            <div>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Schedule Of The Property
              </Typography>
              <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
                <RadioGroup row name="modifycheckbandi" value={formData.modifycheckbandi} onChange={handleChange}>
                  <FormControlLabel value="yes" control={<Radio />} label={t("Modify")} />
                  <FormControlLabel value="no" control={<Radio />} label={t("NoModifications")} />
                </RadioGroup>
              </FormControl>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label={t("East")}
                    name="Bookeast"
                   
                    value={formData.Bookeast}
                    onChange={handleChange}
                    variant={"filled"}
                    InputProps={{
                      readOnly: true,
                    
                      endAdornment: (
                        <Tooltip title="Converted from Sq.ft">
                          <IconButton>
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label={t("West")}
                    name="Bookwest"
                  
                    value={formData.Bookwest}
                    onChange={handleChange}
                    variant={"filled"}
                    InputProps={{
                      readOnly: true,
                     
                      endAdornment: (
                        <Tooltip title="Converted from Sq.ft">
                          <IconButton>
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label={t("North")}
                    name="Booknorth"
                  
                    value={formData.Booknorth}
                    onChange={handleChange}
                    variant={"filled"}
                    InputProps={{
                      readOnly: true,
                    
                      endAdornment: (
                        <Tooltip title="Converted from Sq.ft">
                          <IconButton>
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label={t("South")}
                    name="Booksouth"
                   
                    value={formData.Booksouth}
                    onChange={handleChange}
                    variant={"filled"}
                    InputProps={{
                      readOnly: true,
                   
                      endAdornment: (
                        <Tooltip title="Converted from Sq.ft">
                          <IconButton>
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      )
                    }}
                  />
                </Grid>
              </Grid>
              <br></br>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label={t("East")}
                    name="east"
                    value={formData.east}
                    onChange={handleChange}
                    variant={isEditablecheckbandhi ? "outlined" : "filled"}
                    InputProps={{
                      readOnly: !isEditablecheckbandhi,
                      style: { backgroundColor: !isEditablecheckbandhi ? '' : "#ffff" },
                      endAdornment: (
                        <Tooltip title="Converted from Sq.ft">
                          <IconButton>
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label={t("West")}
                    name="west"
                  
                    value={formData.west}
                    onChange={handleChange}
                    variant={isEditablecheckbandhi ? "outlined" : "filled"}
                    InputProps={{
                      readOnly: !isEditablecheckbandhi,
                      style: { backgroundColor: !isEditablecheckbandhi ? '' : "#ffff" },
                      endAdornment: (
                        <Tooltip title="Converted from Sq.ft">
                          <IconButton>
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label={t("North")}
                    name="north"
                  
                    value={formData.north}
                    onChange={handleChange}
                    variant={isEditablecheckbandhi ? "outlined" : "filled"}
                    InputProps={{
                      readOnly: !isEditablecheckbandhi,
                      style: { backgroundColor: !isEditablecheckbandhi ? '' : "#ffff" },
                      endAdornment: (
                        <Tooltip title="Converted from Sq.ft">
                          <IconButton>
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label={t("South")}
                    name="south"
                   
                    value={formData.south}
                    onChange={handleChange}
                    variant={isEditablecheckbandhi ? "outlined" : "filled"}
                    InputProps={{
                      readOnly: !isEditablecheckbandhi,
                      style: { backgroundColor: !isEditablecheckbandhi ? '' : "#ffff" },
                      endAdornment: (
                        <Tooltip title="Converted from Sq.ft">
                          <IconButton>
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      )
                    }}
                  />
                </Grid>
              </Grid>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginY: 2 }}>
                {t("AdditionalDetails")}
              </Typography>
              <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
                <RadioGroup row name="modify" value={formData.modify} onChange={handleChange}>
                  <FormControlLabel value="yes" control={<Radio />} label={t("Modify" )}/>
                  <FormControlLabel value="no" control={<Radio />} label={t("NoModifications")} />
                </RadioGroup>
              </FormControl>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginY: 2 }}>
                {t("OddSite")}
              </Typography>
              <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
                <RadioGroup row name="oddSite" value={formData.oddSite} onChange={handleOddSiteChange}>
                  <FormControlLabel value="Y" control={<Radio />} label={t("Yes")} />
                  <FormControlLabel value="N" control={<Radio />} label={t("No")} />
                </RadioGroup>
              </FormControl>
              <Typography variant="h6" sx={{ fontWeight: 'bold', }}>
              </Typography>

              {(isOddSiteEnabled === false) && (
                <Grid container spacing={3}>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      fullWidth
                      label="N-S (ft)"
                      name="ns"
                      value={formData.Bookns}
                      onChange={handleChange}
                      type="number"
                      variant={"filled"}
                      InputProps={{
                        readOnly: true,
                       
                        endAdornment: (
                          <Tooltip title="Converted from Sq.ft">
                            <IconButton>
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      fullWidth
                      label="E-W (ft)"
                      name="ew"
                      value={formData.Bookew}
                      onChange={handleChange}
                      type="number"
                      variant={"filled"}
                      InputProps={{
                        readOnly: true,
                       
                        endAdornment: (
                          <Tooltip title="Converted from Sq.ft">
                            <IconButton>
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      fullWidth
                      label="PLOT AREA(N-S*E-W)"
                      name="BookplotAreaSqFt"
                      value={formData.BookplotAreaSqFt}
                      onChange={handleChange}
                      type="number"
                      variant={"filled"}
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <Tooltip title="Calculated as N-S * E-W">
                            <IconButton>
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      fullWidth
                      label="Plot Area (Sq.Mt)"
                      name="BookplotAreaSqMt"
                      value={formData.BookplotAreaSqMt}
                      onChange={handleChange}
                      type="number"
                      variant={"filled"}
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <Tooltip title="Converted from Sq.ft">
                            <IconButton>
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      fullWidth
                      label="N-S (ft)"
                      name="ns"
                      value={formData.ns}
                      onChange={handleChange}
                      type="number"
                      variant={isEditable ? "outlined" : "filled"}
                      InputProps={{
                        readOnly: !isEditable,
                        style: { backgroundColor: !isEditable ? '' : "#ffff" },
                        endAdornment: (
                          <Tooltip title="Converted from Sq.ft">
                            <IconButton>
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      fullWidth
                      label="E-W (ft)"
                      name="ew"
                      value={formData.ew}
                      onChange={handleChange}
                      type="number"
                      variant={isEditable ? "outlined" : "filled"}
                      InputProps={{
                        readOnly: !isEditable,
                        style: { backgroundColor: !isEditable ? '' : "#ffff" },
                        endAdornment: (
                          <Tooltip title="Converted from Sq.ft">
                            <IconButton>
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      fullWidth
                      label="PLOT AREA(N-S*E-W)"
                      name="plotAreaSqFt"
                      value={formData.plotAreaSqFt}
                      onChange={handleChange}
                      type="number"
                      variant={"filled"}
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <Tooltip title="Calculated as N-S * E-W">
                            <IconButton>
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      fullWidth
                      label="Plot Area (Sq.Mt)"
                      name="plotAreaSqMt"
                      value={formData.plotAreaSqMt}
                      onChange={handleChange}
                      type="number"
                      variant={"filled"}
                      InputProps={{
                        readOnly: false,
                        endAdornment: (
                          <Tooltip title="Converted from Sq.ft">
                            <IconButton>
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      fullWidth
                      label={t("Built-UpArea(ft)")}
                      name="builtUpAreaSqFt"
                      value={formData.builtUpAreaSqFt}
                      onChange={handleChange}
                      type="number"
                      variant={"filled"}
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <Tooltip title="Converted from Sq.ft">
                            <IconButton>
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      fullWidth
                      label="(Sq.Mt)"
                      name="builtUpAreaSqMt"
                      value={formData.builtUpAreaSqMt}
                      onChange={handleChange}
                      type="number"
                      variant={"filled"}
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <Tooltip title="Converted from Sq.ft">
                            <IconButton>
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        )
                      }}
                    />
                  </Grid>
                </Grid>
              )}
            </div>

          )}
            {isOddSiteEnabled && formData.propertyType !== 3 && (
          <FormControl
                    fullWidth
                  >
                    <InputLabel>{t("NoofSides")}</InputLabel>
                    <Select
                      name="noofSides"
                      value={formData.noofSides}
                      onChange={handleChange}
                      inputProps={{ readOnly: !isEditable }}
                      sx={{backgroundColor: !isEditable? '' : "#ffff", width:"20%"}}
                    >
                      <MenuItem value="">--Select--</MenuItem>
                      {[3,4,5,6,7,8,9,10].map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                   
                  </FormControl>
            )}
                  <br></br>
                  <br></br>
                  <br></br>
          {isOddSiteEnabled && formData.propertyType !== 3 && (
            <Grid container spacing={3} alignItems="center" justifyContent="center">
              <Grid item>
                <Grid container spacing={1} alignItems="center" justifyContent="center">
                  <Grid item>
                  {Array.from({ length: formData.noofSides }).map((_, index) => (
                    <TextField
                      key={index}
                      variant={isEditable ? "outlined" : "filled"}
                      placeholder={index + 1  === 1? `${t("RoadFacedSideLength")}` : `${t("Length")} ${index + 1} (Ft)` }
                      name={`cal${index + 1}`}
                      type="number"
                      value={formData[`cal${index + 1}`] || ''}
                      onChange={handleChange}
                      sx={{ width: '31.3%', borderColor: '#016767' ,paddingRight:'2%',paddingTop:"1%" }}
                      InputProps={{
                        readOnly: !isEditable,
                        style: { backgroundColor: !isEditable ? '' : "#ffff" },
                      }}
                    />
                  ))}
                  </Grid>
                </Grid>
              </Grid>
{formData.noofSides && (
              <Grid item>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <Typography>Sq.Ft.</Typography>
                  </Grid>
                  <Grid item>
                  <TextField
                      variant="filled"
                      size="medium"
                      name="sqFt"
                      type="number"
                      value={formData.sqFt}
                      onChange={handleChange}
                      sx={{ width: '300px', borderColor: '#016767' }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
                  </Grid>
                  <Grid item>
                     <Typography>Sq.Mt.</Typography>
                  </Grid>
                  <Grid item>
                     <TextField
                      variant="filled"
                      size="medium"
                      name="sqMt"
                      type="number"
                      value={formData.sqMt}
                      onChange={handleChange}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ width: '300px', borderColor: '#016767' }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              )}
            </Grid>
                    
          )}

          <Box display="flex" justifyContent="center" gap={2} mt={3}>
            <Button variant="contained" color="primary" onClick={back}>
            {t("Previous")}
            </Button>
            <Button variant="contained" color="success" type="submit">
              {t("save")}
            </Button>
            
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AreaDimension;
