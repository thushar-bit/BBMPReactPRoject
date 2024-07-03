import React, { useState } from 'react';
import {
  TextField, Button, Grid, Box, Container, Typography, Tooltip, IconButton,
  FormControl, MenuItem, Select, InputLabel, Radio, RadioGroup, FormControlLabel,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const MultiStoreyBuildingDetails = () => {
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
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data logic here
  };

  const back = () => {
    navigate('/AreaDimension');
  };

  const handleNavigation = () => {
    if (formData.propertyType === "vacant") {
      navigate('/SiteDetails');
    } else if (formData.propertyType === "building") {
      navigate('/BuildingDetails');
    } else if (formData.propertyType === "flats") {
      navigate('/MultiStoreyBuildingDetails');
    } else {
      alert("Please Select the property type");
    }
  };

  console.log(formData.propertyType);

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
            Details Of Usage Of Multi-Storey Flat
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Block Name"
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
                label={"Flat No"}
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
                variant='filled'
                label={"Total number of parking units : "}
                name="BuildingLandName"
                value={formData.BuildingLandName}
                onChange={handleChange}
                InputProps={{
                  readOnly: true,
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
                variant='filled'
                label={"Total Parking Area(in Sq. mts.)"}
                name="Street"
                value={formData.Street}
                onChange={handleChange}
                InputProps={{
                  readOnly: true,
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
              <FormControl fullWidth sx={{ marginBottom: 3 }}>
                <InputLabel>Occupancy :</InputLabel>
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
              <FormControl fullWidth sx={{ marginBottom: 3 }}>
                <InputLabel>Occupancy :</InputLabel>
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
                label={"Owners Share Percent (in Percentile) :"}
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
            <Grid item xs={8} sm={6}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Parking Facility
              </Typography>
              <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
                <RadioGroup row name="modify" value={formData.modify} onChange={handleChange}>
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
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
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>BLOCK NO</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>FLOOR NO</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>FLATNO</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>ADDITIONALAREA</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>SUPERBUILTUPAREA</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>PARKINGAVAILABLE</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>PARKINGUNITS</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>PARKINGAREA</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>OWNER SHARE TYPE</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>SHARE TYPE VALUE</TableCell>
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

export default MultiStoreyBuildingDetails;
