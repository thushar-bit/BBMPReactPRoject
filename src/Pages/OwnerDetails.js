import React, { useState } from 'react';
import {
   Button, Box, Container, Typography, Grid,TextField, Radio, RadioGroup, FormControlLabel, FormControl,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,MenuItem, Select, InputLabel
} from '@mui/material';
//import InfoIcon from '@mui/icons-material/Info';
import { useTranslation } from 'react-i18next';
import { useNavigate ,useLocation} from 'react-router-dom';
import axiosInstance from '../components/Axios';
import { toast, ToastContainer } from 'react-toastify';
const OwnerDetails = () => {
  const [formData, setFormData] = useState({
    relato:"0"
  });

  const [tableData, setTableData] = useState([
  ]);

  const navigate = useNavigate();
  const location = useLocation();
  const [tablesdata9,setTablesData9] = useState([]);
  const [tablesdata8,setTableData8] = useState([]);
  const [OwnerNumber,setOwnerNumber] = useState("");
  const [editableIndex, setEditableIndex] = useState(-1);
  const [otpFieldsVisible, setOtpFieldsVisible] = useState(false);
  const [alertShown, setAlertShown] = useState(false);
  const [otpData, setOtpData] = useState({});
  const [nameMatchStatuses, setNameMatchStatuses] = useState({});
  const { t } = useTranslation();

  
  const handleChange = (e) => {
    debugger
    const { name, value } = e.target;
  
    if (name === "MOBILENUMBER") {
      
      if (formData.MOBILENUMBER === value || value.trim() === "") {
        setOtpFieldsVisible(false);
        setAlertShown(false); 
      } else {
        setOtpFieldsVisible(true);
        if (!alertShown) {
          alert("If the mobile number is changed, then it needs to be verified with the OTP");
          setAlertShown(true); 
        }
      }
      if(name === "MOBILENUMBER")
        {
          if (/^\d{0,10}$/.test(value)) {
            setFormData(prevFormData => ({
              ...prevFormData,
              [name]: value
            }));
          }
          return
        }
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleGenerateOtp = async (index) => {
    debugger
    const response = await axiosInstance.get("E-KYCAPI/SendOTP?OwnerMobileNo=" + formData.MOBILENUMBER);
    toast.success("OTP Sent Successfully");
    setOtpData(response.data);
  };

  const handleVerifyOtp = (index) => {
    if (formData.OwnerOTP === otpData.toString()) {
      toast.success("OTP Verified");
      formData.MOBILEVERIFY = "Verfied"
      setOtpFieldsVisible(false);
    } else {
      toast.error("OTP you have Entered is Wrong.");
    }
  };
  const handleEdit = (index) => {
    setEditableIndex(index);
    setFormData(tablesdata9[index]);
  };
  const handleDelete =  async (index) => {
    
    const ownerToDelete = tablesdata9[index];
  await axiosInstance.get(`BBMPCITZAPI/DEL_SEL_NCL_PROP_OWNER_TEMP?propertyCode=${ownerToDelete.PROPERTYCODE}&ownerNumber=${ownerToDelete.OWNERNUMBER}`);
  toast.error("Owner Deleted Successfully")
  await fetchData();
  };

  const handleSave = async () => {
    
    
    
    if(otpFieldsVisible){
      toast.error("Verify the OTP!")
      return
    }
    setEditableIndex(-1); 
    const params = {
      propertyCode: formData.PROPERTYCODE,
      ownerNumber: formData.OWNERNUMBER,
      IDENTIFIERTYPE: formData.IDENTIFIERTYPEID,
      IDENTIFIERNAME_EN: formData.IDENTIFIERNAME,
      MOBILENUMBER: formData.MOBILENUMBER,
      MOBILEVERIFY: formData.MOBILEVERIFY,
      loginId: 'crc'
    };
  
    // Convert the params object to a query string
    const queryString = new URLSearchParams(params).toString();
  
    // Make the API call with the constructed query string
    const response = await axiosInstance.get(`BBMPCITZAPI/UPD_NCL_PROPERTY_OWNER_TEMP_MOBILEVERIFY?${queryString}`);
    toast.success("Owner Edited Successfully")
    await fetchData();
  };
  const fetchData = async () => {
    const response1 = await axiosInstance.get('BBMPCITZAPI/GetMasterTablesData?UlbCode=555');
        const response2 = JSON.parse(sessionStorage.getItem('BBD_DRAFT_API'));
    const response3 = JSON.parse(sessionStorage.getItem('NCL_TEMP_API'));
        const {  Table5   } = response2.data;
        const {Table9:NCLTABLE9} = response3.data;
        const {Table8} = response1.data;
        setTableData8(Table8.length > 0 ? Table8 :[])
        setTableData(Table5.length > 0 ? Table5 : []);
        setTablesData9(NCLTABLE9.length > 0 ? NCLTABLE9 : []);
  }

  React.useEffect( () => {
    const params = new URLSearchParams(location.search);
    const txnno = params.get('txnno');
    if (txnno) {
      console.log('E-KYC completed successfully with txnno:', txnno);
      const callEditEYCDate = async () =>
      {
      var ownerNumber = await EditOwnerDetailsFromEKYCData(581);
      if(ownerNumber !== "")
        {
      setOwnerNumber(ownerNumber);
        }
      }
      callEditEYCDate();
    }
    fetchData();   
  }, [location.search]);
  React.useEffect(() => {
    tablesdata9.forEach(row => {
      updateNameMatchStatus(row);
    });
  },[tablesdata9])
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data logic here
  };
  const EditOwnerDetailsFromEKYCData = async (txno) => {
   const response = await axiosInstance.get("E-KYCAPI/EditOwnerDetailsFromEKYCData?transactionNumber="+txno)
    if(response.data.length > 0){
      return response.data.Table[0].OWNERNUMBER || ""
    }
    return ""
  };
  const back = () => {
    navigate('/AreaDimension/flats');
  };
  const VerfiyEKYC = async() => {
  var response =  await axiosInstance.post("E-KYCAPI/RequestEKYC?OwnerNumber="+23)
  debugger
  console.log(response.data)
  window.location.href = response.data;
  };
  const OwnerExists = (BBDOwnerNumber) => {
    const exists = tablesdata9.some(item => item.OWNERNUMBER === BBDOwnerNumber);
    return exists;
  }
 

  const updateNameMatchStatus = async (row) => {
    const status = await calculateNameMatchStatus(row.OWNERNAME, row.OWNERNUMBER);
    setNameMatchStatuses(prevStatuses => ({
      ...prevStatuses,
      [row.OWNERNUMBER]: status
    }));
  };

  const Fn_CPlus_NameMatchJulyFinal2023 = async (name1, name2) => {
   const response = await axiosInstance.get("BBMPCITZAPI/NameMatchScore2323?ownerName1="+name1+"&ownerName2="+name2)
   return response.data;
  };
  
  const calculateNameMatchStatus =  async (grid2OwnerName, grid2Ownernumber) => {
    let nameMatchStatus = "NEW OWNER";
    const ownerData = tableData.find((owner) => owner.OWNERNUMBER === grid2Ownernumber);
    if (ownerData) {
      const grid1OwnerName = ownerData.OWNERNAME;
      const nameMatchScore =  await Fn_CPlus_NameMatchJulyFinal2023(grid2OwnerName, grid1OwnerName);
      debugger
      if (nameMatchScore) {
        nameMatchStatus = "MATCHED";
      } else {
        nameMatchStatus = "NOT MATCHED";
      }
    }
    return nameMatchStatus;
  };
  

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
            Owner Details
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
    Existing Owners As Per Digitization
  </Typography>
  <Button variant="contained" color="warning" onClick={VerfiyEKYC}>
    ADD NEW OWNER
  </Button>
</Box>
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
               
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>Owner No.</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>Owner Name</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>Father/ Mother/ Husband/ Spouse Name</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>Address</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>E-KYC Status</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>Owner Status</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>Verify E-KYC</TableCell>
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
            <TableCell>{row.OWNERNUMBER}</TableCell>
            <TableCell>{row.OWNERNAME}</TableCell>
            <TableCell>{row.IDENTIFIERTYPE} {row.IDENTIFIERNAME}</TableCell>
            <TableCell>{row.OWNERADDRESS} {row.MOBILENUMBER}</TableCell>
            <TableCell>{row.EKYCSTATUS}</TableCell>
            <TableCell>{OwnerExists(row.OWNERNUMBER) ? "RETAINED" : "DELETED"}</TableCell>

            <TableCell> <Button variant="contained" color="primary" onClick={VerfiyEKYC}>
              Verfiy EKYC
            </Button></TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  </Table>
</TableContainer>
<br></br>
<Grid container spacing={3}>
      {tablesdata9.map((owner, index) => (
        <Grid item xs={12} key={index}>
          <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, backgroundColor: '#f7f7f7' }}>
            <Typography variant="h6" color="primary" gutterBottom>
              {t('Owners To Be Added in e-Khatha')}
            </Typography>
            <Grid item xs={12} sm={2}>
  <div style={{ marginLeft: '10px', position: 'relative', textAlign: 'center' }}>
    <img
      src={`data:image/png;base64,${owner.OWNERPHOTO}`}
      alt="No Images Found"
      style={{
        maxWidth: '100%', 
        maxHeight: '200px', 
        width: 'auto', // Allow the width to adjust responsively
        height: 'auto', // Allow the height to adjust responsively
        borderRadius: '8px',
      }}
    />
  </div>
</Grid>
            <Grid container spacing={2}>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t('Owner Name')}
                  name="OwnerName"
                  value={owner.OWNERNAME}
                  InputProps={{
                    readOnly: true,
                  }}
                 variant="filled"
                />
              </Grid>
         
              <Grid item xs={12} sm={6}>
              <TextField
                  fullWidth
                  label={t('Name Match Score')}
                  name="NameMatchscore"
                  value={owner.NameMatchscore}
                  InputProps={{
                    readOnly: true,
                  }}
                 variant="filled"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              {editableIndex === index ? (
                  <FormControl fullWidth sx={{ marginBottom: 3 }}>
                    <InputLabel>Relationship Type</InputLabel>
                    <Select
                      name="IDENTIFIERTYPEID"
                      value={formData.IDENTIFIERTYPEID}
                      onChange={handleChange}
                    >
                      <MenuItem value="">--Select--</MenuItem>
                      {tablesdata8.map((item) => (
                        <MenuItem key={item.IDENTIFIERTYPEID} value={item.IDENTIFIERTYPEID}>
                          {item.IDENTIFIERTYPE_EN}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <FormControl fullWidth sx={{ marginBottom: 3 }}>
                  <InputLabel>Relationship Type</InputLabel>
                  <Select
                    name="RelationShiptype"
                    value={owner.IDENTIFIERTYPEID}
                    onChange={handleChange}
                    disabled
                  >
                    <MenuItem value="">--Select--</MenuItem>
                    {tablesdata8.map((item) => (
                      <MenuItem key={item.IDENTIFIERTYPEID} value={item.IDENTIFIERTYPEID}>
                        {item.IDENTIFIERTYPE_EN}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
              {editableIndex === index  ? (
                  <TextField
                    fullWidth
                    label={t('Relation Name')}
                    name="IDENTIFIERNAME"
                    value={formData.IDENTIFIERNAME}
                    onChange={handleChange}
                    variant="standard"
                  />
                ) : (
                  <TextField
                    fullWidth
                    label={t('Relation Name')}
                    name="RelationName"
                    value={owner.IDENTIFIERNAME}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
              <Typography  sx={{ fontWeight: 'bold' }}>
         Gender :
              </Typography>
              <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
            <RadioGroup row name="Gender" value={owner.GENDER} onChange={handleChange}>
              <FormControlLabel value="M" control={<Radio disabled={true} />} label="Male" />
              <FormControlLabel value="F" control={<Radio disabled={true} />} label="Female" />
              <FormControlLabel value="O" control={<Radio disabled={true}/>} label="Other" />
            </RadioGroup>
          </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t('Date Of Birth')}
                  name="DateOfBirth"
                  value={owner.DATEOFBIRTH}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="filled"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t('Address')}
                  name="Address"
                  value={owner.OWNERADDRESS}
                  multiline
                  rows={2}
                  InputProps={{
                    readOnly: true,
                  }}
                variant="filled"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t('Owner Masked Aadhar')}
                  name="OwnerAadhar"
                  value={owner.OWNERIDENTITYSLNO || ""}
                  InputProps={{
                    readOnly: true,
                  }}
                variant="filled"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              {editableIndex === index  ? (
                <>
                  <TextField
                    fullWidth
                    label={t('Mobile Number')}
                    name="MOBILENUMBER"
                    value={formData.MOBILENUMBER}
                    onChange={handleChange}
                    variant="standard"
                  />
                  {otpFieldsVisible && (
                    <Grid>
                    <Button variant="contained" color="primary"  onClick={() => handleGenerateOtp(index)}>
                      Generate OTP
                    </Button>
                    <TextField
                      fullWidth
                      label={t('Enter OTP')}
                      name="OwnerOTP"
                      value={formData.OwnerOTP}
                      onChange={handleChange}
                      variant="standard"
                    />
                    <Button variant="contained" color="primary" onClick={() => handleVerifyOtp(index)}>
                      Verify OTP
                    </Button>
                  </Grid>
                )}
              </>
                ) : (
                  <TextField
                    fullWidth
                    label={t('Mobile Number')}
                    name="MobileNumber"
                    value={owner.MOBILENUMBER}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                  />
                )}
                
              </Grid>
             
              <Grid item xs={12} sm={6}>
              {editableIndex === index  ? (
                  <TextField
                    fullWidth
                    label={t('Mobile Verify')}
                    name="MOBILEVERIFY"
                    value={formData.MOBILEVERIFY || ""}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                  />
                ) : (
                  <TextField
                    fullWidth
                    label={t('Mobile Verify')}
                    name="MOBILEVERIFY"
                    value={owner.MOBILEVERIFY || "NOT VERIFIED"}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                  />
                )}
              </Grid>
         
           
          
           
            </Grid>
            
            <br></br>
            <Grid item xs={12} sm={12}>
            <Box display="flex" justifyContent="center" gap={2}>
            {editableIndex === index ? (
                <Button variant="contained" color="primary" onClick={handleSave}>
                  SAVE
                </Button>
              ) : (
                <Button variant="contained" color="secondary" onClick={() => handleEdit(index)}>
                  EDIT
                </Button>
              )}
              <Button variant="contained" color="error" onClick={() => handleDelete(index)}>
                DELETE OWNER
              </Button>
            </Box>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
    
              
             
   

<TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
               
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>Owner No.</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>Owner Name</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>Father/ Mother/ Husband/ Spouse Name</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>Address</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>Mobile Number</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>Owner Photo</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>Mobile Verification</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>E-KYC</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>NAME MATCH STATUS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {tablesdata9.length === 0 ? (
        <TableRow>
          <TableCell colSpan={12} align="center">
            No data available
          </TableCell>
        </TableRow>
      ) : (
        tablesdata9.map( (row)  => {
         
          return (
            <TableRow key={row.id}>
              <TableCell>{row.OWNERNUMBER}</TableCell>
              <TableCell>{row.OWNERNAME}</TableCell>
              <TableCell>{row.IDENTIFIERNAME}</TableCell>
              <TableCell>{row.OWNERADDRESS}</TableCell>
              <TableCell>{row.MOBILENUMBER}</TableCell>
              <TableCell> <img
      src={`data:image/png;base64,${row.OWNERPHOTO}`}
      alt="No Images Found"
      style={{
        maxWidth: '100%', 
        maxHeight: '200px', 
        width: 'auto', // Allow the width to adjust responsively
        height: 'auto', // Allow the height to adjust responsively
        borderRadius: '8px',
      }}
    /></TableCell>
              <TableCell>{row.MOBILEVERIFY}</TableCell>
              <TableCell>{row.EKYCSTATUS}</TableCell>
              <TableCell>
                 <TextField
            fullWidth
            value={nameMatchStatuses[row.OWNERNUMBER] || "Loading..."}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
          />
              </TableCell>
            </TableRow>
          );
        })
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
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default OwnerDetails;
