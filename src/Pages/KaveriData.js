import React, { useEffect, useState } from 'react';
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
import LabelWithAsterisk from '../components/LabelWithAsterisk'
const KaveriData = () => {
  const [formData, setFormData] = useState({
    RegistrationNumber: "",
    OldRegistrationNumber: "",
    ECDocumentNumber: ""
  });
  
  const [KAVERI_DOC_DETAILS, setKAVERI_DOC_DETAILS] = useState([]);
  const [KAVERI_PROP_DETAILS, setKAVERI_PROP_DETAILS] = useState([]);
  const [KAVERI_PARTIES_DETAILS, setKAVERI_PARTIES_DETAILS] = useState([]);
  const [KAVERIEC_PROP_DETAILS, setKAVERIEC_PROP_DETAILS] = useState([]);
  const [KAVERIEC_PARTIES_DETAILS, setKAVERIEC_PARTIES_DETAILS] = useState([]);
  const [isAllow, setIsAllow] = useState(false);
  const [isShowKaveriDocumentDetais, setisShowKaveriDocumentDetais] = useState(false)
  const navigate = useNavigate();
  const { t } = useTranslation();
const fetchData = async (TypeOfLoad) => {

  const response = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP?ULBCODE=555&P_BOOKS_PROP_APPNO=' + JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO')) + '&Propertycode=' + JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')) + '');
  const {Table14=[],Table15=[],Table16=[],Table17=[],Table18=[]} = response.data;
  debugger
  if(TypeOfLoad === "KAVERI_DOC_DATA"){
    setKAVERI_DOC_DETAILS(Table14.length > 0 ? Table14 : []);
    setKAVERI_PROP_DETAILS(Table15.length > 0 ? Table15 : []);
    setKAVERI_PARTIES_DETAILS(Table16.length > 0? Table16 : []);
  }
  else if(TypeOfLoad === "KAVERI_EC_DATA"){
    setKAVERIEC_PROP_DETAILS(Table17.length > 0? Table17 : []);
    setKAVERIEC_PARTIES_DETAILS(Table18.length > 0 ? Table18 : []);
  }
  else {
    setKAVERI_DOC_DETAILS(Table14.length > 0 ? Table14 : []);
    setKAVERI_PROP_DETAILS(Table15.length > 0 ? Table15 : []);
    setKAVERI_PARTIES_DETAILS(Table16.length > 0? Table16 : []);
    setKAVERIEC_PROP_DETAILS(Table17.length > 0? Table17 : []);
    setKAVERIEC_PARTIES_DETAILS(Table18.length > 0 ? Table18 : []);
  }
  
  

}

useEffect(()=> {
  let k = sessionStorage.getItem('KaveriVerified')
  if(k === "true"){
    setisShowKaveriDocumentDetais(true);
fetchData("Initial")
  }
},[])

  const handleKaveriDocumentData = async () => {
    if (formData.RegistrationNumber.length === 0) {
      if (formData.OldRegistrationNumber.length === 0) {
        toast.error(`${t("Please Enter One of The Registration Number")}`);
        return
      }
    }
    if (formData.RegistrationNumber.length > 0 && formData.OldRegistrationNumber.length > 0) {
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
      if (formData.RegistrationNumber.length > 0) {
        response = await axiosInstance.post(`KaveriAPI/GetKaveriDocData?RegistrationNoNumber=${formData.RegistrationNumber}&BOOKS_APP_NO=${JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))}&PropertyCode=${JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))}&LoginId=crc
       `, ekycdatas)
      } else if (formData.OldRegistrationNumber.length > 0) {
        response = await axiosInstance.post(`KaveriAPI/GetKaveriDocData?RegistrationNoNumber=${formData.OldRegistrationNumber}&BOOKS_APP_NO=${JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))}&PropertyCode=${JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))}&LoginId=crc
        `, ekycdatas)
      }
      const result = response.data;

      if (result.success) {
        setisShowKaveriDocumentDetais(true);
        fetchData("KAVERI_DOC_DATA")
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
    if (formData.RegistrationNumber.length === 0) {
      if (formData.OldRegistrationNumber.length === 0)
        toast.error(`${t("enterRegistrationNumberFirst")}`);
      return
    }
    if (formData.RegistrationNumber.length > 0 && formData.OldRegistrationNumber.length > 0) {
      toast.error(`${t("Please Enter any One Registration Number")}`)
      return
    }
    if (formData.ECDocumentNumber.length === 0) {
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
      if (formData.RegistrationNumber.length > 0) {
        response = await axiosInstance.post
          (`KaveriAPI/GetKaveriECData?ECNumber=${formData.ECDocumentNumber}&RegistrationNoNumber=${formData.RegistrationNumber}&BOOKS_APP_NO=
            ${JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))}&PropertyCode=${JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))}&LoginId=crc`, ekycdatas)
      } else if (formData.OldRegistrationNumber.length > 0) {
        response = await axiosInstance.post
          (`KaveriAPI/GetKaveriECData?ECNumber=${formData.ECDocumentNumber}&RegistrationNoNumber=${formData.OldRegistrationNumber}&BOOKS_APP_NO=
            ${JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))}&PropertyCode=${JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))}&LoginId=crc`, ekycdatas)
      }


      const result = response.data;

      if (result.success) {
        if (result.ecDataExists) {
          fetchData("KAVERI_EC_DATA")
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
  const handleReset = () => {
    sessionStorage.setItem('KaveriVerified', false);
    setIsAllow(false);
    setisShowKaveriDocumentDetais(false);
    setKAVERI_DOC_DETAILS([]);
    setKAVERI_PROP_DETAILS([]);
    setKAVERI_PARTIES_DETAILS([]);
    setKAVERIEC_PROP_DETAILS([]);
    setKAVERIEC_PARTIES_DETAILS([]);
   
    setFormData({
      ...formData,
      RegistrationNumber: "",
      OldRegistrationNumber: "",
      
    });
  }
  const handleNavigation = () => {
    debugger
   // sessionStorage.setItem('KaveriVerified', isAllow);
    let k = sessionStorage.getItem('KaveriVerified')
    
        if (k === "true") {
          navigate("/ClassificationDocumentUploadPage")
        }
        else {
          navigate('/DocumentUploadPage');
        }
  
       if (isAllow) {
        sessionStorage.setItem('KaveriVerified', isAllow);
        navigate("/ClassificationDocumentUploadPage")
      }
      else {
        toast.error(`${t("ECError")}`);
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
                  style: { backgroundColor: "#ffff" },
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
            <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', marginLeft: "6%" }}>
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
            <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: "44%" }}>
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
                  style: { backgroundColor: "#ffff" },
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
                    {/* <TableCell><strong>{t("PendingDocumentNumber")}</strong></TableCell> */}
                    <TableCell><strong>{t("FinalRegistrationNumber")}</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {KAVERI_DOC_DETAILS.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        {t("")}  No data available
                      </TableCell>
                    </TableRow>
                  ) : (
                    KAVERI_DOC_DETAILS.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.APPLICATIONNUMBER || 'N/A'}</TableCell>
                        <TableCell>{row.REGISTRATIONDATETIME || 'N/A'}</TableCell>
                        {/* <TableCell>{row.pendingdocumentnumber || 'N/A'}</TableCell> */}
                        <TableCell>{row.REGISTRATIONNUMBER || 'N/A'}</TableCell>
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
                      {/* <TableCell><strong>{t("PropertyType")}</strong></TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {KAVERI_PROP_DETAILS.map((property,index) => (
                    
                        
                          <TableRow key={index}>
                            <TableCell>{property.PROPERTYID || 'N/A'}</TableCell>
                            <TableCell>{property.DOCUMENTID || 'N/A'}</TableCell>
                            <TableCell>{property.VILLAGENAME || 'N/A'}</TableCell>
                            {/* <TableCell>{property.propertytype || 'N/A'}</TableCell> */}
                          </TableRow>
                        )
                      )}
                      
              
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
                      {/* <TableCell><strong>{t("PartyID")}</strong></TableCell> */}
                      <TableCell><strong>{t("PartyName")}</strong></TableCell>
                      {/* <TableCell><strong>{t("Age")}</strong></TableCell> */}
                      <TableCell><strong>{t("Address")}</strong></TableCell>
                      <TableCell><strong>{t("EKYC Owner Name")}</strong></TableCell>
                      <TableCell><strong>{t("Name Match Status")}</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {KAVERI_PARTIES_DETAILS.map((party, index) => (
                      
                          <TableRow key={index}>
                            {/* <TableCell>{party.partyid || 'N/A'}</TableCell> */}
                            <TableCell>{party.PARTYNAME || 'N/A'}</TableCell>
                            {/* <TableCell>{party.age || 'N/A'}</TableCell> */}
                            <TableCell>{party.PARTYADDRESS || 'N/A'}</TableCell>
                            <TableCell>{party.EKYC_OWNERNAME || 'N/A'}</TableCell>
                            <TableCell>{party.NAMEMATCH_SCORE > 60 ? "Matched" : "Not Matched" || 'N/A'}</TableCell>
                          </TableRow>
                        )
                      )}
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
                  style: { backgroundColor: "#ffff" },
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
            {KAVERIEC_PROP_DETAILS && KAVERIEC_PROP_DETAILS.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  <Typography>{t("Nodataavailable")}</Typography>
                </TableCell>
              </TableRow>
            ) : (
              <Table>
                <TableBody>
                  <TableRow>
                    {/* <TableCell>
                      <Typography variant="subtitle1"><strong>{t("Description")}</strong></Typography>
                      <Typography style={{ whiteSpace: 'pre-line' }}>
                        {KAVERIEC_PROP_DETAILS ? KAVERIEC_PROP_DETAILS.description.join('\n') : 'No description available'}
                      </Typography>
                    </TableCell> */}
                    <TableCell>
                      <Typography variant="subtitle1"><strong>{t("Description")}</strong></Typography>
                      <Typography style={{ whiteSpace: 'pre-line' }}>
                        { KAVERIEC_PROP_DETAILS[0].DISTRICTNAME }
                      </Typography>
                      <Typography style={{ whiteSpace: 'pre-line' }}>
                        { KAVERIEC_PROP_DETAILS[0].TALUKANAME }
                      </Typography>
                      <Typography style={{ whiteSpace: 'pre-line' }}>
                        { KAVERIEC_PROP_DETAILS[0].VILLAGENAME }
                      </Typography>
                      <Typography style={{ whiteSpace: 'pre-line' }}>
                        { KAVERIEC_PROP_DETAILS[0].HOBLINAME }
                      </Typography>
                      <Typography style={{ whiteSpace: 'pre-line' }}>
                        { KAVERIEC_PROP_DETAILS[0].ARTICLENAME }
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1"><strong>{t("DocumentSummary")}</strong></Typography>
                      <Typography>{KAVERIEC_PROP_DETAILS[0].LATEST_REGISTRATIONNO || 'No document summary available'}</Typography>
                    </TableCell>
                    <TableCell>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    {/* <TableCell>
                      <Typography variant="subtitle1"><strong>{t("DocumentValuation")}</strong></Typography>
                      <Typography>{KAVERIEC_PROP_DETAILS.documentValuation || 'No document valuation available'}</Typography>
                    </TableCell> */}
                    <TableCell>
                      <Typography variant="subtitle1"><strong>{t("ExecutionDate")}</strong></Typography>
                      <Typography>
                        {KAVERIEC_PROP_DETAILS[0].EXECUTIONDATE
                          ? new Date(KAVERIEC_PROP_DETAILS[0].EXECUTIONDATE).toLocaleString()
                          : 'No execution date available'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1"><strong>Executants</strong></Typography>
                      {KAVERIEC_PARTIES_DETAILS && KAVERIEC_PARTIES_DETAILS.length > 0 ? (
                        KAVERIEC_PARTIES_DETAILS.map((item, index) => (
                          <Typography key={index}>{item.ISCLAIMANTOREXECUTANT === 'E' ? item.OWNERNAME : ""}</Typography>
                        ))
                      ) : (
                        <Typography variant="body2" color="textSecondary">No executants available</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                    </TableCell>
                  
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1"><strong>Claimants</strong></Typography>
                      {KAVERIEC_PARTIES_DETAILS && KAVERIEC_PARTIES_DETAILS.length > 0 ? (
                        KAVERIEC_PARTIES_DETAILS.map((item, index) => (
                          <Typography key={index}>{item.ISCLAIMANTOREXECUTANT === 'C' ? item.OWNERNAME : ""}</Typography>
                        ))
                      ) : (
                        <Typography variant="body2" color="textSecondary">No Claimants available</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1"><strong>{t("EKYC Owner Name")}</strong></Typography>
                      <Typography>
                      {KAVERIEC_PARTIES_DETAILS && KAVERIEC_PARTIES_DETAILS.length > 0 ? (
                        KAVERIEC_PARTIES_DETAILS.map((item, index) => (
                          <Typography key={index}>{item.ISCLAIMANTOREXECUTANT === 'C' ? item.EKYC_OWNERNAME: ""}</Typography>
                        ))
                      ) : (
                        <Typography variant="body2" color="textSecondary">No Claimants available</Typography>
                      )}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1"><strong>{t("Name Match Status")}</strong></Typography>
                      <Typography>
                      {KAVERIEC_PARTIES_DETAILS && KAVERIEC_PARTIES_DETAILS.length > 0 ? (
                        KAVERIEC_PARTIES_DETAILS.map((item, index) => (
                          <Typography key={index}>{item.ISCLAIMANTOREXECUTANT === 'C' ? item.NAMEMATCH_SCORE > 60 ? "Matched" : "Not Matched": ""}</Typography>
                        ))
                      ) : (
                        <Typography variant="body2" color="textSecondary">No Claimants available</Typography>
                      )}
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
          <Button variant="contained" color="primary" onClick={handleReset}>
              {t("Reset")}
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
