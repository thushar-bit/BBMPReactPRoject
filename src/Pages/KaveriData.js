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
import LabelWithAsterisk   from '../components/LabelWithAsterisk'
const KaveriData = () => {
  const [formData, setFormData] = useState({
    RegistrationNumber: "",
    OldRegistrationNumber:"",
    ECDocumentNumber:""
  });
  const [TableKavDocData,setTableKavDocData] = useState([]);
  const [EcDocumentData,setEcDocumentData] = useState([]);
  const [isAllow,setIsAllow] = useState(false);
  const [isShowKaveriDocumentDetais,setisShowKaveriDocumentDetais] = useState(false)
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleKaveriDocumentData = async () => {
    if(formData.RegistrationNumber.length === 0){
      if(formData.OldRegistrationNumber.length === 0){
        toast.error(`${t("Please Enter One of The Registration Number")}`);
        return
      }
    }
    if(formData.RegistrationNumber.length > 0 && formData.OldRegistrationNumber.length > 0){
      toast.error(`${t("Please Enter any One Registration Number")}`)
      return
    }
    debugger
    const ekycOwnerDetails = JSON.parse(sessionStorage.getItem('EKYC_OWNER_DETAILS'));
    const ekycdatas = ekycOwnerDetails.map(({ ownerName, ownerNumber }) => ({
      ownerName: ownerName || "",
      ownerNumber: ownerNumber || 0
  }));
    try {
      let response;
      if(formData.RegistrationNumber.length > 0){
        response =  await axiosInstance.post(`KaveriAPI/GetKaveriDocData?RegistrationNoNumber=${formData.RegistrationNumber}&BOOKS_APP_NO=${JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))}&PropertyCode=${JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))}&LoginId=crc
       `,ekycdatas)
      }else if(formData.OldRegistrationNumber.length > 0){
        response =  await axiosInstance.post(`KaveriAPI/GetKaveriDocData?RegistrationNoNumber=${formData.OldRegistrationNumber}&BOOKS_APP_NO=${JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))}&PropertyCode=${JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))}&LoginId=crc
        `,ekycdatas)
      }
       const result = response.data;
       
       if(result.success)
        {
          setisShowKaveriDocumentDetais(true);
            setTableKavDocData(result.data);
        }
        else {
            toast.error(result.message)
            return
        }
       toast.success(`${t("detailsFetchedSuccess")}`, {
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
      toast.error(`${t("errorSavingData")}` + error, {
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


  


  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };


  const handleECPropertyData = async () => {
    if(formData.RegistrationNumber.length === 0){
      if(formData.OldRegistrationNumber.length === 0)
      toast.error(`${t("enterRegistrationNumberFirst")}`);
      return
    }
    if(formData.RegistrationNumber.length > 0 && formData.OldRegistrationNumber.length > 0){
      toast.error(`${t("Please Enter any One Registration Number")}`)
      return
    }
    if(formData.ECDocumentNumber.length === 0){
      toast.error(`${t("enterEcDocumentNumber")}`)
      return
    }
    const ekycOwnerDetails = JSON.parse(sessionStorage.getItem('EKYC_OWNER_DETAILS'));
    const ekycdatas = ekycOwnerDetails.map(({ ownerName, ownerNumber }) => ({
      ownerName: ownerName || "",
      ownerNumber: ownerNumber || 0
  }));
      try {
        let response;
        if(formData.RegistrationNumber.length > 0){
           response = await axiosInstance.post
          (`KaveriAPI/GetKaveriECData?ECNumber=${formData.ECDocumentNumber}&RegistrationNoNumber=${formData.RegistrationNumber}&BOOKS_APP_NO=
            ${JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))}&PropertyCode=${JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))}&LoginId=crc`,ekycdatas)
        }else if(formData.OldRegistrationNumber.length > 0){
           response = await axiosInstance.post
          (`KaveriAPI/GetKaveriECData?ECNumber=${formData.ECDocumentNumber}&RegistrationNoNumber=${formData.OldRegistrationNumber}&BOOKS_APP_NO=
            ${JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))}&PropertyCode=${JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))}&LoginId=crc`,ekycdatas)
        }
       
          
          const result = response.data;
          
          if(result.success){
            if(result.ecDataExists){
              setEcDocumentData(result.data);
              setIsAllow(true);
              toast.success(`${t("detailsFetchedSuccess")}`, {
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
              toast.error(`${t("registrationNumberNotExist")}`);
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
        toast.error(`${t("errorFetchingEcData")}` + error, {
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
    debugger
    sessionStorage.setItem('KaveriVerified', isAllow);
    const k = sessionStorage.getItem('KaveriVerified')
    if(TableKavDocData !== undefined && TableKavDocData !== null){
      if(TableKavDocData.length === 0)
        {
          if(k){
            navigate("/ClassificationDocumentUploadPage")
          }
          else {
            navigate('/DocumentUploadPage');
          }
    }
    else if(isAllow)
      {
      sessionStorage.setItem('KaveriVerified', isAllow);
      navigate("/ClassificationDocumentUploadPage")
    }
    else {
      toast.error(`${t("ECError")}`);
    }
  }
    
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
    }
  };


  return (
    <Container maxWidth="lg">
      <ToastContainer />
      <Box sx={{ backgroundColor: '#f0f0f0', padding: 4, borderRadius: 2, mt: 8 }}>
            <form onKeyDown={handleKeyDown}>
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
               {t("KAVERISERVICESDATA")}
              </Typography>
              
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={9}>
                  <TextField
                    fullWidth
                   
                    label={< LabelWithAsterisk text={t("RegistrationNumber")} />}
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
                  
              </Grid>
              <br></br>
             
              <Grid container alignItems="center" spacing={2}>
  <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end',marginLeft:"6%"  }}>
    <Typography 
      variant="h6"
      align="center"
      gutterBottom
      sx={{
        fontWeight: 'bold',
        fontFamily: "sans-serif",
        color: '#000', // Specify the desired color here
        fontSize: {
          xs: '2rem',
          sm: '2rem',
          md: '1.2rem',
        }
      }}
    >
      OR
    </Typography>
  </Grid>
  <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-start',marginLeft:"44%" }}>
    <Button
      variant="contained"
      color="success"
      onClick={handleKaveriDocumentData}
      style={{ height: '100%' }}
    >
      {t("KaveriDocumentData")}
    </Button>
  </Grid>
</Grid>
<br></br>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={9}>
                  <TextField
                    fullWidth
                   
                    label={< LabelWithAsterisk text={t("oldRegistrationNumber")} />}
                    placeholder='NMG-X-XXXX-XXXX-XX'
                    name="OldRegistrationNumber"
                    value={formData.OldRegistrationNumber}
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
                  
              </Grid>
              {isShowKaveriDocumentDetais && 
              <TableContainer component={Paper} style={{ marginTop: 16 }}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell colSpan={4}>
          <Typography variant="h6" >{t("DocumentInformation")}</Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell><strong>{t("ApplicationNumber")}</strong></TableCell>
        <TableCell><strong>{t("ExecutionDate")}</strong></TableCell>
        <TableCell><strong>{t("PendingDocumentNumber")}</strong></TableCell>
        <TableCell><strong>{t("FinalRegistrationNumber")}</strong></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {TableKavDocData.length === 0 ? (
        <TableRow>
          <TableCell colSpan={4} align="center">
          {t("")}  No data available
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
          <Typography variant="h6">{t("PropertyInformation")}</Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell><strong>{t("PropertyID")}</strong></TableCell>
        <TableCell><strong>{t("DocumentID")}</strong></TableCell>
        <TableCell><strong>{t("VillageName")}</strong></TableCell>
        <TableCell><strong>{t("PropertyType")}</strong></TableCell>
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
            <TableCell colSpan={4}> {t("Nopropertyinformationavailable")}</TableCell>
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
        <TableCell colSpan={6}>
          <Typography variant="h6">{t("PartyInformation")}</Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell><strong>{t("PartyID")}</strong></TableCell>
        <TableCell><strong>{t("PartyName")}</strong></TableCell>
        <TableCell><strong>{t("Age")}</strong></TableCell>
        <TableCell><strong>{t("Address")}</strong></TableCell>
        <TableCell><strong>{t("EKYC Owner Name")}</strong></TableCell>
        <TableCell><strong>{t("Name Match Status")}</strong></TableCell>
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
              <TableCell>{party.ekycOwnerName || 'N/A'}</TableCell>
               <TableCell>{party.nameMatchScore || 'N/A'}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow key={rowIndex}>
            <TableCell colSpan={4}>{t("")}No party information available</TableCell>
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
<Typography variant='h6'>{t("KaveriMessage1")}</Typography>

<br></br>
<Typography>{t("KaveriMessage2")}</Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={9}>
                  <TextField
                    fullWidth
                 
                    label={< LabelWithAsterisk text={t("ECDocumentNumber")} />}
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
                      {t("FetchECData")}
                    </Button>
                  </Grid>
              </Grid>
              <TableContainer component={Paper}>
      {EcDocumentData && EcDocumentData.length === 0 ? (
        <TableRow>
          <TableCell colSpan={2} align="center">
            <Typography>{t("Nodataavailable")}</Typography>
          </TableCell>
        </TableRow>
      ) : (
        <Table>
          <TableBody>
            <TableRow>
            <TableCell>
  <Typography variant="subtitle1"><strong>{t("Description")}</strong></Typography>
  <Typography style={{ whiteSpace: 'pre-line' }}>
    {EcDocumentData.description ? EcDocumentData.description.join('\n') : 'No description available'}
  </Typography>
</TableCell>
              <TableCell>
                <Typography variant="subtitle1"><strong>{t("DocumentSummary")}</strong></Typography>
                <Typography>{EcDocumentData.docSummary || 'No document summary available'}</Typography>
              </TableCell>
              <TableCell>
                </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Typography variant="subtitle1"><strong>{t("DocumentValuation")}</strong></Typography>
                <Typography>{EcDocumentData.documentValuation || 'No document valuation available'}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1"><strong>{t("ExecutionDate")}</strong></Typography>
                <Typography>
                  {EcDocumentData.executionDate 
                    ? new Date(EcDocumentData.executionDate).toLocaleString() 
                    : 'No execution date available'}
                </Typography>
              </TableCell>
              <TableCell>
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
              <TableCell>
                </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1"><strong>Claimants</strong></Typography>
                {EcDocumentData.claimants && EcDocumentData.claimants.length > 0 ? (
                  EcDocumentData.claimants.map((item, index) => (
                    <Typography key={index}>{item}</Typography>
                  ))
                ) : (
                  <Typography variant="body2" color="textSecondary">No Claimants available</Typography>
                )}
              </TableCell>
              <TableCell>
              <Typography variant="subtitle1"><strong>{t("EKYC Owner Name")}</strong></Typography>
                <Typography>
                  {EcDocumentData.ekycOwnerName 
                    ? EcDocumentData.ekycOwnerName
                    : 'No Ekyc Owner Name available'}
                </Typography>
              </TableCell>
              <TableCell>
              <Typography variant="subtitle1"><strong>{t("Name Match Status")}</strong></Typography>
                <Typography>
                  {EcDocumentData.nameMatchScore 
                    ? EcDocumentData.nameMatchScore
                    : 'No Name Match Score available'}
                </Typography>
              </TableCell>
              
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
                {t("Previous")}
                </Button>
                <Button variant="contained" color="primary" onClick={handleNavigation}>
                {t("next")} 
                </Button>
              </Box>
            </form>
      </Box>
    </Container>
  );
};

export default KaveriData;
