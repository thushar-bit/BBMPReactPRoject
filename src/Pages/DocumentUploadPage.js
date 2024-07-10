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
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

const DocumentUploadPage = () => {
  
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [tablesdata3,setTablesData3] = useState([]);
  const [tablesdata4,setTablesData4] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
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
    const response1 = await axiosInstance.get('BBMPCITZAPI/GetMasterDocByCategoryOrClaimType?ULBCODE=555&CATEGORYID=1');
    const response2 = JSON.parse(sessionStorage.getItem('NCL_TEMP_API'));
    debugger
        const {Table1} = response1.data;
        const {  Table15 :NCLTable15  } = response2.data;
        setTableData( NCLTable15.length > 0 ? NCLTable15 : []);
        setTablesData2(Table1.length > 0 ? Table1 : []);
       
  }
  const handleFileChange = (e) => {
    if (!isEditable) return;
    setSelectedFile(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(file);
    //    setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
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
         Title and Support Documents 
        </Typography>
        <Grid container spacing={4}>
         
         
          <Grid item xs={12} sm={4}>
          <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <InputLabel>Document Type :</InputLabel>
        <Select
          name="DocumentType"
          value={formData.DocumentType}
          onChange={handleChange}
        >
          <MenuItem value="">--Select--</MenuItem>
          {tablesdata2.map((item) => (
            <MenuItem key={item.DOCUMENTTYPEID} value={item.DOCUMENTTYPEID}>
              {item.DOCUMENTTYPEDESCRIPTION_EN}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label={"Document Registered Date (dd-mm-yyyy)"}
              placeholder='dd-mm-yyyy'
              name="DocumentDetails"
              value={formData.DocumentDetails}
              onChange={handleChange}
              InputProps={{
                readOnly:true,
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
         
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              variant='filled'
              label={"Document Details:"}
              placeholder='Document Details'
              name="DocumentDetails"
              value={formData.DocumentDetails}
              onChange={handleChange}
              InputProps={{
                readOnly:true,
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
            
              label={"Document Number :"}
              name="TotalArea"
              value={formData.TotalArea}
              onChange={handleChange}
              InputProps={{
               
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
          <Box display="flex" alignItems="center">
              <Typography variant="body1" sx={{ ml: 1 }}>
              {t("uploadPropertyPhoto")}
              </Typography>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{ ml: 2 }}
                disabled={!isEditable}
              >
                {t("Uploadfile")}
                <VisuallyHiddenInput type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} />
              </Button>
       
            </Box>
          </Grid>
          </Grid>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Documents Uploaded
              </Typography>
              <TableContainer component={Paper} sx={{ mt: 4 }}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>Sl No.</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>Document</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>Document Details</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>Document Number</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>Document Registered Date</TableCell>
        {/* <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>Uploaded Document</TableCell> */}
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>Delete</TableCell>
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
            <TableCell>{row.DOCUMENTID}</TableCell>
            <TableCell>{row.DOCUMENTTYPEDESCRIPTION}</TableCell>
            <TableCell>{row.DOCUMENTDETAILS}</TableCell>
            <TableCell>{row.ORDERNUMBER}</TableCell>
            <TableCell>{row.ORDERDATE}</TableCell>
            {/* <TableCell>{row.BUILTYEAR}</TableCell>  images download*/}
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

export default DocumentUploadPage;
