import React, { useState } from 'react';
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
    plotAreaSqFt: 1,
    plotAreaSqMt: 0.09,
    builtUpAreaSqFt: 0,
    builtUpAreaSqMt: 0,
    modify: 'no',
    oddSite: 'no',
    propertyType: 'select'
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

 // const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data logic here
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
                <TextField
                  fullWidth
                  label="
                        Carpet Area (in Sq.mts.)"
                  name="numFlats"
                  value={formData.numFlats || ''}
                  onChange={handleChange}
                  type="number"
                  variant="filled"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  fullWidth
                  label="
Additional Area(in Sq.mts.)"
                  name="numFlats"
                  value={formData.numFlats || ''}
                  onChange={handleChange}
                  type="number"
                  variant="filled"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  fullWidth
                  label="
Super Built Area (in Sq.mts.)"
                  name="numFlats"
                  value={formData.numFlats || ''}
                  onChange={handleChange}
                  type="number"
                  variant="filled"
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
            <RadioGroup row name="modify" value={formData.modify} onChange={handleChange}>
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
                variant="filled"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="West"
                name="west"
                value={formData.west}
                onChange={handleChange}
                variant="filled"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="North"
                name="north"
                value={formData.north}
                onChange={handleChange}
                variant="filled"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="South"
                name="south"
                value={formData.south}
                onChange={handleChange}
                variant="filled"
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
            <RadioGroup row name="oddSite" value={formData.oddSite} onChange={handleChange}>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <Typography variant="h6" sx={{ fontWeight: 'bold',  }}>
          </Typography>

          <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
            <RadioGroup row name="modify" value={formData.modify} onChange={handleChange}>
              <FormControlLabel value="yes" control={<Radio />} label="Modify" />
              <FormControlLabel value="no" control={<Radio />} label="No Modifications" />
            </RadioGroup>
          </FormControl>
          <Grid container spacing={3}>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="N-S (ft)"
                name="ns"
                value={formData.ns}
                onChange={handleChange}
                type="number"
                variant="filled"
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
                variant="filled"
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
                variant="filled"
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
                variant="filled"
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
          </div>
          )}
          {formData.propertyType === 'building' && (
            <div>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
              Schedule Of The Property
            </Typography>
            <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
              <RadioGroup row name="modify" value={formData.modify} onChange={handleChange}>
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
                  variant="filled"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  fullWidth
                  label="West"
                  name="west"
                  value={formData.west}
                  onChange={handleChange}
                  variant="filled"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  fullWidth
                  label="North"
                  name="north"
                  value={formData.north}
                  onChange={handleChange}
                  variant="filled"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  fullWidth
                  label="South"
                  name="south"
                  value={formData.south}
                  onChange={handleChange}
                  variant="filled"
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
              <RadioGroup row name="oddSite" value={formData.oddSite} onChange={handleChange}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <Typography variant="h6" sx={{ fontWeight: 'bold',  }}>
            </Typography>
  
            <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
              <RadioGroup row name="modify" value={formData.modify} onChange={handleChange}>
                <FormControlLabel value="yes" control={<Radio />} label="Modify" />
                <FormControlLabel value="no" control={<Radio />} label="No Modifications" />
              </RadioGroup>
            </FormControl>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={3}>
                <TextField
                  fullWidth
                  label="N-S (ft)"
                  name="ns"
                  value={formData.ns}
                  onChange={handleChange}
                  type="number"
                  variant="filled"
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
                  variant="filled"
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
                  variant="filled"
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
                  variant="filled"
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
                  label="Built-Up Area (Sq.ft)"
                  name="builtUpAreaSqFt"
                  value={formData.builtUpAreaSqFt}
                  onChange={handleChange}
                  type="number"
                  variant="filled"
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
                  variant="filled"
                />
              </Grid>
            </Grid>
            </div>
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
