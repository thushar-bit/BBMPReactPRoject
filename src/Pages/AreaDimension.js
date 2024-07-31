import React, { useState ,useEffect} from 'react';
import {
  TextField, Button, Grid, Box, Container, Typography, Tooltip, IconButton,
  Radio, RadioGroup, FormControlLabel, FormControl, MenuItem, Select, InputLabel
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
//import { useTranslation } from 'react-i18next';
import { useNavigate,useParams  } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../components/Axios';
const AreaDimension = () => {
  const { DropdownValue } = useParams();
  const [formData, setFormData] = useState({
    east: '',
    west: '',
    north: '',
    south: '',
    ns: "",
    ew: "",
    plotAreaSqFt: 0,
    plotAreaSqMt: 0,
    builtUpAreaSqFt: 0,
    builtUpAreaSqMt: 0,
    modify: 'no',
    modifycheckbandi:'no',
    oddSite: 'EVEN',
    propertyType: DropdownValue,
    ApartCarpetArea:0,
    ApartAddtionalArea:0,
    ApartSuperBuiltArea:0,
    cal1: 0,
    cal2: 0,
    cal3: 0,
    cal4: 0,
    cal5: 0,
    cal6: 0,
    cal7: 0,
    cal8: 0,
    sqFt: 0,
    sqMt: 0
  });
  const [isEditable, setIsEditable] = useState(false);
  const [isEditablecheckbandhi, setIsEditablecheckbandi] = useState(false);
  const navigate = useNavigate();
  const [isOddSiteEnabled, setIsOddSiteEnabled] = useState(false);
  const handleChange = (e) => {
    
    const { name, value } = e.target;
    const updatedValue = parseFloat(value) || 0;
   
    if (name === 'ns' || name === 'ew') {
      const nsValue = name === 'ns' ? updatedValue : formData.ns;
      const ewValue = name === 'ew' ? updatedValue : formData.ew;
      const plotAreaSqFt = Math.round((nsValue > 0 ? nsValue : 1) * (ewValue > 0 ? ewValue : 1) * 100) / 100;
      const plotAreaSqMt = Math.round(plotAreaSqFt * 0.092903 * 100) / 100;
      formData.plotAreaSqFt = plotAreaSqFt;
      formData.plotAreaSqMt = plotAreaSqMt;
     
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
      formData.sqFt = areaFt;
      formData.sqMt = areaMt;
      setFormData(prevData => ({
        ...prevData,
        sqFt: areaFt.toString(),
        sqMt: areaMt.toString()
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
          Table5: NCLTable5Data = [],
          Table13: NCLTable13Data = []
        } = response2.data;
       //BBD Tables
        
        
          setFormData((prevFormData) => ({
            ...prevFormData,
            east: NCLTable1Data.length > 0 ? NCLTable1Data[0].CHECKBANDI_EAST || '': Table1Data.length > 0 ? Table1Data.CHECKBANDI_EAST|| "":'',
            west: NCLTable1Data.length > 0 ? NCLTable1Data[0].CHECKBANDI_WEST || '': Table1Data.length > 0 ? Table1Data.CHECKBANDI_WEST|| "":'',
            north: NCLTable1Data.length > 0 ? NCLTable1Data[0].CHECKBANDI_NORTH || '': Table1Data.length > 0 ? Table1Data.CHECKBANDI_NORTH|| "":'',
            south: NCLTable1Data.length > 0 ? NCLTable1Data[0].CHECKBANDI_SOUTH || '': Table1Data.length > 0 ? Table1Data.CHECKBANDI_SOUTH|| "":'',
            ns: NCLTable5Data.length > 0 ? NCLTable5Data[0].NORTHSOUTH || 0: Table3Data.length > 0 ? Table3Data[0].NORTHSOUTH|| "":0,
            ew: NCLTable5Data.length > 0 ? NCLTable5Data[0].EASTWEST || 0: Table3Data.length > 0 ? Table3Data[0].EASTWEST|| "":0,
            plotAreaSqFt: NCLTable2Data.length > 0 ? NCLTable2Data[0].SITEAREAFT || 0: Table2Data.length > 0 ? Table2Data[0].SITEAREAFT|| "":0,
            plotAreaSqMt: NCLTable2Data.length > 0 ? NCLTable2Data[0].SITEAREA || 0: Table2Data.length > 0 ? Table2Data[0].SITEAREA|| "":0,
            builtUpAreaSqFt: NCLTable2Data.length > 0 ? NCLTable2Data[0].BUILDINGAREAFT || 0: Table2Data.length > 0 ? Table2Data[0].BUILDINGAREAFT|| 0:0,
            builtUpAreaSqMt: NCLTable2Data.length > 0 ? NCLTable2Data[0].BUILDINGAREA || 0: Table2Data.length > 0 ? Table2Data[0].BUILDINGAREA|| 0:0,
            ApartCarpetArea:NCLTable13Data.length > 0 ? NCLTable13Data[0].CARPETAREA || 0: Table7Data.length > 0 ? Table7Data[0].CARPETAREA|| "":0,
            ApartAddtionalArea:NCLTable13Data.length > 0 ? NCLTable13Data[0].ADDITIONALAREA || 0: Table7Data.length > 0 ? Table7Data[0].ADDITIONALAREA|| "":0,
            ApartSuperBuiltArea:NCLTable13Data.length > 0 ? NCLTable13Data[0].SUPERBUILTUPAREA || 0: Table7Data.length > 0 ? Table7Data[0].SUPERBUILTUPAREA|| "":0,
            cal1: NCLTable5Data.length > 0 ? NCLTable5Data[0].EWODDSITE1FT || 0: Table3Data.length > 0 ? Table3Data[0].EWODDSITE1FT|| "":0,
            cal2: NCLTable5Data.length > 0 ? NCLTable5Data[0].EWODDSITE2FT || 0: Table3Data.length > 0 ? Table3Data[0].EWODDSITE1FT|| "":0,
            cal3: NCLTable5Data.length > 0 ? NCLTable5Data[0].EWODDSITE3FT || 0: Table3Data.length > 0 ? Table3Data[0].EWODDSITE1FT|| "":0,
            cal4: NCLTable5Data.length > 0 ? NCLTable5Data[0].EWODDSITE4FT || 0: Table3Data.length > 0 ? Table3Data[0].EWODDSITE1FT|| "":0,
            cal5: NCLTable5Data.length > 0 ? NCLTable5Data[0].NSODDSITE1FT || 0: Table3Data.length > 0 ? Table3Data[0].NSODDSITE1FT|| "":0,
            cal6: NCLTable5Data.length > 0 ? NCLTable5Data[0].NSODDSITE2FT || 0: Table3Data.length > 0 ? Table3Data[0].NSODDSITE1FT|| "":0,
            cal7: NCLTable5Data.length > 0 ? NCLTable5Data[0].NSODDSITE3FT || 0: Table3Data.length > 0 ? Table3Data[0].NSODDSITE1FT|| "":0,
            cal8: NCLTable5Data.length > 0 ? NCLTable5Data[0].NSODDSITE4FT || 0: Table3Data.length > 0 ? Table3Data[0].NSODDSITE1FT|| "":0,
          }));
        }
        catch(error){
          navigate('/ErrorPage', { state: { errorMessage: error.message,errorLocation:window.location.pathname } });
        }
 }
useEffect(() => {
  fetchData();
}, []);
const handleCalulation = () =>{
 
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
  formData.sqFt = areaFt;
      formData.sqMt = areaMt;
      setFormData(prevData => ({
        ...prevData,
        sqFt: areaFt.toString(),
        sqMt: areaMt.toString()
      }));
  
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(isEditablecheckbandhi === true && formData.propertyType !== "flats" && formData.propertyType !== "select") //only checkbandhi data
      {
        const checkbandhidata = {
          propertyCode: JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')),
  checkbandI_NORTH: formData.east,
  checkbandI_SOUTH: formData.south,
  checkbandI_EAST: formData.east,
  checkbandI_WEST: formData.west,
  loginId: "crc",
      eidappno:JSON.parse(sessionStorage.getItem('EIDAPPNO'))
  
}
      
      try {
        await  axiosInstance.post('BBMPCITZAPI/UPD_NCL_PROPERTY_MAIN_TEMP_CHECKBANDI', checkbandhidata
         )
        
         const response1 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP?ULBCODE=555&EIDAPPNO='+JSON.parse(sessionStorage.getItem('EIDAPPNO'))+'&Propertycode='+JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))+'');
         sessionStorage.setItem('NCL_TEMP_API', JSON.stringify(response1));
        await toast.success("Details Saved Successfully", {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
         });
     
         setIsEditablecheckbandi(false);
          await fetchData();
          setFormData({
            ...formData,
            modifycheckbandi: 'no',
          });
       } catch (error) {
      await   toast.error("Error saving data!" + error, {
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
 if((formData.propertyType === "vacant" || formData.propertyType === "building") && isEditablecheckbandhi === false && formData.propertyType !== "select" &&  (isEditable) 
    //only below data
  ){
  const data = {
        propertyCode: JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')),
    siteorbuilding: formData.propertyType || "",
    evenoroddsite: formData.oddSite || "",
    sitearea: formData.plotAreaSqMt || "",
    siteareaft: formData.plotAreaSqFt || "",
  //  buildingarea: formData.builtUpAreaSqMt,
  //  buildingareaft: formData.builtUpAreaSqFt,
    eastwest: formData.ew.toString(),
    northsouth: formData.ns.toString(),
    ewoddsitE1FT: formData.cal1 || "",
    ewoddsitE2FT: formData.cal2 || "",
    ewoddsitE3FT: formData.cal3 || "",
    ewoddsitE4FT: formData.cal4 || "",
    nsoddsitE1FT: formData.cal5 || "",
    nsoddsitE2FT: formData.cal6 || "",
    nsoddsitE3FT: formData.cal7 || "",
    nsoddsitE4FT: formData.cal8 || "",
    loginId: "crc",
    eidappno:JSON.parse(sessionStorage.getItem('EIDAPPNO'))
       };
    
    try {
      await  axiosInstance.post('BBMPCITZAPI/UPD_NCL_PROPERTY_SITE_DIMENSION_TEMP', data
       )
      
       const response1 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP?ULBCODE=555&EIDAPPNO='+JSON.parse(sessionStorage.getItem('EIDAPPNO'))+'&Propertycode='+JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))+'');
       sessionStorage.setItem('NCL_TEMP_API', JSON.stringify(response1));
      await toast.success("Details Saved Successfully", {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
       });
       setTimeout( async() => {
      await  fetchData();
   //    handleNavigation()
   setIsEditable(false);
   setFormData({
    ...formData,
    modify: 'no',
  });
      }, 2000);
     
     } catch (error) {
    await   toast.error("Error saving data!" + error, {
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
    else if(formData.propertyType === "flats"  && formData.propertyType !== "select" && isEditable === true) //only flats
      {
        const data = {
          propertyCode: JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')),
  carpetarea: formData.ApartCarpetArea,
  additionalarea: formData.ApartAddtionalArea,
  superbuiltuparea: formData.ApartSuperBuiltArea,
      loginId: "crc",
      eidappno:JSON.parse(sessionStorage.getItem('EIDAPPNO'))
         };
      
      try {
        await  axiosInstance.post('BBMPCITZAPI/UPD_NCL_PROPERTY_APARTMENT_TEMP_AREA', data
         )
         const response1 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP?ULBCODE=555&EIDAPPNO='+JSON.parse(sessionStorage.getItem('EIDAPPNO'))+'&Propertycode='+JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))+'');
         sessionStorage.setItem('NCL_TEMP_API', JSON.stringify(response1));
        await toast.success("Details Saved Successfully", {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
         });
         setTimeout( async() => {
          await  fetchData();
       //    handleNavigation()
          }, 2000);
       
       } catch (error) {
      await   toast.error("Error saving data!" + error, {
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
    else if((isEditable === false) && (isEditablecheckbandhi === false)){
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
  };
  const back = () => {
    navigate('/AddressDetails')
  }
  const handleNavigation= () =>{
    
    if(formData.propertyType === "vacant"){
      navigate('/SiteDetails')
    }else if(formData.propertyType === "building")
      {
        navigate('/BuildingDetails')
      }
    else if(formData.propertyType === "flats"){
 
      navigate('/MultiStoreyBuildingDetails')
    }else {
     
      alert("Please Select the property type");
    }
  }
  const handleOddSiteChange =(e) => 
    {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
      if (name === 'oddSite' && value === 'ODD' ) {
        setIsOddSiteEnabled(true);
        handleCalulation()
      } else if (name === 'oddSite' && value === 'EVEN' ) {
        setIsOddSiteEnabled(false);
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
          <FormControl fullWidth sx={{ marginBottom: 3 }}>
            <InputLabel>Property Type</InputLabel>
            <Select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
            >
              <MenuItem value="select">Select</MenuItem>
              <MenuItem value="vacant">Vacant Site</MenuItem>
              <MenuItem value="building">Site with Building</MenuItem>
              <MenuItem value="flats">Multistorey Flats</MenuItem>
            </Select>
          </FormControl>
          {formData.propertyType === 'flats' && (
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
                  variant={isEditable ? "standard" : "filled"}
                  InputProps={{
                    readOnly: !isEditable,
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
                  variant={isEditable ? "standard" : "filled"}
                  InputProps={{
                    readOnly: !isEditable,
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
                  variant={isEditable ? "standard" : "filled"}
                  InputProps={{
                    readOnly: !isEditable,
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
          {(formData.propertyType === 'vacant')  && (
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
                value={formData.east}
                onChange={handleChange}
                variant={isEditablecheckbandhi ? "standard" : "filled"}
    InputProps={{
    readOnly: !isEditablecheckbandhi,
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
                value={formData.west}
                onChange={handleChange}
                variant={isEditablecheckbandhi ? "standard" : "filled"}
                InputProps={{
                  readOnly: !isEditablecheckbandhi,
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
                value={formData.north}
                onChange={handleChange}
                variant={isEditablecheckbandhi ? "standard" : "filled"}
                InputProps={{
                  readOnly: !isEditablecheckbandhi,
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
                value={formData.south}
                onChange={handleChange}
                variant={isEditablecheckbandhi ? "standard" : "filled"}
                InputProps={{
                  readOnly: !isEditablecheckbandhi,
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
            <RadioGroup row name="oddSite" value={formData.oddSite}  onChange={handleOddSiteChange}>
              <FormControlLabel value="ODD"  control={<Radio disabled={!isEditable} />}  label="Yes" />
              <FormControlLabel value="EVEN"  control={<Radio disabled={!isEditable} />}  label="No" />
            </RadioGroup>
          </FormControl>
          <Typography variant="h6" sx={{ fontWeight: 'bold',  }}>
          </Typography>

          {(isOddSiteEnabled  === false )&& (
          <Grid container spacing={3}>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="N-S (ft)"
                name="ns"
                value={formData.ns}
                onChange={handleChange}
                type="number"
                variant={isEditable ? "standard" : "filled"}
                InputProps={{
                  readOnly: !isEditable,
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
                variant={isEditable ? "standard" : "filled"}
                InputProps={{
                  readOnly: !isEditable,
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
          {(formData.propertyType === 'building')  && (
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
                  value={formData.east}
                  onChange={handleChange}
                  variant={isEditablecheckbandhi ? "standard" : "filled"}
                  InputProps={{
                    readOnly: !isEditablecheckbandhi,
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
                  value={formData.west}
                  onChange={handleChange}
                 variant={isEditablecheckbandhi ? "standard" : "filled"}
  InputProps={{
    readOnly: !isEditablecheckbandhi,
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
                  value={formData.north}
                  onChange={handleChange}
                 variant={isEditablecheckbandhi ? "standard" : "filled"}
  InputProps={{
    readOnly: !isEditablecheckbandhi,
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
                  value={formData.south}
                  onChange={handleChange}
                 variant={isEditablecheckbandhi ? "standard" : "filled"}
  InputProps={{
    readOnly: !isEditablecheckbandhi,
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
                <FormControlLabel value="ODD" control={<Radio />} label="Yes" />
                <FormControlLabel value="EVEN" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <Typography variant="h6" sx={{ fontWeight: 'bold',  }}>
            </Typography>
  
            {(isOddSiteEnabled  === false )&& (
            <Grid container spacing={3}>
              <Grid item xs={6} sm={3}>
                <TextField
                  fullWidth
                  label="N-S (ft)"
                  name="ns"
                  value={formData.ns}
                  onChange={handleChange}
                  type="number"
                  variant={isEditable ? "standard" : "filled"}
                  InputProps={{
                    readOnly: !isEditable,
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
                  variant={isEditable ? "standard" : "filled"}
                  InputProps={{
                    readOnly: !isEditable,
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
        {isOddSiteEnabled && formData.propertyType !== "flats" && formData.propertyType !== "select" && (
 <Grid container spacing={3} alignItems="center" justifyContent="center">
 <Grid item>
   <Grid container spacing={1} alignItems="center" justifyContent="center">
     <Grid item>
       <TextField
         variant={isEditable ? "standard" : "filled"}
         size="small"
         name="cal1"
         value={formData.cal1}
         onChange={handleChange}
         sx={{ width: '100px', borderColor: '#016767' }}
         InputProps={{
          readOnly: !isEditable,
         }}
       />
     </Grid>
     <Grid item>
       <Typography>x</Typography>
     </Grid>
     <Grid item>
       <TextField
          variant={isEditable ? "standard" : "filled"}
         size="small"
         name="cal2"
         value={formData.cal2}
         onChange={handleChange}
          sx={{ width: '100px', borderColor: '#016767' }}
         InputProps={{
          readOnly: !isEditable,
         }}
       />
     </Grid>
     <Grid item>
       <Typography>x</Typography>
     </Grid>
     <Grid item>
       <TextField
          variant={isEditable ? "standard" : "filled"}
         size="small"
         name="cal3"
         value={formData.cal3}
         onChange={handleChange}
          sx={{ width: '100px', borderColor: '#016767' }}
         InputProps={{
          readOnly: !isEditable,
         }}
       />
     </Grid>
     <Grid item>
       <Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
     </Grid>
     <Grid item>
       <TextField
          variant={isEditable ? "standard" : "filled"}
         size="small"
         name="cal4"
         value={formData.cal4}
         onChange={handleChange}
          sx={{ width: '100px', borderColor: '#016767' }}
         InputProps={{
          readOnly: !isEditable,
         }}
       />
     </Grid>
     <Grid item>
       <Typography>x</Typography>
     </Grid>
     <Grid item>
       <TextField
          variant={isEditable ? "standard" : "filled"}
         size="small"
         name="cal5"
         value={formData.cal5}
         onChange={handleChange}
          sx={{ width: '100px', borderColor: '#016767' }}
         InputProps={{
          readOnly: !isEditable,
         }}
       />
     </Grid>
     <Grid item>
       <Typography>x</Typography>
     </Grid>
     <Grid item>
       <TextField
          variant={isEditable ? "standard" : "filled"}
         size="small"
         name="cal6"
         value={formData.cal6}
         onChange={handleChange}
          sx={{ width: '100px', borderColor: '#016767' }}
         InputProps={{
          readOnly: !isEditable,
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
          variant={isEditable ? "standard" : "filled"}
         size="small"
         name="cal7"
         value={formData.cal7}
         onChange={handleChange}
          sx={{ width: '100px', borderColor: '#016767' }}
         InputProps={{
          readOnly: !isEditable,
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
          variant={isEditable ? "standard" : "filled"}
         size="small"
         name="cal8"
         value={formData.cal8}
         onChange={handleChange}
          sx={{ width: '100px', borderColor: '#016767' }}
         InputProps={{
          readOnly: !isEditable,
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
         size="small"
         name="sqFt"
         value={formData.sqFt}
         onChange={handleChange}
          sx={{ width: '100px', borderColor: '#016767' }}
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
         size="small"
         name="sqMt"
         value={formData.sqMt}
         onChange={handleChange}
         InputProps={{
          readOnly: true,
         }}
         sx={{ width: '100px', borderColor: '#016767' }}
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
