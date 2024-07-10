import React, { useState,useEffect } from 'react';
import {
  TextField, Button, Grid, Box, Container, Typography, Tooltip, IconButton,
  FormControl, MenuItem, Select, InputLabel,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../components/Axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BuildingDetails = () => {
  const [formData, setFormData] = useState({
    BuildingNumber: '',
  BuildingName: '',
  floornumber: "",
  features: '',
  Typeofuse: '',
  yearOfConstruction: '',
  SelfuseArea: 0,
  RentedArea: 0,
  TotalArea: '',
  BesomCustomerID: '',
  BWSSBMeterNumber: ''
  });
  const [tableData, setTableData] = useState([
  ]);
  const navigate = useNavigate();
 // const [loading,setLoading] = useState([]);
  const [tablesdata2,setTablesData2] = useState([]);
  const [tablesdata3,setTablesData3] = useState([]);
  const [tablesdata4,setTablesData4] = useState([]);
  const handleChange =  async (e) => {
    const { name, value } = e.target;
    debugger
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
      if (name === 'SelfuseArea' || name === 'RentedArea') {
        const selfuseAreaValue = name === 'SelfuseArea' ? value : formData.SelfuseArea;
        const RentedAreaValue = name === 'RentedArea' ? value : formData.RentedArea;
        const totalArea = Math.round(parseInt(selfuseAreaValue) + parseInt(RentedAreaValue));
        formData.TotalArea = totalArea;
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

  const { t } = useTranslation();
  const fetchData = async () => {
    const response1 = await axiosInstance.get('BBMPCITZAPI/GetMasterTablesData?UlbCode=555');
    const response2 = JSON.parse(sessionStorage.getItem('NCL_TEMP_API'));
    const {  Table15,Table16   } = response1.data;
    debugger
        const {  Table14   } = response2.data;
        const table1Item = Table14.length > 0 ? Table14 : [];
        const table16Item = Table16.length > 0 ? Table16 : [];
        const table15Item = Table15.length > 0 ? Table15 : [];
        setTableData(table1Item);
        setTablesData2(table16Item);
        setTablesData4(table15Item);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger
    var BUILDINGUSAGETYPEID= 0;
    if (formData.RentedArea === 0)
      {
          BUILDINGUSAGETYPEID = 4;
      }
      else if (formData.SelfuseArea === 0)
      {
          BUILDINGUSAGETYPEID = 5;
      }
      else if (formData.SelfuseArea !== 0 && formData.SelfuseArea !== 0)
      {
          BUILDINGUSAGETYPEID = 6;
      }
    const data = {
      propertyCode: 104931,
      floornumberid: 23,
      createdby: "crc",
      buildingusagetypeid: BUILDINGUSAGETYPEID,
      ulbcode: 555,
      featureheadid: formData.features,
      featureid: formData.Typeofuse,
      builtyear: formData.yearOfConstruction,
      rrno: formData.BesomCustomerID,
      watermeterno: formData.BWSSBMeterNumber,
      buildingnumberid: formData.buildingnumberid ? "" :1,
      buildingblockname: formData.BuildingName,
      ownUseArea: formData.SelfuseArea,
      rentedArea: formData.RentedArea,
}
debugger
try {
  await  axiosInstance.post('BBMPCITZAPI/DEL_INS_SEL_NCL_PROP_BUILDING_TEMP?ULBCODE=555', data
   )
  
   const response1 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP?UlbCode=555&propertyid=104931');
   sessionStorage.setItem('NCL_TEMP_API', JSON.stringify(response1));
  await toast.success("Details Saved Successfully", {
     position: "top-right",
     autoClose: 5000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
   });
   //setLoading(false);
 
 } catch (error) {
await   toast.error("Error saving data!" + error, {
     position: "top-right",
     autoClose: 5000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
   });
 }

  };
  const back = () => {
    navigate('/AreaDimension/building')
  }
  const handleNavigation= () =>{
    debugger
    navigate('/OwnerDetails');
    
  }
  const handleDelete = async (id) => {
    debugger
    const data = {
      propertyCode: 104931,
      buildingnumberid: id.BUILDINGBLOCKID,
      floornumberid: id.FLOORNUMBERID,
    }
    try {
     await  axiosInstance.post('BBMPCITZAPI/DEL_SEL_NCL_PROP_BUILDING_TEMP?ULBCODE=555', data
       )
       const response1 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP?UlbCode=555&propertyid=104931');
       sessionStorage.setItem('NCL_TEMP_API', JSON.stringify(response1));
      await toast.success("Details Delete Successfully", {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
       });
       //setLoading(false);
     
     } catch (error) {
    await   toast.error("Error Deleting data!" + error, {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
       });
     }
  };

  const handleEdit = async (row) => {
    if(row.FEATUREHEADID !== null && row.FEATUREHEADID !== ""){
      debugger
     const response3 =  await axiosInstance.get(`BBMPCITZAPI/GetNPMMasterTable?FeaturesHeadID=${row.FEATUREHEADID}`);
     if (response3.data.Table.length > 0) {
      setTablesData3(response3.data.Table);
    }
     }
    setFormData({
      BuildingNumber: row.BUILDINGBLOCKID || '',
      BuildingName: row.BUILDINGBLOCKNAME || '',
      floornumber: row.FLOORNUMBERID|| '',
      features: row.FEATUREHEADID || '',
      Typeofuse: row.FEATUREID || '',
      yearOfConstruction: row.BUILTYEAR || '',
      SelfuseArea: row.AREA || 0,
      RentedArea: row.RENTEDAREA || 0,
      TotalArea: row.TOTALAREA || '',
      BesomCustomerID: row.RRNO|| '',
      BWSSBMeterNumber: row.WATERMETERNO|| ''
    });
  };
  useEffect(() => {
    
    fetchData();
        
  }, []);
  console.log(formData.propertyType)
  return (
    <Container maxWidth="xl">
        <ToastContainer/>
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
              name="BuildingNumber"
              value={formData.BuildingNumber}
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
                endAdornment: (
                  <Tooltip title={t("cityInfo")}>
                     <IconButton color="primary">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                )
              }}
              label={"Building Name :"}
              name="BuildingName"
              value={formData.BuildingName}
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
            <MenuItem key={item.FLOORNUMBERID} value={item.FLOORNUMBERID}>
              {item.FLOORNUMBER_EN}
            </MenuItem>
          ))}
            </Select>
          </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
          <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <InputLabel>Features :</InputLabel>
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
              placeholder='yyyy'
              
              name="yearOfConstruction"
              value={formData.yearOfConstruction}
              onChange={handleChange}
              InputProps={{
                maxLength: 4 ,
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
              name="SelfuseArea"
                  type="number"
              value={formData.SelfuseArea}
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
              name="RentedArea"
                  type="number"
              value={formData.RentedArea}
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
              name="TotalArea"
              value={formData.TotalArea}
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
              name="BesomCustomerID"
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
            <TextField
              fullWidth
              label={"BWSSB Meter Number :"}
              name="BWSSBMeterNumber"
              value={formData.BWSSBMeterNumber}
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
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>Building Number</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>Building Name</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>Floor Number</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>Usage Category</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>Type of use(Sub Category)</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>Year of Construction</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>Self Use Area</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>Rented Area</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>Total Area</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>BESCOM Customer ID :</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>ಬಿ ಡಬ್ಲ್ಯೂ ಎಸ್ ಎಸ್ ಬಿ ಮೀಟರ್ ಸಂಖ್ಯೆ :</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Edit</TableCell>
         <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Delete</TableCell> 
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
            <TableCell>{row.BUILDINGBLOCKID}</TableCell>
            <TableCell>{row.BUILDINGBLOCKNAME}</TableCell>
            <TableCell>{row.FLOORNUMBER}</TableCell>
            <TableCell>{row.FEATUREHEADNAME}</TableCell>
            <TableCell>{row.FEATURENAME}</TableCell>
            <TableCell>{row.BUILTYEAR}</TableCell>
            <TableCell>{row.AREA}</TableCell>
            <TableCell>{row.RENTEDAREA}</TableCell>
            <TableCell>{row.TOTALAREA}</TableCell>
            <TableCell>{row.RRNO}</TableCell>
            <TableCell>{row.RRNO} {row.WATERMETERNO}</TableCell>
            <TableCell>
                  <Tooltip title="Edit">
                    <IconButton color="primary" onClick={() => handleEdit(row)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title="Delete">
                    <IconButton color="secondary" onClick={() => handleDelete(row)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
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
