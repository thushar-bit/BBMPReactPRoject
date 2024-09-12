import React, { useEffect, useState } from 'react';
import {
  Button, Box, Container, Typography, Tooltip, IconButton, Grid, TextField,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,CircularProgress
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../components/Axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/Shake.css';
import LabelWithAsterisk from '../components/LabelWithAsterisk'
import DocumentUploadPage from './DocumentUploadPage';
const KaveriData = () => {
  const [formData, setFormData] = useState({
     RegistrationNumber: "",
    ECDocumentNumber: ""
  });
  
  const [KAVERI_DOC_DETAILS, setKAVERI_DOC_DETAILS] = useState([]);
  const [KAVERI_PROP_DETAILS, setKAVERI_PROP_DETAILS] = useState([]);
  const [KAVERI_PARTIES_DETAILS, setKAVERI_PARTIES_DETAILS] = useState([]);
  const [KAVERIEC_PROP_DETAILS, setKAVERIEC_PROP_DETAILS] = useState([]);
  const [KAVERIEC_PARTIES_DETAILS, setKAVERIEC_PARTIES_DETAILS] = useState([]);
  const [DocumetUploadData,setDocumentUploadedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAllow, setIsAllow] = useState(false);
  const [isKaveriDocVerified,setKaveriDocVerified] = useState(false);
  const [isShowKaveriDocumentDetais, setisShowKaveriDocumentDetais] = useState(false)
  const navigate = useNavigate();
  const { t } = useTranslation();
  const DocumentUploadedValidation = (Table1) => {
    debugger
    if(Table1.length === 0){
      return { isValid: false, data: Table1 };
    }
    else {
      return { isValid: true, data: Table1 };
    }
  }
  const fetchData = React.useCallback(async (TypeOfLoad) => {
    ;
setLoading(true)

;
  const response = await axiosInstance.get(`BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP_React?ULBCODE=555&P_BOOKS_PROP_APPNO=${JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))}&Propertycode=${JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))}&Page=KAVERI_DETAILS`);
  const {Table1=[],Table2=[],Table3=[],Table4=[],Table5=[],Table6=[]} = response.data;
 
  let objs = {}
  if(TypeOfLoad === "KAVERI_DOC_DATA"){
    setKAVERI_DOC_DETAILS(Table2.length > 0 ? Table2 : []);
    setKAVERI_PROP_DETAILS(Table3.length > 0 ? Table3 : []);
    setKAVERI_PARTIES_DETAILS(Table4.length > 0? Table4 : []);
    setKaveriDocVerified(Table2.length > 0 ? false : true)
  }
  else if(TypeOfLoad === "KAVERI_EC_DATA"){
    setKAVERIEC_PROP_DETAILS(Table5.length > 0? Table5 : []);
    setKAVERIEC_PARTIES_DETAILS(Table6.length > 0 ? Table6 : []);
    objs= DocumentUploadedValidation(Table1.length > 0 ? Table1 : [])
    setLoading(false)
    return objs;
  }
  else if(TypeOfLoad === "AfterKaveriVerification") {
    setKAVERI_DOC_DETAILS(Table2.length > 0 ? Table2 : []);
    setisShowKaveriDocumentDetais(Table2.length > 0 ? true : false);
    setKAVERI_PROP_DETAILS(Table3.length > 0 ? Table3 : []);
    setKAVERI_PARTIES_DETAILS(Table4.length > 0? Table4 : []);
    setKAVERIEC_PROP_DETAILS(Table5.length > 0? Table5 : []);
    setKAVERIEC_PARTIES_DETAILS(Table6.length > 0 ? Table6 : []);
    setDocumentUploadedData(Table1.length > 0 ? Table1 : []);
  }
  else if(TypeOfLoad === "InitialKaveri"){
    setDocumentUploadedData(Table1.length > 0 ? Table1 : []);
    objs= DocumentUploadedValidation(Table1.length > 0 ? Table1 : [])
    setLoading(false)
    return objs;
  }
  setLoading(false)
  
}, []);

useEffect(()=> {
  
  let k = sessionStorage.getItem('KaveriVerified')
  if(k === "true"){
    
fetchData("AfterKaveriVerification")
  }
  else {
    ;
    fetchData("InitialKaveri")
  }
},[])

  const handleKaveriDocumentData = async () => {
    
    if (formData.RegistrationNumber.length === 0) {
        toast.error(`${t("Please Enter the Registration Number")}`);
        return
    }
    
    
    const ekycOwnerDetails = JSON.parse(sessionStorage.getItem('EKYC_OWNER_DETAILS'));
    const ekycdatas = ekycOwnerDetails.map(({ ownerName, ownerNumber }) => ({
      ownerName: ownerName || "",
      ownerNumber: ownerNumber || 0
    }));
    try {
      setLoading(true)
   
      let response = await axiosInstance.post(`KaveriAPI/GetKaveriDocData?RegistrationNoNumber=${formData.RegistrationNumber}&BOOKS_APP_NO=${JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))}&PropertyCode=${JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))}&LoginId=crc
       `, ekycdatas)
    
       
     
      const result = response.data;

      if (result.success) {
        setisShowKaveriDocumentDetais(true);
      
       await fetchData("KAVERI_DOC_DATA")
       setLoading(false)
      }
      else {
        setTimeout(() => {
          toast.error(result.message)
        }, 200);
        
        setLoading(false)
        return
        
      }
      setTimeout(() => {
      toast.success(`${t("detailsFetchedSuccess")}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
       
      });
    }, 500)
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
      }, 1000);
    }
  };





  const handleChange = async (e) => {
    debugger
    const { name, value } = e.target;

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));

  };


  const handleECPropertyData = async () => {
    debugger
    setKaveriDocVerified(false);
   
    console.log(DocumetUploadData)
    const DocumetUploadDatas = await fetchData("InitialKaveri")
    
    if (formData.RegistrationNumber.length === 0) {
      if (DocumetUploadDatas.data.length === 0){
        setTimeout(() => {
        toast.error(`${t("enterRegistrationNumberFirst")}`);
      }, 100)
      return
    }
  }
  
    if (formData.RegistrationNumber.length > 0 && DocumetUploadDatas.data.length > 0) {
      setTimeout(() => {
      toast.error(`${t("Please Enter any One Registration Number")}`)
    }, 100)
      return
    }
    if (formData.ECDocumentNumber.length === 0) {
      setTimeout(() => {
      toast.error(`${t("enterEcDocumentNumber")}`)
    }, 100)
      return
    }
    const ekycOwnerDetails = JSON.parse(sessionStorage.getItem('EKYC_OWNER_DETAILS'));
    const ekycdatas = ekycOwnerDetails.map(({ ownerName, ownerNumber }) => ({
      ownerName: ownerName || "",
      ownerNumber: ownerNumber || 0
    }));
    try {
      setLoading(true)
     
      let response;
      if (formData.RegistrationNumber.length > 0) {
        setKaveriDocVerified(true);
        if(KAVERI_DOC_DETAILS.length === 0){
          setTimeout(() => {
            toast.error("Please Verify the Kaveri Document Number")
          }, 100);
          setLoading(false)
          return
        }
        response = await axiosInstance.post
          (`KaveriAPI/GetKaveriECData?ECNumber=${formData.ECDocumentNumber}&RegistrationNoNumber=${formData.RegistrationNumber}&BOOKS_APP_NO=
            ${JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))}&PropertyCode=${JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))}&LoginId=crc`, ekycdatas)
      } else if (DocumetUploadDatas.data.length > 0) {
        response = await axiosInstance.post
          (`KaveriAPI/GetKaveriECData?ECNumber=${formData.ECDocumentNumber}&RegistrationNoNumber=${DocumetUploadDatas.data[0].ORDERNUMBER}&BOOKS_APP_NO=
            ${JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))}&PropertyCode=${JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))}&LoginId=crc`, ekycdatas)
      }


      const result = response.data;

      if (result.success) {
        if (result.ecDataExists) {
          fetchData("KAVERI_EC_DATA")
          setIsAllow(true);
          setTimeout(() => {
          toast.success("Details Fetched Successfull.You can Download the EC Certificate from the Above Table", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }, 500)
        }
        else {
          setLoading(false)
          setIsAllow(false);
          setTimeout(() => {
          toast.error(`${t("registrationNumberNotExist")}`);
          },100)
          return
        }
      }
      else {
        setIsAllow(false);
        setLoading(false)
        setTimeout(() => {
        toast.error(result.message)
        },100)
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
      }, 1000);
    }
  }
  const back = () => {
    navigate('/OwnerDetails');
  };
  const handleReset = () => {
    sessionStorage.setItem('KaveriVerified', false);
    setIsAllow(false);
    setKaveriDocVerified(false);
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
    
   // sessionStorage.setItem('KaveriVerified', isAllow);
if(isKaveriDocVerified){
  toast.error("If your Verifying through Kaveri Document Registration Number .Please Provide Correct Registration Number or Verify with the Number")
  return
}
    let k = sessionStorage.getItem('KaveriVerified')
    
        if (k === "true") {
          navigate("/ClassificationDocumentUploadPage")
        }
       
  
       if (isAllow) {
        sessionStorage.setItem('KaveriVerified', isAllow);
        navigate("/ClassificationDocumentUploadPage")
      }
      else {
        toast.error(`${t("ECError")}`);
      }
    
  
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
    <Container maxWidth="xl">
      <ToastContainer />
      <Box sx={{ backgroundColor: '#f0f0f0', padding: 4, borderRadius: 2, mt: 8 }}>
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
       
         
 
 
     
       
          

          <Grid container spacing={6} alignItems="center">
          <Grid item xs={8}>
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

          
          

       
            <Grid item xs={3}>
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
                    <TableCell><strong>{t("RegistrationDatetime")}</strong></TableCell> 
                    {/* <TableCell><strong>{t("PendingDocumentNumber")}</strong></TableCell>
                  
                  
                    SRO Name
                    Hobli 
                    ZoneName 
                    //
                    Id ProofType 
                    Id ProofNumber :
                    Party Type :
                    Admission Date :
                    */}
                    <TableCell><strong>{t("NatureDeed")}</strong></TableCell>
                
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
                        <TableCell>{row.NATUREDEED || 'N/A'}</TableCell> 
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
                      <TableCell colSpan={6}>
                        <Typography variant="h6">{t("PropertyInformation")}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>{t("PropertyID")}</strong></TableCell>
                      <TableCell><strong>{t("DocumentID")}</strong></TableCell>
                      <TableCell><strong>{t("VillageName")}</strong></TableCell>
                       <TableCell><strong>{t("SRONAME")}</strong></TableCell> 
                       <TableCell><strong>{t("HOBLI")}</strong></TableCell>
                       <TableCell><strong>{t("ZoneName")}</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {KAVERI_PROP_DETAILS.map((property,index) => (
                    
                        
                          <TableRow key={index}>
                            <TableCell>{property.PROPERTYID || 'N/A'}</TableCell>
                            <TableCell>{property.DOCUMENTID || 'N/A'}</TableCell>
                            <TableCell>{property.VILLAGENAME || 'N/A'}</TableCell>
                            <TableCell>{property.SRONAME || 'N/A'}</TableCell>
                            <TableCell>{property.HOBLINAME || 'N/A'}</TableCell>
                            <TableCell>{property.ZONENAME || 'N/A'}</TableCell>
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
                      <TableCell colSpan={8}>
                        <Typography variant="h6">{t("PartyInformation")}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                     
                      <TableCell><strong>{t("PartyName")}</strong></TableCell>
                    
                      <TableCell><strong>{t("Address")}</strong></TableCell>
                      <TableCell><strong>{t("Id ProofType ")}</strong></TableCell>
                      <TableCell><strong>{t("Id ProofNumber")}</strong></TableCell>
                      <TableCell><strong>{t("Party Type")}</strong></TableCell>
                      <TableCell><strong>{t("Admission Date")}</strong></TableCell>
                      <TableCell><strong>{t("EKYC Owner Name")}</strong></TableCell>
                      <TableCell><strong>{t("Name Match Status")}</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {KAVERI_PARTIES_DETAILS.map((party, index) => (
                      
                          <TableRow key={index}>
                           
                            <TableCell>{party.PARTYNAME || 'N/A'}</TableCell>
                         
                            <TableCell>{party.PARTYADDRESS || 'N/A'}</TableCell>
                            <TableCell>{party.IDPROOFTYPE || 'N/A'}</TableCell>
                            <TableCell>{party.IDPROOFNUMBER || 'N/A'}</TableCell>
                            <TableCell>{party.PARTYTYPE || 'N/A'}</TableCell>
                            <TableCell>{party.ADMISSIONDATE || 'N/A'}</TableCell>
                            <TableCell>{party.PARTYTYPE === "Claimant" ? party.EKYC_OWNERNAME : 'N/A'}</TableCell>
                            <TableCell>{party.PARTYTYPE === "Claimant" ? party.NAMEMATCH_SCORE > 60 ? "Matched" : "Not Matched" || 'N/A': 'N/A'}</TableCell>
                          </TableRow>
                        )
                      )}
                  </TableBody>
                </Table>
              </TableContainer>

            </TableContainer>

          }
               <DocumentUploadPage  />
          <br></br>
          <br></br>
          <Typography variant='h6'>{t("KaveriMessage1")}</Typography>

          <br></br>
          <Typography>{t("KaveriMessage2")}</Typography>
          <br></br>
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
                    
                    <TableCell>
                      <Typography variant="subtitle1"><strong>{t("District Name")}</strong></Typography>
                      <Typography>
                        { KAVERIEC_PROP_DETAILS[0].DISTRICTNAME|| "N/A" }
                      </Typography>
                      </TableCell>
                     
                      <TableCell>
                      <Typography variant="subtitle1"><strong>{t("Taluka Name")}</strong></Typography>
                      <Typography style={{ whiteSpace: 'pre-line' }}>
                        { KAVERIEC_PROP_DETAILS[0].TALUKANAME || "N/A"}
                      </Typography>
                        </TableCell>
                    
                        <TableCell>
                        <Typography variant="subtitle1"><strong>{t("Village Name")}</strong></Typography>
                        <Typography style={{ whiteSpace: 'pre-line' }}>
                        { KAVERIEC_PROP_DETAILS[0].VILLAGENAME || "N/A"}
                      </Typography>
                          </TableCell>
                          <TableCell>
                          <Typography variant="subtitle1"><strong>{t("Hobli Name")}</strong></Typography>
                      <Typography style={{ whiteSpace: 'pre-line' }}>
                        { KAVERIEC_PROP_DETAILS[0].HOBLINAME || "N/A"}
                      </Typography>
                          </TableCell>
                          <TableCell>
                          <Typography variant="subtitle1"><strong>{t("Article Name")}</strong></Typography>
                          <Typography style={{ whiteSpace: 'pre-line' }}>
                        { KAVERIEC_PROP_DETAILS[0].ARTICLENAME || "N/A" }
                      </Typography>
                          </TableCell>
                         
                    
                     
                   
                    <TableCell>
                      <Typography variant="subtitle1"><strong>{t("Latest Registration Number")}</strong></Typography>
                      <Typography>{KAVERIEC_PROP_DETAILS[0].LATEST_REGISTRATIONNO || 'No document summary available'}</Typography>
                    </TableCell>
                    <TableCell>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                     <TableCell>
                      <Typography variant="subtitle1"><strong>{t("Is Latest Registration Number")}</strong></Typography>
                      <Typography>{KAVERIEC_PROP_DETAILS[0].IS_LATEST_REGISTRATIONNO === 'Y' ? "Yes" : "No" || 'N/A'}</Typography>
                    </TableCell> 
                    <TableCell>
                      <Typography variant="subtitle1"><strong>{t("Registration Date")}</strong></Typography>
                      <Typography>
                        {KAVERIEC_PROP_DETAILS[0].EXECUTIONDATE
                          ? new Date(KAVERIEC_PROP_DETAILS[0].EXECUTIONDATE).toLocaleString()
                          : 'No execution date available'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1"><strong>Executant Names</strong></Typography>
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
                    <TableCell>
                    </TableCell>
                    <TableCell>
                    </TableCell>
                    <TableCell>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1"><strong>Claimant Names</strong></Typography>
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
       
      </Box>
    </Container>
  );
};

export default KaveriData;
