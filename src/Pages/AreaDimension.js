import React, { useState ,useEffect} from 'react';
import {
  TextField, Button, Grid, Box, Container, Typography, Tooltip, IconButton,
  Radio, RadioGroup, FormControlLabel, FormControl, MenuItem, Select, InputLabel
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
//import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
const AreaDimension = () => {
  const [formData, setFormData] = useState({
    east: '',
    west: '',
    north: '',
    south: '',
    ns: 0,
    ew: 0,
    plotAreaSqFt: 0,
    plotAreaSqMt: 0,
    builtUpAreaSqFt: 0,
    builtUpAreaSqMt: 0,
    modify: 'no',
    oddSite: 'no',
    propertyType: 'select',
    ApartCarpetArea:0,
    ApartAddtionalArea:0,
    ApartSuperBuiltArea:0,
    cal1: '',
    cal2: '',
    cal3: '',
    cal4: '',
    cal5: '',
    cal6: '',
    cal7: '',
    cal8: '',
    sqFt: '',
    sqMt: ''
  });
  const [isEditable, setIsEditable] = useState(false);
  const navigate = useNavigate();
  const [tablesdata,setTablesData1] = useState([]);
  const [tablesdata2,setTablesData2] = useState([]);
  const [isOddSiteEnabled, setIsOddSiteEnabled] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
   
  };

 // const { t } = useTranslation();
 const handleRadioChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });

  if (name === 'modify' && value === 'yes') {
    setIsEditable(true);
  } else if (name === 'modify' && value === 'no') {
    setIsEditable(false);
  }
};
console.log(tablesdata)
console.log(tablesdata2)
useEffect(() => {
  debugger
  const response = JSON.parse(sessionStorage.getItem('BBD_DRAFT_API'));
      const response2 = JSON.parse(sessionStorage.getItem('NCL_TEMP_API'));
      
      const {  Table1,  Table2,Table3, Table5 ,Table7  } = response.data;
      const {  Table17   } = response2.data;
      setTablesData1({ Table1,Table2,Table3,Table5,Table7 });
      setTablesData2({ Table17 });
      const table1Item = Table1.length > 0 ? Table1[0] : {};
      const table2Item = Table2.length > 0 ? Table2[0] : {};
      const table3Item = Table3.length > 0 ? Table3[0] : {};
      const table7Item = Table7.length > 0 ? Table7[0] : {};
  if (table1Item) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      east: table1Item.CHECKBANDI_EAST || '',
      west: table1Item.CHECKBANDI_WEST || '',
      north: table1Item.CHECKBANDI_NORTH || '',
      south: table1Item.CHECKBANDI_SOUTH || '',
      ns: table3Item.NORTHSOUTH || 0,
      ew: table3Item.EASTWEST || 0,
      plotAreaSqFt: table2Item.SITEAREAFT || 0,
      plotAreaSqMt: table2Item.SITEAREA || 0,
      builtUpAreaSqFt: table2Item.BUILDINGAREAFT || 0,
      builtUpAreaSqMt: table2Item.BUILDINGAREA || 0,
      ApartCarpetArea:table7Item.CARPETAREA || 0,
      ApartAddtionalArea:table7Item.ADDITIONALAREA || 0,
      ApartSuperBuiltArea:table7Item.SUPERBUILTUPAREA || 0,
    }));
  }
}, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    
  };
  const back = () => {
    navigate('/bbmp-form')
  }
  const handleNavigation= () =>{
    debugger
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
      debugger
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
      if (name === 'oddSite' && value === 'yes') {
        setIsOddSiteEnabled(true);
      } else if (name === 'oddSite' && value === 'no') {
        setIsOddSiteEnabled(false);
      }
    }
    const [values, setValues] = useState({
      cal1: '',
      cal2: '',
      cal3: '',
      cal4: '',
      cal5: '',
      cal6: '',
      cal7: '',
      cal8: '',
      areaFt: '',
      areaMt: '',
    });
  console.log(formData.propertyType)
  return (
    
    <Container maxWidth="lg">
      <Box sx={{ backgroundColor: '#f0f0f0', padding: 4, borderRadius: 2, mt: 8 }}>
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
            <RadioGroup row name="modify" value={formData.modify} onChange={handleRadioChange}>
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
                  name="numFlats"
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
                  name="numFlats"
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
                  name="numFlats"
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
            <RadioGroup row name="modify" value={formData.modify} onChange={handleRadioChange}>
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
                variant={isEditable ? "standard" : "filled"}
    InputProps={{
    readOnly: !isEditable,
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
                label="North"
                name="north"
                value={formData.north}
                onChange={handleChange}
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
                label="South"
                name="south"
                value={formData.south}
                onChange={handleChange}
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
          </Grid>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginY: 2 }}>
            Additional Details
          </Typography>
         
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginY: 2 }}>
            Odd Site
          </Typography>
          <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
            <RadioGroup row name="oddSite" value={formData.oddSite} onChange={handleOddSiteChange}>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
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
              <RadioGroup row name="modify" value={formData.modify} onChange={handleRadioChange}>
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
                  label="West"
                  name="west"
                  value={formData.west}
                  onChange={handleChange}
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
                  label="North"
                  name="north"
                  value={formData.north}
                  onChange={handleChange}
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
                  label="South"
                  name="south"
                  value={formData.south}
                  onChange={handleChange}
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
            </Grid>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginY: 2 }}>
              Additional Details
            </Typography>
           
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginY: 2 }}>
              Odd Site
            </Typography>
            <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
              <RadioGroup row name="oddSite" value={formData.oddSite} onChange={handleOddSiteChange}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
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
          {isOddSiteEnabled && (
 <Grid container spacing={3} alignItems="center" justifyContent="center">
 <Grid item>
   <Grid container spacing={1} alignItems="center" justifyContent="center">
     <Grid item>
       <TextField
         variant="outlined"
         size="small"
         name="cal1"
         value={formData.cal1}
         onChange={handleChange}
         sx={{ width: '100px', borderColor: '#016767' }}
       />
     </Grid>
     <Grid item>
       <Typography>x</Typography>
     </Grid>
     <Grid item>
       <TextField
         variant="outlined"
         size="small"
         name="cal2"
         value={formData.cal2}
         onChange={handleChange}
         sx={{ width: '100px', borderColor: '#016767' }}
       />
     </Grid>
     <Grid item>
       <Typography>x</Typography>
     </Grid>
     <Grid item>
       <TextField
         variant="outlined"
         size="small"
         name="cal3"
         value={formData.cal3}
         onChange={handleChange}
         sx={{ width: '100px', borderColor: '#016767' }}
       />
     </Grid>
     <Grid item>
       <Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
     </Grid>
     <Grid item>
       <TextField
         variant="outlined"
         size="small"
         name="cal4"
         value={formData.cal4}
         onChange={handleChange}
         sx={{ width: '100px', borderColor: '#016767' }}
       />
     </Grid>
     <Grid item>
       <Typography>x</Typography>
     </Grid>
     <Grid item>
       <TextField
         variant="outlined"
         size="small"
         name="cal5"
         value={formData.cal5}
         onChange={handleChange}
         sx={{ width: '100px', borderColor: '#016767' }}
       />
     </Grid>
     <Grid item>
       <Typography>x</Typography>
     </Grid>
     <Grid item>
       <TextField
         variant="outlined"
         size="small"
         name="cal6"
         value={formData.cal6}
         onChange={handleChange}
         sx={{ width: '100px', borderColor: '#016767' }}
       />
     </Grid>

     <Grid item xs={12}>
       <Typography align="center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;------------------------------------------------------------- X ------------------------------------------------------------&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
     </Grid>
     <Grid item xs={12}>
      </Grid>
     <Grid item>
       <TextField
         variant="outlined"
         size="small"
         name="cal7"
         value={formData.cal7}
         onChange={handleChange}
         sx={{ width: '100px', borderColor: '#016767' }}
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
         variant="outlined"
         size="small"
         name="cal8"
         value={formData.cal8}
         onChange={handleChange}
         sx={{ width: '100px', borderColor: '#016767' }}
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
            <Button variant="contained" color="error" type="reset">
              Clear
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
