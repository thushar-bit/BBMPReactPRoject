import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Box,Typography  } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
const BbmpForm = () => {
  const [formData, setFormData] = useState({
    propertyEID: '',
    address: '',
    district: '',
    ulbname: '',
    wardNumber: '',
    propertyNumber: '',
    ownerName: '',
    streetName: ''
  });
  const [tablesData, setTablesData] = useState({
    Table: [],
    Table1: [],
    Table2: [],
    Table3: [],
    Table4: [],
    Table5: [],
    Table6: [],
    Table7: []
  });
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
  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:44368/Sakala/GET_PROPERTY_PENDING_CITZ_BBD_DRAFT?UlbCode=555&propertyid=104931');
      const { Table, Table1, Table2, Table3, Table4, Table5, Table6, Table7 } = response.data;
      setTablesData({ Table, Table1, Table2, Table3, Table4, Table5, Table6, Table7 });

      const table1Item = Table1.length > 0 ? Table1[0] : {};
      const table5Item = Table5.length > 0 ? Table5[0] : {};
      const table6Item = Table6.length > 0 ? Table6[0] : {};

      setFormData({
        propertyEID: table1Item.PROPERTYID || '',
        address: table1Item.ADDRESS || '',
        district: table1Item.DISTRICTNAME || '',
        wardNumber: table1Item.WARDNUMBER || '',
        propertyNumber: table1Item.PROPERTYCODE || '',
        ulbname:table1Item.ULBNAME || '',
        ownerName: table5Item.OWNERNAME || '',
        streetName: table1Item.STREETNAME_EN || ''
      });

    } catch (error) {
      console.error('There was an error!', error);
    }
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

  return (
    <Box sx={{ backgroundColor: '#f0f0f0', padding: 4, borderRadius: 2 }}>
    <form>
      <Typography 
      variant="h3" 
      align="center" 
      gutterBottom
      sx={{ 
        fontWeight: 'bold', 
        marginBottom: 3,
       color:'#1565c0',
        fontSize: {
          xs: '1.5rem',
          sm: '2rem',   
          md: '2.5rem', 
        }
      }}
    >
      Data Available In BBMP Books
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
            }}
           
          />
        </Grid>

        <Grid item xs={12} sm={6}>
        <TextField
            fullWidth
            variant="filled"
            InputProps={{ readOnly: true }}
            label="City"
            name="City"
            value={formData.ulbname}
             onChange={handleChange}
           
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="filled"
            InputProps={{ readOnly: true }}
            label="District"
            name="district"
            value={formData.district}
             onChange={handleChange}
           
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="filled"
            label="Ward Number"
            name="wardNumber"
            value={formData.wardNumber}
             onChange={handleChange}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="filled"
            label="Property Number"
            name="propertyNumber"
            value={formData.propertyNumber}
             onChange={handleChange}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="filled"
            label="Owner Name"
            name="ownerName"
            value={formData.ownerName}
             onChange={handleChange}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="filled"
            label="Street Name"
            name="streetName"
            value={formData.streetName}
             onChange={handleChange}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>

       
      </Grid>
    </form>
    <Typography 
      variant="h6" 
      align="center" 
      gutterBottom
      sx={{ 
     
        marginBottom: 3,
       color:'#1565c0',
        fontSize: {
          xs: '1.5rem',
          sm: '2rem',   
          md: '2.5rem', 
        }
      }}
    >
      Postal Address of Property
    </Typography>
    <Grid container spacing={4}>
    <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
           
            label="Door/Plot No"
            name="Door/Plot No"
            value={formData.DoorPlotNo}
             onChange={handleChange}
           
          />
        </Grid>

     
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
           
            label="Building/Land Name"
            name="Building/Land Name"
            value={formData.BuildingLandName}
             onChange={handleChange}
           
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
           
            label="Street"
            name="Street"
            value={formData.Streest}
             onChange={handleChange}
           
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            
            label="Nearest Landmark"
            name="Nearest Landmark"
            value={formData.NearestLandmark}
             onChange={handleChange}
           
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Pincode"
            name="Pincode"
            value={formData.Pincode}
             onChange={handleChange}
          
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
          
            label="Area/Locality"
            name="Area/Locality"
            value={formData.AreaLocality}
             onChange={handleChange}
          
          />
        </Grid>
        <Grid item xs={12} sm={6}></Grid>
        <Button
  component="label"
  role={undefined}
  variant="contained"
  tabIndex={-1}
  startIcon={<CloudUploadIcon />}
>
  Upload file
  <VisuallyHiddenInput type="file" />
  
</Button>

        </Grid>
    <Grid item xs={12}>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button variant="contained" color="success" type="submit">
              Submit
            </Button>
            <Button variant="contained" color="error" type="reset">
              Clear
            </Button>
          </Box>
        </Grid>
    </Box>
  );
};

export default BbmpForm;
