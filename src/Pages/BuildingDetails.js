import React, { useState } from 'react';
import {
  TextField, Button, Grid, Box, Container, Typography, Tooltip, IconButton,
  FormControl, MenuItem, Select, InputLabel,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
const BuildingDetails = () => {
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
  const [tableData, setTableData] = useState([
    { id: 1, column1: 'Data 1', column2: 'Data 2', column3: 'Data 3' },
    { id: 2, column1: 'Data A', column2: 'Data B', column3: 'Data C' },
    // Add more rows as needed
  ]);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data logic here
  };
  const back = () => {
    navigate('/AreaDimension')
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
    <Container maxWidth="xl">
      <Box sx={{ backgroundColor: '#f0f0f0', padding: 4, borderRadius: 2, mt: 8 }}>
     
      <form onSubmit={handleSubmit}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            fontFamily:"sans-serif",
            marginBottom: 3,
            color: '#',
            fontSize: {
              xs: '1.5rem',
              sm: '2rem',
              md: '2.5rem',
            }
          }}
        >
         Details Of Usage Of Built-up Area
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Building Number:"
              name="propertyEID"
              value={formData.propertyEID}
              onChange={handleChange}
              InputProps={{
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
                readOnly: true,
                endAdornment: (
                  <Tooltip title={t("cityInfo")}>
                     <IconButton color="primary">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                )
              }}
              label={"Building Name :"}
              name="ulbname"
              value={formData.ulbname}
              onChange={handleChange}
              
            />
          </Grid>
          <Grid item xs={12} sm={4}>
          <FormControl fullWidth sx={{ marginBottom: 3 }}>
            <InputLabel>Floor Number :</InputLabel>
            <Select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
            >
              <MenuItem value="select">Select</MenuItem>
              <MenuItem value="vacant">First Floor</MenuItem>
              <MenuItem value="building">Second Floor</MenuItem>
              <MenuItem value="flats">Third Floor</MenuItem>
            </Select>
          </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
          <FormControl fullWidth sx={{ marginBottom: 3 }}>
            <InputLabel>Usage Category:</InputLabel>
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
          </Grid>
          <Grid item xs={12} sm={4}>
          <FormControl fullWidth sx={{ marginBottom: 3 }}>
            <InputLabel>Type of Use(Sub Category):</InputLabel>
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
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="number"
              label={"Year Of Construction/Usage Started :"}
              name="DoorPlotNo"
              value={formData.DoorPlotNo}
              onChange={handleChange}
              InputProps={{
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
              label={"Self Use Area:"}
              name="BuildingLandName"
              value={formData.BuildingLandName}
              onChange={handleChange}
              InputProps={{
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
              label={"Rented Area:"}
              name="Street"
              value={formData.Street}
              onChange={handleChange}
              InputProps={{
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
              label={"Total Area"}
              name="NearestLandmark"
              value={formData.NearestLandmark}
              onChange={handleChange}
              InputProps={{
                readOnly:true,
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
              label={"BESCOM Customer ID :"}
              name="Pincode"
              type="number"
              value={formData.Pincode}
              onChange={handleChange}
              InputProps={{
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
              name="AreaLocality"
              value={formData.AreaLocality}
              onChange={handleChange}
              InputProps={{
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
          Data Available In BBMP Books
              </Typography>
              <TableContainer component={Paper} sx={{ mt: 4 }}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>ID</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>Building Number</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>Building Name</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>Floor Number</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>Usage Category</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>Type of use(Sub Category)</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>Type of use(Sub Category)</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>Self Use Area</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>Rented Area</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>Total Area</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>BESCOM Customer ID :</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>ಬಿ ಡಬ್ಲ್ಯೂ ಎಸ್ ಎಸ್ ಬಿ ಮೀಟರ್ ಸಂಖ್ಯೆ :</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {tableData.length === 0 ? (
        <TableRow>
          <TableCell colSpan={12} align="center">
            No data available
          </TableCell>
        </TableRow>
      ) : (
        tableData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.column1}</TableCell>
            <TableCell>{row.column2}</TableCell>
            <TableCell>{row.column3}</TableCell>
            <TableCell>{row.column1}</TableCell>
            <TableCell>{row.column2}</TableCell>
            <TableCell>{row.column3}</TableCell>
            <TableCell>{row.column1}</TableCell>
            <TableCell>{row.column2}</TableCell>
            <TableCell>{row.column3}</TableCell>
            <TableCell>{row.column1}</TableCell>
            <TableCell>{row.column1}</TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  </Table>
</TableContainer>

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

export default BuildingDetails;
