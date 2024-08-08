import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Grid, Box, Container, Typography, CircularProgress, Tooltip, IconButton,
  FormControl, FormHelperText, MenuItem, Select, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Link, TablePagination
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../components/Axios';
import ErrorPage from './ErrorPage';
import * as Yup from 'yup';
import '../components/Shake.css';

const BBDDraft = () => {
  const [formData, setFormData] = useState({
    ZoneName: "",
    WardName: "",
    SelectType: "",
    Search:""
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [propertyData, setPropertyData] = useState([]);
  const [zoneData, setZoneData] = useState([]);
  const [WardData, setWardData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchData = async () => {
    var response = await axiosInstance.get("BBMPCITZAPI/GetMasterZone")
    setZoneData(response.data.Table || [])
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (name === "ZoneName") {
      var response = await axiosInstance.get("BBMPCITZAPI/GetMasterWard?ZoneId=" + value)
      setWardData(response.data.Table || [])
    }
    if (name === "WardName") {
        setLoading(true);
      var response = await axiosInstance.get("BBMPCITZAPI/LOAD_BBD_RECORDS_BY_WARD?ZoneId=" + formData.ZoneName + "&WardId=" + value)
      setPropertyData(response.data.Table || [])
      setLoading(false);
    }
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSearch = async () => {
    debugger
    if(formData.ZoneName === ""){
        
    }
    if(formData.WardName === ""){}
        if(formData.SelectType === "0"){}
        if(formData.Search){}
    var response = await axiosInstance.get("BBMPCITZAPI/LOAD_BBD_RECORDS?ZoneId="+formData.ZoneName+"&WardId="+formData.WardName+"&SerachType="+formData.SelectType+"&Search="+formData.Search+"")
      setPropertyData(response.data.Table || [])
  }
  const handleReset = (e) => {
    const { name, value } = e.target;
    setPropertyData([]);
    setFormData({
        ...formData,
        [name]: ""
      });
  }

  const { t } = useTranslation();

  const handleNavigation = () => {
    navigate('/AddressDetails')
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function GradientCircularProgress() {
    return (
      <React.Fragment>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
      </React.Fragment>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <GradientCircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ backgroundColor: '#f0f0f0', padding: 4, borderRadius: 2, mt: 8 }}>
        <ToastContainer />
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            fontFamily: "sans-serif",
            marginBottom: 3,
            color: '#1565c0',
            fontSize: {
              xs: '1.5rem',
              sm: '2rem',
              md: '2.5rem',
            }
          }}
        >
          ಅಪೂರ್ಣ ಆಸ್ತಿ ವಿವರಗಳ ಪಟ್ಟಿ
        </Typography>
        <Grid container spacing={4} alignItems={"center"}>
          <Grid item xs={12} sm={4} md={3}>
            <FormControl
              fullWidth
              sx={{ marginBottom: 3 }}
            >
              <InputLabel>Zone Name :</InputLabel>
              <Select
                name="ZoneName"
                value={formData.ZoneName}
                onChange={handleChange}
              >
                <MenuItem value="">--Select--</MenuItem>
                {zoneData.map((item) => (
                  <MenuItem key={item.ZONEID} value={item.ZONEID}>
                    {item.ZONENAME}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <FormControl
              fullWidth
              sx={{ marginBottom: 3 }}
            >
              <InputLabel>Ward Name :</InputLabel>
              <Select
                name="WardName"
                value={formData.WardName}
                onChange={handleChange}
              >
                <MenuItem value="">--Select--</MenuItem>
                {WardData.map((item) => (
                  <MenuItem key={item.WARDID} value={item.WARDID}>
                    {item.WARDNAME}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <FormControl
              fullWidth
              sx={{ marginBottom: 3 }}
            >
              <InputLabel>Search Type :</InputLabel>
              <Select
                name="SelectType"
                value={formData.SelectType}
                onChange={handleChange}
              >
                <MenuItem value="0">--Select--</MenuItem>
                <MenuItem value="1">Property Id</MenuItem>
                <MenuItem value="2">Owner Name</MenuItem>
                <MenuItem value="3">Assessment No</MenuItem>
                <MenuItem value="4">Property Address</MenuItem>
                <MenuItem value="5">Sas Application No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
  <TextField
    label="Search"
    name="Search"
    value={formData.Search}
    onChange={handleChange}
    fullWidth
    sx={{ marginBottom: 3 }}
  />
</Grid>
          <Box display="flex" justifyContent="center" gap={2} mt={6} width="100%">
  <Button variant="contained" color="success" onClick={handleSearch}>
    Search
  </Button>
  <Button variant="contained" color="primary" onClick={handleReset}>
    Reset
  </Button>
</Box>
        </Grid>
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Sl No</TableCell>
                <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Property Id</TableCell>
                <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Assessment No</TableCell>
                <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Address</TableCell>
                <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>SAS ApplicationNo</TableCell>
                <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Owner Name</TableCell>
                <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Open Property</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {propertyData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={12} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                propertyData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell>{row.PROPERTYID}</TableCell>
                      <TableCell>{row.ASSESMENTNUMBER}</TableCell>
                      <TableCell>{row.ADDRESS}</TableCell>
                      <TableCell>{row.SASAPPLICATIONNO}</TableCell>
                      <TableCell>{row.OWNERNAME}</TableCell>
                      <TableCell><Link href="" underline="hover" onClick={handleNavigation}>Click Here</Link></TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={propertyData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Container>
  );
};

export default BBDDraft;
