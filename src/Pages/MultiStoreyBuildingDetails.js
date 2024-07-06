import React, { useState } from 'react';
import {
  TextField, Button, Grid, Box, Container, Typography, Tooltip, IconButton,
  FormControl, MenuItem, Select, InputLabel, Radio, RadioGroup, FormControlLabel,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../components/Axios';

const MultiStoreyBuildingDetails = () => {
  const [formData, setFormData] = useState({
   
      BlockName: '',
      FlatNo: '',
      floornumber: '',
      features: '',
      Typeofuse: '',
      yearOfConstruction: '',
      Totalnumberofparkingunits: '',
      TotalParkingArea: '',
      Occupancy: '',
      BesomCustomerID: '',
      SelectOwnerShareType: '',
      OwnersSharePercent: '',
      ParkingFacility: '',
   
    
  });

  const [tableData, setTableData] = useState([
  ]);

  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);
  const [tablesdata2,setTablesData2] = useState([]);
  const [tablesdata3,setTablesData3] = useState([]);
  const [tablesdata4,setTablesData4] = useState([]);
  const [tablesdata6,setTablesData6] = useState([]);

  const { t } = useTranslation();

  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (name === 'ParkingFacility' && value === 'yes') {
      setIsEditable(true);
    } else if (name === 'ParkingFacility' && value === 'no') {
      setIsEditable(false);
    }
    if (name === "features") {
      try {
        const response = await axiosInstance.get(`BBMPCITZAPI/GetNPMMasterTable?FeaturesHeadID=${value}`);
        if (response.data.Table.length > 0) {
          setTablesData3(response.data.Table);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
       
      }
    }
    if(name === "yearOfConstruction")
      {
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
  
  const fetchData = async () => {
    const response1 = await axiosInstance.get('BBMPCITZAPI/GetMasterTablesData?UlbCode=555');
    const response2 = JSON.parse(sessionStorage.getItem('BBD_DRAFT_API'));
    const response3 = JSON.parse(sessionStorage.getItem('NCL_TEMP_API'));
        const {  Table15,Table16 ,Table17  } = response1.data;
        const {  Table7   } = response2.data;
        const {Table13} = response3.data;
        const table1Item = Table7.length > 0 ? Table7 : [];
        const table13Item = Table13.length > 0 ? Table13[0] : [];
        const table16Item = Table16.length > 0 ? Table16 : [];
        const table15Item = Table15.length > 0 ? Table15 : [];
        const table17Item = Table17.length > 0 ? Table17 : [];

        setTableData(table1Item);
        setTablesData2(table16Item);
        setTablesData4(table15Item);
        setTablesData6(table17Item);
        setFormData({
          BlockName: table13Item.BLOCKNUMBER,
          FlatNo: table13Item.FLATNO,
          floornumber: table13Item.FLOORNUMBERID,
          features: table13Item.FEATUREHEADID,
          Typeofuse: table13Item.FEATUREID,
          yearOfConstruction: table13Item.BUILTYEAR,
          Totalnumberofparkingunits: table13Item.PARKINGUNITS,
          TotalParkingArea: table13Item.PARKINGAREA,
          Occupancy: table13Item.BUILDINGUSAGETYPEID,
          BesomCustomerID: table13Item.RRNO,
          SelectOwnerShareType: table13Item.BUILDINGUSAGETYPEID,
          OwnersSharePercent: table13Item.PLOTAREAOWNERSHARE_AREA,
          ParkingFacility: table13Item.PARKINGAVAILABLE,
        });
  }
  React.useEffect(() => {
    
    fetchData();
        
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data logic here
  };

  const back = () => {
    navigate('/AreaDimension/flats');
  };

  const handleNavigation = () => {
   
      navigate('/OwnerDetails');
  
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
                name="BlockName"
                value={formData.BlockName}
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
                name="FlatNo"
                value={formData.FlatNo}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
            <FormControl fullWidth sx={{ marginBottom: 3 }}>
            <InputLabel>Floor Number :</InputLabel>
            <Select
              name="floornumber"
              value={formData.floornumber}
              onChange={handleChange}
            >
              <MenuItem value="">--Select--</MenuItem>
          {tablesdata4.map((item) => (
            <MenuItem key={item.FLOORID} value={item.FLOORNUMBER_EN}>
              {item.FLOORNUMBER_EN}
            </MenuItem>
          ))}
            </Select>
          </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
            <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <InputLabel>Usage Category :</InputLabel>
        <Select
          name="features"
          value={formData.features}
          onChange={handleChange}
        >
          <MenuItem value="">--Select--</MenuItem>
          {tablesdata2.map((item) => (
            <MenuItem key={item.FEATUREHEADID} value={item.FEATUREHEADID}>
              {item.FEATUREHEADNAME_EN}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
            <FormControl fullWidth sx={{ marginBottom: 3 }}>
    <InputLabel>Type of use(Sub Category) :</InputLabel>
   <Select
    name="Typeofuse"
    value={formData.Typeofuse}
    onChange={handleChange}
  >
    <MenuItem value="">--Select--</MenuItem>
    {tablesdata3.map((item) => (
      <MenuItem key={item.FEATUREID} value={item.FEATUREID}>
        {item.FEATURENAME_EN}
      </MenuItem>
    ))}
  </Select>
</FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="number"
                label={"Year Of Construction/Usage Started :"}
                name="yearOfConstruction"
                value={formData.yearOfConstruction}
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
                variant={isEditable ? "standard" : "filled"}
                label={"Total number of parking units : "}
                name="Totalnumberofparkingunits"
                value={formData.Totalnumberofparkingunits}
                onChange={handleChange}
                InputProps={{
                  readOnly: isEditable,
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
                variant={isEditable ? "standard" : "filled"}
                label={"Total Parking Area(in Sq. mts.)"}
                name="TotalParkingArea"
                value={formData.TotalParkingArea}
                onChange={handleChange}
                InputProps={{
                  readOnly: isEditable,
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
                  name="Occupancy"
                  value={formData.Occupancy}
                  onChange={handleChange}
                >
                  <MenuItem value="">--Select--</MenuItem>
    {tablesdata6.map((item) => (
      <MenuItem key={item.BUILDINGUSAGETYPEID} value={item.BUILDINGUSAGETYPEID}>
        {item.BUILDINGUSAGETYPE_EN}
      </MenuItem>
    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label={"BESCOM Customer ID :"}
                name="BesomCustomerID"
                type="number"
                value={formData.BesomCustomerID}
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
                <InputLabel>Select Owner Share Type :</InputLabel>
                <Select
                  name="SelectOwnerShareType"
                  value={formData.SelectOwnerShareType}
                  onChange={handleChange}
                >
   <MenuItem value="0">Select</MenuItem>
                  <MenuItem value="1">ಮಾಲೀಕರ ಹಕ್ಕಿನ ವಿಸ್ತೀರ್ಣ / Owner Share Area</MenuItem>
                  <MenuItem value="2">ಮಾಲೀಕರ ಹಕ್ಕಿನ ಶೇಕಡವಾರು / Owner Share Percent</MenuItem>
                  <MenuItem value="3">ಮಾಲೀಕರ ಹಕ್ಕಿನ ಪ್ರಮಾಣಪತ್ರಗಳ ಸಂಖ್ಯೆ / Owner Share Number</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label={"Owners Share Percent (in Percentile) :"}
                name="OwnersSharePercent"
                value={formData.OwnersSharePercent}
                onChange={handleChange}
                type='number'
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
              <FormControl component="ParkingFacility" sx={{ marginBottom: 3 }}>
                <RadioGroup row name="ParkingFacility" value={formData.ParkingFacility} onChange={handleChange}>
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
