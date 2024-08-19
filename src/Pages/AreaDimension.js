import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Grid, Box, Container, Typography, Tooltip, IconButton,
  Radio, RadioGroup, FormControlLabel, FormControl
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
//import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../components/Axios';
const AreaDimension = () => {
  const [formData, setFormData] = useState({
    east: '',
    west: '',
    north: '',
    south: '',
    ns: "",
    ew: "",
    plotAreaSqFt: "",
    plotAreaSqMt: "",
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
    sqFt: "",
    sqMt: ""
  });
  
  const [isEditable, setIsEditable] = useState(false);
  const [isEditablecheckbandhi, setIsEditablecheckbandi] = useState(false);
  const navigate = useNavigate();
  const [isOddSiteEnabled, setIsOddSiteEnabled] = useState(false);
  const handleChange = (e) => {
debugger
    const { name, value } = e.target;
    const updatedValue = parseFloat(value) || 0;
    debugger
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

      const { cal1, cal2, cal3, cal4, cal5, cal6, cal7, cal8 } = {
        ...formData,
        [name]: value
      };
      const areaFt = Math.round((
        (parseFloat(cal1) || 1) *
        (parseFloat(cal2) || 1) *
        (parseFloat(cal3) || 1) /
        (parseFloat(cal4) || 1)
      ) *
        (
          (parseFloat(cal5) || 1) *
          (parseFloat(cal6) || 1) *
          (parseFloat(cal7) || 1) /
          (parseFloat(cal8) || 1)
        ) * 100) / 100;

      const areaMt = areaFt > 0 ? Math.round(areaFt * 0.092903 * 100) / 100 : 0;
      if(areaFt === 1 && areaMt === 0.09){
        formData.sqFt = "";
     formData.sqMt = "";
      }
      else {
     formData.sqFt = areaFt;
     formData.sqMt = areaMt;
      }
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
    debugger
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
        east: NCLTable1Data.length > 0 ? NCLTable1Data[0].CHECKBANDI_EAST || '' : Table1Data.length > 0 ? Table1Data.CHECKBANDI_EAST || '' : '',
        west: NCLTable1Data.length > 0 ? NCLTable1Data[0].CHECKBANDI_WEST || '' : Table1Data.length > 0 ? Table1Data.CHECKBANDI_WEST || '' : '',
        north: NCLTable1Data.length > 0 ? NCLTable1Data[0].CHECKBANDI_NORTH || '' : Table1Data.length > 0 ? Table1Data.CHECKBANDI_NORTH || '' : '',
        south: NCLTable1Data.length > 0 ? NCLTable1Data[0].CHECKBANDI_SOUTH || '' : Table1Data.length > 0 ? Table1Data.CHECKBANDI_SOUTH || '' : '',
        ns: NCLTable3Data.length > 0 ? NCLTable3Data[0].NORTHSOUTH || '' : Table3Data.length > 0 ? Table3Data[0].NORTHSOUTH || '' : '',
        ew: NCLTable3Data.length > 0 ? NCLTable3Data[0].EASTWEST || '' : Table3Data.length > 0 ? Table3Data[0].EASTWEST || '' : '',
        plotAreaSqFt: NCLTable2Data.length > 0 ? NCLTable2Data[0].SITEAREAFT || '' : Table2Data.length > 0 ? Table2Data[0].SITEAREAFT || '' : '',
        plotAreaSqMt: NCLTable2Data.length > 0 ? NCLTable2Data[0].SITEAREA || '' : Table2Data.length > 0 ? Table2Data[0].SITEAREA || '' : '',
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
        oddSite: NCLTable3Data.length > 0 ? NCLTable3Data[0].ODDSITE || '' : Table3Data.length > 0 ? Table3Data[0].ODDSITE || '' : '',
      }));
      if(NCLTable3Data.length > 0){
        if(NCLTable3Data[0].ODDSITE === "Y"){
          setIsOddSiteEnabled(true)
          handleCalulationNCL(NCLTable3Data[0])
        }
        else {
          setIsOddSiteEnabled(false)
        }
      }else if(Table3Data.length > 0){
        if(Table3Data[0].ODDSITE === "Y"){
          setIsOddSiteEnabled(true)
          handleCalulationNCL(Table3Data[0])
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
  const handleCalulation = () => {
debugger
    const areaFt = Math.round((
      (parseFloat(formData.cal1) || 1) *
      (parseFloat(formData.cal2) || 1) *
      (parseFloat(formData.cal3) || 1) /
      (parseFloat(formData.cal4) || 1)
    ) *
      (
        (parseFloat(formData.cal5) || 1) *
        (parseFloat(formData.cal6) || 1) *
        (parseFloat(formData.cal7) || 1) /
        (parseFloat(formData.cal8) || 1)
      ) * 100) / 100;

    const areaMt = areaFt > 0 ? Math.round(areaFt * 0.092903 * 100) / 100 : 0;
    if(areaFt === 1 && areaMt === 0.09){
      formData.sqFt = "";
   formData.sqMt = "";
    }
    else {
   formData.sqFt = areaFt;
   formData.sqMt = areaMt;
    }
    // formData.sqFt = "";
    // formData.sqMt = "";
    setFormData(prevData => ({
      ...prevData,
     // sqFt: areaFt.toString(),
     // sqMt: areaMt.toString()
      // sqFt: "",
      // sqMt: ""
    }));

  }
  const handleCalulationNCL = (TableData) => {
    debugger
        const areaFt = Math.round((
          (parseFloat(TableData.EWODDSITE1FT) || 1) *
          (parseFloat(TableData.EWODDSITE2FT) || 1) *
          (parseFloat(TableData.EWODDSITE3FT) || 1) /
          (parseFloat(TableData.EWODDSITE4FT) || 1)
        ) *
          (
            (parseFloat(TableData.NSODDSITE1FT) || 1) *
            (parseFloat(TableData.NSODDSITE2FT) || 1) *
            (parseFloat(TableData.NSODDSITE3FT) || 1) /
            (parseFloat(TableData.NSODDSITE4FT) || 1)
          ) * 100) / 100;
    
        const areaMt = areaFt > 0 ? Math.round(areaFt * 0.092903 * 100) / 100 : 0;
        if(areaFt === 1 && areaMt === 0.09){
          formData.sqFt = "";
       formData.sqMt = "";
        }
        else {
       formData.sqFt = areaFt;
       formData.sqMt = areaMt;
        }
        // formData.sqFt = "";
        // formData.sqMt = "";
        setFormData(prevData => ({
          ...prevData,
          sqFt: areaFt.toString(),
          sqMt: areaMt.toString()
         
        }));
    
      }
  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger
    if (isEditablecheckbandhi === true && formData.propertyType !== 3) //only checkbandhi data
    {
      const checkbandhidata = {
        propertyCode: JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')),
        checkbandI_NORTH: formData.east,
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
        await toast.error("Error saving data!" + error, {
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
   
    if ((formData.propertyType === 1 || formData.propertyType === 2)  && (isEditable)
      //only below data
    ) {
      const data = {
        propertyCode: JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')),
        evenoroddsite: formData.oddSite || null,
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
        loginId: "crc",
        p_BOOKS_PROP_APPNO: JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))
      };

      try {
        await axiosInstance.post('BBMPCITZAPI/UPD_NCL_PROPERTY_SITE_DIMENSION_TEMP', data
        )

        const response1 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP?ULBCODE=555&P_BOOKS_PROP_APPNO=' + JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO')) + '&Propertycode=' + JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')) + '');
        sessionStorage.setItem('NCL_TEMP_API', JSON.stringify(response1));

      
        setTimeout(async () => {
         // await fetchData();
          //    handleNavigation()
          setIsEditable(false);
          setIsEditablecheckbandi(false);
          setFormData({
            ...formData,
            modify: 'no',
            modifycheckbandi: 'no',
          });
        }, 1000);

      } catch (error) {
        await toast.error("Error saving data!" + error, {
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
        carpetarea: formData.ApartCarpetArea || "0",
        additionalarea: formData.ApartAddtionalArea || "0",
        superbuiltuparea: formData.ApartSuperBuiltArea || "0",
        loginId: "crc",
        p_BOOKS_PROP_APPNO: JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))
      };

      try {
        await axiosInstance.post('BBMPCITZAPI/UPD_NCL_PROPERTY_APARTMENT_TEMP_AREA', data
        )
        const response1 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP?ULBCODE=555&P_BOOKS_PROP_APPNO=' + JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO')) + '&Propertycode=' + JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')) + '');
        sessionStorage.setItem('NCL_TEMP_API', JSON.stringify(response1));
      
        setTimeout(async () => {
         // await fetchData();
          setIsEditable(false);
          setFormData({
            ...formData,
            modify: 'no',
          });
        }, 2000);

      } catch (error) {
        await toast.error("Error saving data!" + error, {
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
    else if ((isEditable === false) && (isEditablecheckbandhi === false)) {
      await toast.warning("There is no changes to save!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    await toast.success("Details Saved Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    await fetchData();
  };
  const back = () => {
    navigate('/AddressDetails')
  }
  const handleNavigation = () => {
    if(isEditable && isEditablecheckbandhi){
      toast.error("Please Save the Details Before Going to Next Section")
      return
    }
    if (formData.propertyType === 1) {
      navigate('/SiteDetails')
    } else if (formData.propertyType === 2) {
      navigate('/BuildingDetails')
    }
    else if (formData.propertyType === 3) {

      navigate('/MultiStoreyBuildingDetails')
    } else {

      toast.error("Property Type Not Found");
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
            Property Use Details
          </Typography>

          {formData.propertyType === 3 && (
            <Grid container spacing={3}>

              <Grid item xs={6} sm={3}>
                <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
                  <RadioGroup row name="modify" value={formData.modify} onChange={handleChange}>
                    <FormControlLabel value="yes" control={<Radio />} label="Modify" />
                    <FormControlLabel value="no" control={<Radio />} label="No Modifications" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  fullWidth
                  label="
                        Carpet Area (in Sq.mts.)"
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
                  label="
                  Additional Area(in Sq.mts.)"
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
                  label="
                    Super Built Area (in Sq.mts.)"
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
                  <FormControlLabel value="yes" control={<Radio />} label="Modify" />
                  <FormControlLabel value="no" control={<Radio />} label="No Modifications" />
                </RadioGroup>
              </FormControl>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label="East"
                    name="east"
                    type="number"
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
                    label="West"
                    name="west"
                    type="number"
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
                    label="North"
                    name="north"
                    type="number"
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
                    label="South"
                    name="south"
                    type="number"
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
                  <FormControlLabel value="yes" control={<Radio />} label="Modify" />
                  <FormControlLabel value="no" control={<Radio />} label="No Modifications" />
                </RadioGroup>
              </FormControl>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginY: 2 }}>
                Odd Site
              </Typography>
              <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
                <RadioGroup row name="oddSite" value={formData.oddSite} onChange={handleOddSiteChange}>
                  <FormControlLabel value="Y" control={<Radio disabled={!isEditable} />} label="Yes" />
                  <FormControlLabel value="N" control={<Radio disabled={!isEditable} />} label="No" />
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
                  <FormControlLabel value="yes" control={<Radio />} label="Modify" />
                  <FormControlLabel value="no" control={<Radio />} label="No Modifications" />
                </RadioGroup>
              </FormControl>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label="East"
                    name="east"
                    type="number"
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
                    label="West"
                    name="west"
                    type="number"
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
                    label="North"
                    name="north"
                    type="number"
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
                    label="South"
                    name="south"
                    type="number"
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
                  <FormControlLabel value="yes" control={<Radio />} label="Modify" />
                  <FormControlLabel value="no" control={<Radio />} label="No Modifications" />
                </RadioGroup>
              </FormControl>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginY: 2 }}>
                Odd Site
              </Typography>
              <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
                <RadioGroup row name="oddSite" value={formData.oddSite} onChange={handleOddSiteChange}>
                  <FormControlLabel value="Y" control={<Radio />} label="Yes" />
                  <FormControlLabel value="N" control={<Radio />} label="No" />
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
                      label="Built-Up Area (Sq.ft)"
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
                      label="Built-Up Area (Sq.Mt)"
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
            <Grid container spacing={3} alignItems="center" justifyContent="center">
              <Grid item>
                <Grid container spacing={1} alignItems="center" justifyContent="center">
                  <Grid item>
                    <TextField
                      variant={isEditable ? "outlined" : "filled"}
                      size="small"
                      name="cal1"
                      type="number"
                      value={formData.cal1}
                      onChange={handleChange}
                      sx={{ width: '100px', borderColor: '#016767' }}
                      InputProps={{
                        readOnly: !isEditable,
                        style: { backgroundColor: !isEditable ? '' : "#ffff" },
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography>x</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      variant={isEditable ? "outlined" : "filled"}
                      size="small"
                      name="cal2"
                      type="number"
                      value={formData.cal2}
                      onChange={handleChange}
                      sx={{ width: '100px', borderColor: '#016767' }}
                      InputProps={{
                        readOnly: !isEditable,
                        style: { backgroundColor: !isEditable ? '' : "#ffff" },
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography>x</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      variant={isEditable ? "outlined" : "filled"}
                      size="small"
                      name="cal3"
                      type="number"
                      value={formData.cal3}
                      onChange={handleChange}
                      sx={{ width: '100px', borderColor: '#016767' }}
                      InputProps={{
                        readOnly: !isEditable,
                        style: { backgroundColor: !isEditable ? '' : "#ffff" },
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      variant={isEditable ? "outlined" : "filled"}
                      size="small"
                      name="cal4"
                      type="number"
                      value={formData.cal4}
                      onChange={handleChange}
                      sx={{ width: '100px', borderColor: '#016767' }}
                      InputProps={{
                        readOnly: !isEditable,
                        style: { backgroundColor: !isEditable ? '' : "#ffff" },
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography>x</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      variant={isEditable ? "outlined" : "filled"}
                      size="small"
                      name="cal5"
                      type="number"
                      value={formData.cal5}
                      onChange={handleChange}
                      sx={{ width: '100px', borderColor: '#016767' }}
                      InputProps={{
                        readOnly: !isEditable,
                        style: { backgroundColor: !isEditable ? '' : "#ffff" },
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography>x</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      variant={isEditable ? "outlined" : "filled"}
                      size="small"
                      name="cal6"
                      type="number"
                      value={formData.cal6}
                      onChange={handleChange}
                      sx={{ width: '100px', borderColor: '#016767' }}
                      InputProps={{
                        readOnly: !isEditable,
                        style: { backgroundColor: !isEditable ? '' : "#ffff" },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography align="center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;------------------------------------------------------------- X ------------------------------------------------------------&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
                  </Grid>
                  <Grid item xs={12}>
                  </Grid>
                  <Grid item>
                    <TextField
                      variant={isEditable ? "outlined" : "filled"}
                      size="small"
                      name="cal7"
                      type="number"
                      value={formData.cal7}
                      onChange={handleChange}
                      sx={{ width: '100px', borderColor: '#016767' }}
                      InputProps={{
                        readOnly: !isEditable,
                        style: { backgroundColor: !isEditable ? '' : "#ffff" },
                      }}
                    />
                  </Grid>
                  <Grid item marginX={14}>
                  </Grid>
                  <Grid item>
                    <Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
                  </Grid>
                  <Grid item>
                  </Grid>
                  <Grid item>
                    <TextField
                      variant={isEditable ? "outlined" : "filled"}
                      size="small"
                      name="cal8"
                      type="number"
                      value={formData.cal8}
                      onChange={handleChange}
                      sx={{ width: '100px', borderColor: '#016767' }}
                      InputProps={{
                        readOnly: !isEditable,
                        style: { backgroundColor: !isEditable ? '' : "#ffff" },
                      }}
                    />
                  </Grid>
                  <Grid item>
                  </Grid>
                </Grid>
              </Grid>

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
            </Grid>
          )}

          <Box display="flex" justifyContent="center" gap={2} mt={3}>
            <Button variant="contained" color="primary" onClick={back}>
              Previous
            </Button>
            <Button variant="contained" color="success" type="submit">
              Save
            </Button>
            <Button variant="contained" color="primary" onClick={handleNavigation}>
              Next
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AreaDimension;
