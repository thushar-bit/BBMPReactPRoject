import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Grid, Box, Container, Typography, CircularProgress,
  FormControl, MenuItem, Select, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TablePagination
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../components/Axios';
import ErrorPage from './ErrorPage';
import '../components/Shake.css';

const BBDDraft = () => {
  const [formData, setFormData] = useState({
    ZoneName: "",
    WardName: "",
    SelectType: "",
    Search: ""
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [propertyData, setPropertyData] = useState([]);
  const [zoneData, setZoneData] = useState([]);
  const [WardData, setWardData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { t } = useTranslation();
  const fetchData = async () => {
    var response = await axiosInstance.get("BBMPCITZAPI/GetMasterZone")
    setZoneData(response.data.Table || [])
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = async (e) => {
    try {

      const { name, value } = e.target;
      if (name === "ZoneName") {
        var response = await axiosInstance.get("BBMPCITZAPI/GetMasterWard?ZoneId=" + value)
        setWardData(response.data.Table)
      }

      if (name === "WardName") {
        setLoading(true);
        var response = await axiosInstance.get(`BBMPCITZAPI/LOAD_BBD_RECORDS?ZoneId=${formData.ZoneName}&WardId=${424057}&SerachType=${0}&Search=${"thushar"}`)
        setPropertyData(response.data.Table || [])

        setLoading(false);
      }
      setFormData({
        ...formData,
        [name]: value
      });
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  };

  const handleSearch = async () => {

    if (formData.ZoneName === "") {
      toast.error(`${t("selectZone")}`)
      return
    }
    if (formData.WardName === "") {
      toast.error(`${t("selectWard")}`);
      return
    }
    if (formData.SelectType === "") {
      toast.error(`${t("enterSearchType")}`)
      return
    }
    else {
      if (formData.Search.length === 0) {
        toast.error(`${t("enterSearchText")}`);
        return
      }
      else {
        var response = await axiosInstance.get("BBMPCITZAPI/LOAD_BBD_RECORDS?ZoneId=" + formData.ZoneName + "&WardId=" + formData.WardName + "&SerachType=" + formData.SelectType + "&Search=" + formData.Search + "")
        setPropertyData(response.data.Table || [])
      }
    }
  }
  const handleReset = () => {


    setPropertyData([]);
    setFormData({
      ...formData,
      ZoneName: "",
      WardName: "",
      SelectType: "",
      Search: ""
    });
  }



  const handleNavigation = async (row) => {
    //  navigate('/AddressDetails')
debugger

    const response3 = await axiosInstance.get(`BBMPCITZAPI/Get_Ctz_ObjectionModPendingAppl?LoginId=crc&propertycode=${row.PROPERTYCODE}&propertyid=${row.PROPERTYID}`);

    if (response3.data === "There is a issue while copying the data from Book Module.No Data Found") {

      //future the propertyid will come from bbddraft page 
      sessionStorage.setItem('SETPROPERTYCODE', JSON.stringify(row.PROPERTYCODE));
      const response1 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_BBD_DRAFT?UlbCode=555&propertyid=' + JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')) + '');
      
      sessionStorage.setItem('SETPROPERYID', row.PROPERTYID);
      setTimeout(() => {
        // navigate('/BBDDraft');

        navigate('/AddressDetails')
      }, 500);
    }
    else {
      sessionStorage.setItem('P_BOOKS_PROP_APPNO', JSON.stringify(response3.data.P_BOOKS_PROP_APPNO || 0));
      sessionStorage.setItem('SETPROPERTYCODE', JSON.stringify(response3.data.PropertyId || 0));
      try {
        const response1 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_BBD_DRAFT?UlbCode=555&propertyid=' + JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')) + '');
        const response2 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP?ULBCODE=555&P_BOOKS_PROP_APPNO=' + JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO')) + '&Propertycode=' + JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')) + '');

       
        setTimeout(() => {
          // navigate('/BBDDraft');
          navigate('/AddressDetails')
        }, 500);

      } catch (error) {

        navigate('/ErrorPage', { state: { errorMessage: error.message, errorLocation: window.location.pathname } });
      }
    }
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
          {t("PendingPropertyList")}
        </Typography>
        <Grid container spacing={4} alignItems={"center"}>
          <Grid item xs={12} sm={4} md={3}>
            <FormControl
              fullWidth
              sx={{ marginBottom: 3 }}
            >
              <InputLabel>{t("ZoneName")}</InputLabel>
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
              <InputLabel>{t("WardName")}</InputLabel>
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
              <InputLabel>{t("SearchType")}</InputLabel>
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
              label={t("Search")}
              name="Search"
              value={formData.Search}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 3 }}
            />
          </Grid>
          <Box display="flex" justifyContent="center" gap={2} mt={6} width="100%">
            <Button variant="contained" color="success" onClick={handleSearch}>
              {t("Search")}
            </Button>
            <Button variant="contained" color="primary" onClick={handleReset}>
              {t("Reset")}
            </Button>
          </Box>
        </Grid>
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Sl No</TableCell>
                <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("PropertyID")}</TableCell>
                <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("AssessmentNo")}</TableCell>
                <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("Address")}</TableCell>
                <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("SASApplicationNo")}</TableCell>
                <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("OwnerName")}</TableCell>
                <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>{t("OpenProperty")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {propertyData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={12} align="center">
                    {t("Nodataavailable")}
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
                      <TableCell><Button color="primary" onClick={() => handleNavigation(row)}>{t("ClickHere")}</Button></TableCell>
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
