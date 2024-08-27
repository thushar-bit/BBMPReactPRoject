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
  const [EcDocumentData,setEcDocumentData] = useState([]);
  const [isAllow,setIsAllow] = useState(false);
  const [isShowKaveriDocumentDetais,setisShowKaveriDocumentDetais] = useState(false)
  const navigate = useNavigate();
  
  const handleKaveriDocumentData = async () => {
    if(formData.RegistrationNumber.length === 0){
        toast.error("Please Enter the Registration Number");
        return
    }
    try {
       let response =  await axiosInstance.get(`KaveriAPI/GetKaveriDocData?RegistrationNoNumber=${formData.RegistrationNumber}&BOOKS_APP_NO=${JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))}&PropertyCode=${JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))}&LoginId=crc`)
       const result = response.data;
       debugger
       if(result.success)
        {
          setisShowKaveriDocumentDetais(true);
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
    if(formData.RegistrationNumber.length === 0){
      toast.error("Please Enter the Registration Number First");
      return
    }
    if(formData.ECDocumentNumber.length === 0){
      toast.error("Please Enter the EC Document Number")
      return
    }
      try {

        let response = await axiosInstance.get
        (`KaveriAPI/GetKaveriECData?ECNumber=${formData.ECDocumentNumber}&RegistrationNoNumber=${formData.RegistrationNumber}&BOOKS_APP_NO=
          ${JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))}&PropertyCode=${JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))}&LoginId=crc`)
          debugger
          const result = response.data;
          debugger
          if(result.success){
            if(result.ecDataExists){
              setEcDocumentData(result.data);
              setIsAllow(true);
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
            else {
              setIsAllow(false);
              toast.error("The Given Registration Number Does Not Match With EC Details.\nPlease Provide Correct Registration Number");
              return
            }
          }
          else {
            setIsAllow(false);
            toast.error(result.message)
            return
        }
        
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
    }else if(isAllow){
      navigate("/ClassificationDocumentUploadPage")
    }
    else {
      toast.error("The Given Registration Number Does Not Match With EC Details.\nPlease Provide Correct Registration Number");
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
              {isShowKaveriDocumentDetais && 
              <TableContainer component={Paper} style={{ marginTop: 16 }}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell colSpan={4}>
          <Typography variant="h6" >Document Information</Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell><strong>Application Number</strong></TableCell>
        <TableCell><strong>Execution Date</strong></TableCell>
        <TableCell><strong>Pending Document Number</strong></TableCell>
        <TableCell><strong>Final Registration Number</strong></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {TableKavDocData.length === 0 ? (
        <TableRow>
          <TableCell colSpan={4} align="center">
            No data available
          </TableCell>
        </TableRow>
      ) : (
        TableKavDocData.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.applicationnumber || 'N/A'}</TableCell>
            <TableCell>{row.executedate || 'N/A'}</TableCell>
            <TableCell>{row.pendingdocumentnumber || 'N/A'}</TableCell>
            <TableCell>{row.finalregistrationnumber || 'N/A'}</TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  </Table>

      {/* Property Info Table */}
      <TableContainer component={Paper} style={{ marginTop: 16 }}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell colSpan={4}>
          <Typography variant="h6">Property Information</Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell><strong>Property ID</strong></TableCell>
        <TableCell><strong>Document ID</strong></TableCell>
        <TableCell><strong>Village Name</strong></TableCell>
        <TableCell><strong>Property Type</strong></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {TableKavDocData.map((row, rowIndex) => (
        row.propertyinfo && row.propertyinfo.length > 0 ? (
          row.propertyinfo.map((property, index) => (
            <TableRow key={`${rowIndex}-${index}`}>
              <TableCell>{property.propertyid || 'N/A'}</TableCell>
              <TableCell>{property.documentid || 'N/A'}</TableCell>
              <TableCell>{property.villagenamee || 'N/A'}</TableCell>
              <TableCell>{property.propertytype || 'N/A'}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow key={rowIndex}>
            <TableCell colSpan={4}>No property information available</TableCell>
          </TableRow>
        )
      ))}
    </TableBody>
  </Table>
</TableContainer>


      {/* Party Info Table */}
      <TableContainer component={Paper} style={{ marginTop: 16 }}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell colSpan={4}>
          <Typography variant="h6">Party Information</Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell><strong>Party ID</strong></TableCell>
        <TableCell><strong>Party Name</strong></TableCell>
        <TableCell><strong>Age</strong></TableCell>
        <TableCell><strong>Address</strong></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {TableKavDocData.map((row, rowIndex) => (
        row.partyinfo && row.partyinfo.length > 0 ? (
          row.partyinfo.map((party, index) => (
            <TableRow key={`${rowIndex}-${index}`}>
              <TableCell>{party.partyid || 'N/A'}</TableCell>
              <TableCell>{party.partyname || 'N/A'}</TableCell>
              <TableCell>{party.age || 'N/A'}</TableCell>
              <TableCell>{party.address || 'N/A'}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow key={rowIndex}>
            <TableCell colSpan={4}>No party information available</TableCell>
          </TableRow>
        )
      ))}
    </TableBody>
  </Table>
</TableContainer>

    </TableContainer>
    
}
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
              <TableContainer component={Paper}>
      {EcDocumentData && EcDocumentData.length === 0 ? (
        <TableRow>
          <TableCell colSpan={2} align="center">
            <Typography>No data available</Typography>
          </TableCell>
        </TableRow>
      ) : (
        <Table>
          <TableBody>
            <TableRow>
            <TableCell>
  <Typography variant="subtitle1"><strong>Description</strong></Typography>
  <Typography style={{ whiteSpace: 'pre-line' }}>
    {EcDocumentData.description ? EcDocumentData.description.join('\n') : 'No description available'}
  </Typography>
</TableCell>
              <TableCell>
                <Typography variant="subtitle1"><strong>Document Summary</strong></Typography>
                <Typography>{EcDocumentData.docSummary || 'No document summary available'}</Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Typography variant="subtitle1"><strong>Document Valuation</strong></Typography>
                <Typography>{EcDocumentData.documentValuation || 'No document valuation available'}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1"><strong>Execution Date</strong></Typography>
                <Typography>
                  {EcDocumentData.executionDate 
                    ? new Date(EcDocumentData.executionDate).toLocaleString() 
                    : 'No execution date available'}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Typography variant="subtitle1"><strong>Executants</strong></Typography>
                {EcDocumentData.executants && EcDocumentData.executants.length > 0 ? (
                  EcDocumentData.executants.map((item, index) => (
                    <Typography key={index}>{item}</Typography>
                  ))
                ) : (
                  <Typography variant="body2" color="textSecondary">No executants available</Typography>
                )}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      )}
    </TableContainer>
<br></br>
<br></br>
<br></br>
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
