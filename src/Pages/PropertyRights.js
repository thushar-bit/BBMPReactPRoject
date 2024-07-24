import React, { useState ,useEffect} from 'react';
import {
   Button, Box, Container, Typography, Tooltip, IconButton,Grid,TextField,
  //FormControl, MenuItem, Select, InputLabel, Radio, RadioGroup, FormControlLabel,
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
const PropertyRights = () => {
  const [formData, setFormData] = useState({
   
    propertyrights:""
    
  });

  const [tableData, setTableData] = useState([]);
  const [IDBASICPROPERTY, setIDBASICPROPERTY] = useState(0);
  const [Propertyrightsid, setPropertyrightsid] = useState(0);

  const [isEditable, setIsEditable] = useState(false);
  const navigate = useNavigate();
  const handleEdit = async (row) => {
    setIsEditable(true);
    setPropertyrightsid(row.PROPERTYRIGHTSID)
    setFormData({
       propertyrights:row.RIGHTS || ""
    });
  };
  const handleDelete = async (row) => {
   
     try {
      await axiosInstance.get("BBMPCITZAPI/NCL_PROPERTY_RIGHTS_TEMP_DEL?RIGHTSID="+row.PROPERTYRIGHTSID+"&ID_BASIC_PROPERTY="+IDBASICPROPERTY+"&ULBCODE="+555+"&PROPERTYCODE="+1135783)
      
     const response1 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP?ULBCODE=555&EIDAPPNO=701&Propertycode=1135783');
     sessionStorage.setItem('NCL_TEMP_API', JSON.stringify(response1));
    await toast.error("Details Deleted Successfully", {
       position: "top-right",
       autoClose: 5000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
     });
     }
     catch(error){
      toast.error("Error saving data!" + error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate('/ErrorPage', { state: { errorMessage: error.message,errorLocation:window.location.pathname } });
      }, 2000);
     }
  };


  const { t } = useTranslation();

  
  const handleChange = async (e) => {
    const { name, value } = e.target;
   
    setFormData({
      ...formData,
      [name]: value
    });
    
  };
  
  const fetchData = async () => {
    const response1 = JSON.parse(sessionStorage.getItem('NCL_TEMP_API'));
        const {  Table1=[], Table11=[]  } = response1.data;
        const tableItem = Table1.length > 0 ? Table1[0] : [];
        const table1Item = Table11.length > 0 ? Table11 : [];
        setTableData(table1Item);
        setIDBASICPROPERTY(tableItem.ID_BASIC_PROPERTY)
  }
  useEffect(() => {
    fetchData();
  }, []);
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    if(isEditable === false){
   const data = {
    rights: formData.propertyrights,
    propertycode: 1135783,
    createdby: "crc",
    ulbcode:555,
    eidappno:701
   }
   try {
    await axiosInstance.post("BBMPCITZAPI/NCL_PROPERTY_RIGHTS_TEMP_INS?ID_BASIC_PROPERTY="+IDBASICPROPERTY,data)
    
   const response1 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP?ULBCODE=555&EIDAPPNO=701&Propertycode=1135783');
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
   setTimeout(() => {
    window.location.reload();
//    handleNavigation()
  }, 2000);
   }
   catch(error){
    toast.error("Error saving data!" + error, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      navigate('/ErrorPage', { state: { errorMessage: error.message,errorLocation:window.location.pathname } });
    }, 2000);
   }
  }
   else {
    const data = {
      rights: formData.propertyrights,
      propertyrightsid:Propertyrightsid,
      propertycode: 1135783,
      createdby: "crc",
      ulbcode:555,
      eidappno:701
     }
     try {
      await axiosInstance.post("BBMPCITZAPI/NCL_PROPERTY_RIGHTS_TEMP_UPD?ID_BASIC_PROPERTY="+IDBASICPROPERTY,data)
      
     const response1 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP?ULBCODE=555&EIDAPPNO=701&Propertycode=1135783');
     sessionStorage.setItem('NCL_TEMP_API', JSON.stringify(response1));
    await toast.success("Details Updated Successfully", {
       position: "top-right",
       autoClose: 5000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
     });
     setTimeout(() => {
      window.location.reload();
 //    handleNavigation()
    }, 2000);
     }
     catch(error){
      toast.error("Error saving data!" + error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate('/ErrorPage', { state: { errorMessage: error.message,errorLocation:window.location.pathname } });
      }, 2000);
     }
   }
  };
 

  const back = () => {
    navigate('/OwnerDetails');
  };
 
  const handleNavigation = () => {
   
      navigate('/DocumentUploadPage');
  
  };

  console.log(formData.propertyType);

  return (
    <Container maxWidth="lg">
         <ToastContainer/>
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
            Property Rights
          </Typography>
          <Grid container spacing={2} alignItems="center">
      <Grid item xs={9}>
        <TextField
          fullWidth
          label="Property Rights:"
          name="propertyrights"
          value={formData.propertyrights}
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
      {isEditable && (
      <Grid item xs={3} style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          variant="contained"
          color="warning"
          type="submit"
          style={{ height: '100%' }}
        >
          Update
        </Button>
      </Grid>
      )}
       {(isEditable === false) && (
      <Grid item xs={3} style={{ display: 'flex', alignItems: 'center' }}>
      <Button
        variant="contained"
        color="success"
        type="submit"
        style={{ height: '100%' }}
      >
        Save
      </Button>
    </Grid>
       )}
    </Grid>
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
               
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>PROPERTY RIGHTS NO</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>PROPERTY RIGHTS</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>EDIT</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>DELETE</TableCell>
                
                </TableRow>
              </TableHead>
              <TableBody>
              {tableData.length === 0 ? (
        <TableRow>
          <TableCell colSpan={10} align="center">
            No data available
          </TableCell>
        </TableRow>
      ) : (
        tableData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.PROPERTYRIGHTSID}</TableCell>
            <TableCell>{row.RIGHTS}</TableCell>
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
            <Button variant="contained" color="primary" onClick={handleNavigation}>
              Next
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default PropertyRights;
