import React, { useState, useEffect ,useCallback} from 'react';
import {
  TextField, Button, Grid, Box, Container, Typography, CircularProgress, Dialog, DialogContent,DialogActions,
  FormControl, MenuItem, Select, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TablePagination,RadioGroup,FormControlLabel,Radio
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../components/Axios';

const PendanceReport = () => {
  const [formData, setFormData] = useState({
    ZoneName: "",
    WardName: "",
    SelectType: "",
    Search: ""
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formattedDate,setFormattedDate] = useState("")
  const [propertyData, setPropertyData] = useState([]);
  const [zoneData, setZoneData] = useState([]);
  const [WardData, setWardData] = useState([]);
  const [page, setPage] = useState(0);
  const [pdfUrl, setPdfUrl] = useState('');
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [LoginData,setLoginData] = useState("")
  const { t } = useTranslation();
  
  const fetchData = useCallback(async (page = 1, rowsPerPage = 10) => {
    debugger
    setLoading(true)
    try {
      let response = await axiosInstance.get("BBMPCITZAPI/GetMasterZone")
      setZoneData(response.data.Table || [])
      
      var response1 = await axiosInstance.get("BBMPCITZAPI/GetMasterWard?ZoneId=" + 101)
      setWardData(response1.data.Table)
   debugger
     
      setPropertyData([])
      const today = new Date(); // Get current date
      setFormattedDate(`${String(today.getDate()).padStart(2, "0")}-${String(
      today.getMonth() + 1
  ).padStart(2, "0")}-${today.getFullYear()}`)
      setLoading(false)
      
      setLoginData(JSON.parse(sessionStorage.getItem('LoginData')))
    } catch (error) {
      navigate('/ErrorPage', { state: { errorMessage: error.message, errorLocation: window.location.pathname } });
    }
    setFormData(prevData => ({
      ...prevData,
      ZoneName: JSON.parse(sessionStorage.getItem('DraftZoneId')),
      WardName: JSON.parse(sessionStorage.getItem('DraftWardId'))
    }));
  }, [navigate]);

  useEffect( () => {
    sessionStorage.setItem("userProgress", 2);
    fetchData();
  }, [fetchData]);

const handleChange = () => {

}
 const handleBack = () => {

 }
 const handleSearch = () => {

 }
const handleReset = () => {

}
const getBBDRecord = () => {

}
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

  if (false) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <GradientCircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ backgroundColor: '#f0f0f0', padding: 1, borderRadius: 2, mt: 1 }}>
        <ToastContainer />
       
          
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            fontFamily: "sans-serif",
          
            color: '#1565c0',
            fontSize: {
              xs: '1.5rem',
              sm: '2rem',
              md: '2.5rem',
            }
          }}
        >
          {/* {t("PendingPropertyList")} */}
         Pendance Report as on - {formattedDate}
        </Typography>
        
       
                <Grid item xs={6} sm={3}         align="center">
          <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
            <RadioGroup row name="TypeOfUpload" value={formData.TypeOfUpload} onChange={handleChange}>
              <FormControlLabel value="RegistrationNumber" control={<Radio />} label={"Based on Zone And ARO Report"} />
              <FormControlLabel value="OldRegistrationNumber" control={<Radio />} label={
                 <>
               {"Based on Zone and Ward Report"}
                {/* <Typography component="span" style={{ color: 'red' }}>
        {t("CaseRefertoARO")}
      </Typography> */}
                </>
              }
                />
              {/* <FormControlLabel value="DoNotHaveRegistrationDeed" control={<Radio />} label={
    <>
      {t("DoNotHaveRegistrationDeed")}{" "}
      <Typography component="span" style={{ color: 'red' }}>
        {t("CaseRefertoARO")}
      </Typography>
    </>
  }
/> */}
            </RadioGroup>
          </FormControl>
          
        </Grid>

        <Grid container spacing={5} alignItems={"center"}>
          <Grid item xs={12} sm={5} md={4}>
            <FormControl
              fullWidth
              sx={{ marginBottom: 3 }}
            >
              <InputLabel>{t("ZoneName")}</InputLabel>
              <Select
                name="ZoneName"
                value={formData.ZoneName}
                onChange={handleChange}
                sx={{ backgroundColor: "#ffff" }}
              
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
          <Grid item xs={12} sm={3} md={4}>
            <FormControl
              fullWidth
              sx={{ marginBottom: 3 }}
            >
              <InputLabel>{t("ARO Name")}</InputLabel>
              <Select
                name="SelectType"
                sx={{ backgroundColor: "#ffff" }}
               
                value={formData.SelectType}
                onChange={handleChange}
              >
                <MenuItem value="0">--Select--</MenuItem>
                <MenuItem value="1">Property EPID</MenuItem>
                <MenuItem value="2">Owner Name</MenuItem>
                <MenuItem value="3">Assessment No</MenuItem>
                <MenuItem value="4">Property Address</MenuItem>
                <MenuItem value="7">Book No</MenuItem> 
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} md={4}>
            <FormControl
              fullWidth
              sx={{ marginBottom: 3 }}
            >
              <InputLabel>{t("WardName")}</InputLabel>
              <Select
                name="WardName"
                value={formData.WardName}
                onChange={handleChange}
                sx={{ backgroundColor: "#ffff" }}
               
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
         
         
          
          <Box display="flex" justifyContent="center" gap={2} mt={0.1} width="100%">
         
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
        </TableRow>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }} colSpan={3} align='center' ></TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }} colSpan={4} align='center' >      No of ekhata Application Pending with</TableCell>
              
               
              <TableRow>
              <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }} colSpan={1} align='center' >Zone Name</TableCell> 
              <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }} colSpan={1} align='center' >ARO Name</TableCell> 
              <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' , borderRight: '4px solid #ddd' }} colSpan={1} align='center' >Ward Name</TableCell> 
                <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }} colSpan={1} align='center' >Case Worker</TableCell> 
                <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }} colSpan={1} align='center' >ARO</TableCell>
                <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }} colSpan={1} align='center' >RO</TableCell>
                <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}colSpan={1} align='center' >Total</TableCell>
                
              </TableRow>
            </TableHead>
            {/* <TableBody>
              {propertyData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={12} align="center">
                    {t("Nodataavailable")}
                  </TableCell>
                </TableRow>
              ) : (
                propertyData
                  .map((row, index) => (
                    <TableRow key={index} style={{ height: '0.1em' }}>
                      <TableCell>{(page * rowsPerPage) + index + 1}</TableCell> 
                      <TableCell style={{ padding: '0.5em 1em' }} >23</TableCell>
                      <TableCell style={{ padding: '0.5em 1em' }}>23</TableCell>
                     
                      
                       
                      <TableCell style={{ padding: '0.5em 1em' }}>223</TableCell>
                      <TableCell style={{ width: '10rem',height:"0.1rem" }}>32</TableCell>
                      <TableCell style={{ padding: '0.5em 1em' }}>23</TableCell>
                     
                    </TableRow>
                  ))
              )}
            </TableBody> */}
            <TableBody>
             
                    <TableRow  style={{ height: '0.1em' }}>
                    
                      <TableCell style={{ padding: '0.5em 1em' }} colSpan={1} align='center' >RajarajeshwariNagar</TableCell>
                      <TableCell style={{ padding: '0.5em 1em' }}colSpan={1} align='center' >RAJARAJESHWARINAGAR</TableCell>
                     
                      <TableCell style={{ padding: '0.5em 1em' }}colSpan={1} align='center' >129 - Jnanabharathi ward</TableCell>
                      
                       
                      <TableCell style={{ padding: '0.5em 1em' }}colSpan={1} align='center' >212312312312323</TableCell>
                      <TableCell style={{ width: '10rem',height:"0.1rem" }}colSpan={1} align='center' >31231231232</TableCell>
                      <TableCell style={{ padding: '0.5em 1em' }}colSpan={1} align='center' >21231231233</TableCell>
                      <TableCell style={{ padding: '0.5em 1em' }}colSpan={1} align='center' >21231231233</TableCell>
                    </TableRow>
             
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
  rowsPerPageOptions={[10, 25, 50, 100]}
  component="div"
  count={propertyData.length > 0 ? propertyData[0].TOTAL_COUNT : 10} 
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={ async (event, newPage) => {
    setPage(newPage);
  await  getBBDRecord(newPage + 1, rowsPerPage); 
  }}
  onRowsPerPageChange={ async(event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
   await  getBBDRecord(1, parseInt(event.target.value, 10)); 
  }}
  labelRowsPerPage="Properties per Page:"
  labelDisplayedRows={({ from, to, count }) => 
    `Properties: ${from}–${to} of ${count !== -1 ? count : `more than ${to}`} `
  }
/>

      </Box>
    </Container>
  );
};

export default PendanceReport;
