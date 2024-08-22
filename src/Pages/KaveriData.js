import React, { useState } from 'react';
import {
  Button, Box, Container, Typography, Tooltip, IconButton, Grid, TextField,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../components/Axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/Shake.css';
const KaveriData = () => {
  const [formData, setFormData] = useState({
    RegistrationNumber: "",
    ECDocumentNumber:""
  });
  const [TableKavDocData,setTableKavDocData] = useState([]);
  const [EcDocumentBase64,setEcDocumentBase64] = useState("");
 
  const navigate = useNavigate();
  
  const handleKaveriDocumentData = async () => {
    if(formData.RegistrationNumber.length === 0){
        toast.error("Please Enter the Registration Number");
        return
    }
    try {
       let response =  await axiosInstance.get(`KaveriAPI/GetKaveriDocData?RegistrationNoNumber=${formData.RegistrationNumber}&BOOKS_APP_NO=${JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))}&PropertyCode=${JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))}&LoginId=32`)
       const result = response.data;
       
       if(result.success)
        {
            setTableKavDocData(result.data);
        }
        else {
            toast.error(result.message)
            return
        }
   
       
       toast.success("Details Fetched Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
   
    }
    catch (error) {
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
        navigate('/ErrorPage', { state: { errorMessage: error.message, errorLocation: window.location.pathname } });
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


  const handleECPropertyData = async () => {
    if(formData.ECDocumentNumber.length === 0){
      toast.error("Please Enter the EC Document Number")
    }
      try {
        let response = await axiosInstance.get("KaveriAPI/GetKaveriECData?ECNumber=NMG-EC-A-000648-2023-24&BOOKS_APP_NO=23&PropertyCode=23&LoginId=asd")
        setEcDocumentBase64(response.data)
         toast.success("Details Fetched Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      catch (error) {
        toast.error("Error Getting EC Property data!" + error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate('/ErrorPage', { state: { errorMessage: error.message, errorLocation: window.location.pathname } });
        }, 2000);
      }
    }
  const back = () => {
    navigate('/OwnerDetails');
  };

  const handleNavigation = () => {
    if(TableKavDocData !== undefined && TableKavDocData !== null){
      if(TableKavDocData.length === 0)
        {
      navigate('/DocumentUploadPage');
    }else {
      navigate("/ClassificationDocumentUploadPage")
    }
  }
    
  };



  return (
    <Container maxWidth="lg">
      <ToastContainer />
      <Box sx={{ backgroundColor: '#f0f0f0', padding: 4, borderRadius: 2, mt: 8 }}>
            <form>
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
                KAVERI SERVICES DATA
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={9}>
                  <TextField
                    fullWidth
                    label="Registration Number"
                    placeholder='NMG-X-XXXX-XXXX-XX'
                    name="RegistrationNumber"
                    value={formData.RegistrationNumber}
                    onChange={handleChange}
                    InputProps={{
                      style:{backgroundColor:"#ffff"},
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
                  <Grid item xs={3} style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                      variant="contained"
                      color="success"
                        onClick={handleKaveriDocumentData}
                      style={{ height: '100%' }}
                    >
                      Get Kaveri Document Data
                    </Button>
                  </Grid>
              </Grid>
              <TableContainer component={Paper} sx={{ mt: 5 }}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' , textAlignLast:"end",width:"55%"}}>Kaveri Document Data</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' ,align:"center",width:"50%" }}></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {TableKavDocData.length === 0 ? (
        <TableRow>
          <TableCell colSpan={2} align="center">
            No data available
          </TableCell>
        </TableRow>
      ) : (
         TableKavDocData.map((row) => (
          <>
            <TableRow key={`1-FinalRegistrationNumber`}>
              <TableCell style={{paddingLeft:"35%",width:"50%" ,fontWeight: 'bold'}}>Final Registration Number :</TableCell>
               <TableCell  style={{align:"center",width:"50%" }} >{row.finalregistrationnumber}</TableCell> 
            </TableRow>
            <TableRow key={`1-FinalRegistrationNumber`}>
              <TableCell style={{paddingLeft:"35%",width:"50%" ,fontWeight: 'bold'}}>Application Number :</TableCell>
               <TableCell  style={{align:"center",width:"50%"}} >{row.applicationnumber}</TableCell> 
            </TableRow>
            <TableRow key={`1-FinalRegistrationNumber`}>
              <TableCell style={{paddingLeft:"35%",width:"50%" ,fontWeight: 'bold'}}>Nature Deed :</TableCell>
               <TableCell  style={{align:"center",width:"50%"}} >{row.naturedeed}</TableCell> 
            </TableRow>
            <TableRow key={`1-FinalRegistrationNumber`}>
              <TableCell style={{paddingLeft:"35%",width:"50%" ,fontWeight: 'bold'}}>Registration Date Time :</TableCell>
               <TableCell  style={{align:"center",width:"50%"}} >{row.registrationdatetime}</TableCell> 
            </TableRow>
            </>
))
)}
 </TableBody>
    <TableHead>
      <TableRow>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF',textAlign:"end",width:"50%" }}>Property Details Data</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF',align:"right",width:"50%" }}></TableCell>
      </TableRow>
      </TableHead>
      {
  TableKavDocData.length === 0 || 
  TableKavDocData.some(record => !record.propertyinfo || record.propertyinfo.length === 0) ? (
        <TableRow>
          <TableCell colSpan={2} align="center">
            No data available
          </TableCell>
        </TableRow>
      ) : (
      

            TableKavDocData.length > 0 && TableKavDocData.map((record) => (
                record.propertyinfo && record.propertyinfo.length > 0 && record.propertyinfo.map((row, rowIndex) => (
          <>
      <TableRow key={`1-FinalRegistrationNumber`}>
              <TableCell style={{paddingLeft:"35%",width:"50%" ,fontWeight: 'bold'}}>Property Id :</TableCell>
               <TableCell  style={{align:"center",width:"50%"}} >{row.propertyid}</TableCell> 
            </TableRow>
            <TableRow key={`1-FinalRegistrationNumber`}>
              <TableCell style={{paddingLeft:"35%",width:"50%",fontWeight: 'bold'}}>DocumentId :</TableCell>
               <TableCell  style={{align:"center",width:"50%"}} >{row.documentid}</TableCell> 
            </TableRow>
            <TableRow key={`1-FinalRegistrationNumber`}>
              <TableCell style={{paddingLeft:"35%",width:"50%",fontWeight: 'bold'}}>VillageName :</TableCell>
               <TableCell  style={{align:"center",width:"50%"}} >{row.villagenamee}</TableCell> 
            </TableRow>
            <TableRow key={`1-FinalRegistrationNumber`}>
              <TableCell style={{paddingLeft:"35%",width:"50%",fontWeight: 'bold'}}>SRO Name :</TableCell>
               <TableCell  style={{align:"center",width:"50%"}} >{row.sroname}</TableCell> 
            </TableRow>
            <TableRow key={`1-FinalRegistrationNumber`}>
              <TableCell style={{paddingLeft:"35%",width:"50%",fontWeight: 'bold'}}>Hobli :</TableCell>
               <TableCell  style={{align:"center",width:"50%"}} >{row.hobli}</TableCell> 
            </TableRow>
            <TableRow key={`1-FinalRegistrationNumber`}>
              <TableCell style={{paddingLeft:"35%",width:"50%",fontWeight: 'bold'}}>ZoneName :</TableCell>
               <TableCell  style={{align:"center",width:"50%"}} >{row.zonenamee}</TableCell> 
            </TableRow>
            </>
))
))
)
}
            <TableHead>
      <TableRow>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF',textAlign:"end",width:"55%" }}>Document Owner Data</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF',align:"right",width:"50%" }}></TableCell>
      </TableRow>
      </TableHead>
      {
  TableKavDocData.length === 0 || 
  TableKavDocData.some(record => !record.partyinfo || record.partyinfo.length === 0) ? (
        <TableRow>
          <TableCell colSpan={2} align="center">
            No data available
          </TableCell>
        </TableRow>
      ) : (
        TableKavDocData.length > 0 && TableKavDocData.map((record, index) => (
            record.partyinfo && record.partyinfo.length > 0 && record.partyinfo.map((row, rowIndex) => (
          <>
      <TableRow key={`1-FinalRegistrationNumber`}>
              <TableCell style={{paddingLeft:"35%",width:"50%",fontWeight: 'bold'}}>Party Name :</TableCell>
               <TableCell  style={{align:"center",width:"50%"}} >{row.partyname}</TableCell> 
            </TableRow>
            <TableRow key={`1-FinalRegistrationNumber`}>
              <TableCell style={{paddingLeft:"35%",width:"50%",fontWeight: 'bold'}}>Id ProofType :</TableCell>
               <TableCell  style={{align:"center",width:"50%"}} >{row.idprooftypedesc}</TableCell> 
            </TableRow>
            <TableRow key={`1-FinalRegistrationNumber`}>
              <TableCell style={{paddingLeft:"35%",width:"50%",fontWeight: 'bold'}}>Party Address :</TableCell>
               <TableCell  style={{align:"center",width:"50%"}} >{row.address}</TableCell> 
            </TableRow>
            <TableRow key={`1-FinalRegistrationNumber`}>
              <TableCell style={{paddingLeft:"35%",width:"50%",fontWeight: 'bold'}}>Id ProofNumber :</TableCell>
               <TableCell  style={{align:"center",width:"70%"}} >{row.idproofnumber}</TableCell> 
            </TableRow>
            <TableRow key={`1-FinalRegistrationNumber`}>
              <TableCell style={{paddingLeft:"35%",width:"50%",fontWeight: 'bold'}}>Party Type :</TableCell>
               <TableCell  style={{align:"center",width:"50%"}} >{row.partytypename}</TableCell> 
            </TableRow>
            <TableRow key={`1-FinalRegistrationNumber`}>
              <TableCell style={{paddingLeft:"35%",width:"50%",fontWeight: 'bold'}}>Admission Date :</TableCell>
               <TableCell  style={{align:"center",width:"50%"}} >{row.admissiondate}</TableCell> 
            </TableRow>
            </>
))
))
)
}
           
  </Table>
</TableContainer>
<br></br>
<br></br>
<br></br>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={9}>
                  <TextField
                    fullWidth
                    label="EC Document Number"
                    name="ECDocumentNumber"
                     placeholder='NMG-EC-A-XXXXXX-XXXX-XX'
                    value={formData.ECDocumentNumber}
                    onChange={handleChange}
                    InputProps={{
                      style:{backgroundColor:"#ffff"},
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
                  <Grid item xs={3} style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleECPropertyData}
                      style={{ height: '100%' }}
                    >
                      Get EC Document Download
                    </Button>
                  </Grid>
              </Grid>
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

export default KaveriData;
