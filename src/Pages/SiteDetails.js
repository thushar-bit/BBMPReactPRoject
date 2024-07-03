import React, { useState } from 'react';
import {
  TextField, Button,  Box, Container, Typography, 
   FormControl, MenuItem, Select, InputLabel
} from '@mui/material';
//import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
const SiteDetails = () => {
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
    navigate('/AreaDimension')
  }
  const handleNavigation= () =>{
    debugger
    navigate('/OwnerDetails')
    
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
           Details Of Usage Of Vacant Plot
          </Typography>
          <FormControl fullWidth sx={{ marginBottom: 3 }}>
            <InputLabel>Usage Category : </InputLabel>
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
          <FormControl fullWidth sx={{ marginBottom: 3 }}>
            <InputLabel>Type of use(Sub Category) :</InputLabel>
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
          <FormControl fullWidth sx={{ marginBottom: 3 }}>
            <InputLabel></InputLabel>
            <TextField
                  fullWidth
                  label="
                       Year Of Construction/Usage Started"
                  name="numFlats"
                  value={''}
                  onChange={handleChange}
                  type="number"
                 
                />
          </FormControl>
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

export default SiteDetails;
