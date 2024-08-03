import React, { useState } from 'react';
import {
  Button, Box, Container, Typography, Grid, TextField, Radio, RadioGroup, FormControlLabel, FormControl,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select, InputLabel, CircularProgress
} from '@mui/material';
//import InfoIcon from '@mui/icons-material/Info';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../components/Axios';
import { toast, ToastContainer } from 'react-toastify';
const OwnerDetails = () => {
  const [formData, setFormData] = useState({
    relato: "0"
  });

  const [tableData, setTableData] = useState([
  ]);

  const navigate = useNavigate();
  const location = useLocation();
  const [tablesdata9, setTablesData9] = useState([]);
  const [tablesdata8, setTableData8] = useState([]);
  const [OwnerNumber, setOwnerNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [editableIndex, setEditableIndex] = useState(-1);
  const [otpFieldsVisible, setOtpFieldsVisible] = useState(false);
  const [alertShown, setAlertShown] = useState(false);
  const [otpData, setOtpData] = useState({});
  const [otpNumber, setOtpNumber] = useState(0)
  const [nameMatchStatuses, setNameMatchStatuses] = useState({});
  const { t } = useTranslation();
  const [otpButtonDisabled, setOtpButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(30); // Initial countdown timer value in seconds
  const [countdownInterval, setCountdownInterval] = useState(null);

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
      if (name === "MOBILENUMBER") {
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
  React.useEffect(() => {
    return () => {
      clearInterval(countdownInterval);
    };
  }, [countdownInterval]);
  const handleGenerateOtp = async (index) => {
    try {
      const response = await axiosInstance.get("E-KYCAPI/SendOTP?OwnerMobileNo=" + formData.MOBILENUMBER);
      toast.success("OTP Sent Successfully");
      setOtpData(response.data.otpResponseMessage);
      setOtpNumber(response.data.otp);
      formData.MOBILEVERIFY = "NOT VERIFIED";
      setOtpButtonDisabled(true);
      setTimer(30);
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);


      setTimeout(() => {
        setOtpButtonDisabled(false);
        clearInterval(interval);
      }, 30000);


      setCountdownInterval(interval);
    } catch (error) {
      console.log("failed to send otp" + error)
    }

  };

  const handleVerifyOtp = (index) => {
    if (formData.OwnerOTP === otpNumber.toString()) {
      toast.success(otpData);
      formData.MOBILEVERIFY = "Verfied";
      setOtpFieldsVisible(false);
    } else {
      toast.error(otpData);
    }
  };
  const handleEdit = (index) => {
    setEditableIndex(index);
    setFormData(tablesdata9[index]);
  };
  const handleDelete = async (index) => {
    try {
      const ownerToDelete = tablesdata9[index];
      await axiosInstance.get(`BBMPCITZAPI/DEL_SEL_NCL_PROP_OWNER_TEMP?EIDAPPNO=${JSON.parse(sessionStorage.getItem('EIDAPPNO'))}&propertyCode=${ownerToDelete.PROPERTYCODE}&ownerNumber=${ownerToDelete.OWNERNUMBER}`);
      toast.error("Owner Deleted Successfully");
      await fetchData();
    } catch (error) {
      console.log(error)
    }

  };

  const handleNavigation = () => {
    // Extract owner numbers from tableData

    const tableDataOwnerNumbers = tableData.map(item => item.OWNERNUMBER);
    // Flags for the checks
    // let allEKYCVerified = true;
    let allNameMatchVerified = true;
    let atLeastOneMobileVerified = true;
    let relationshiptype = true;
    let relationname = true;
    // Check all the required conditions
    for (let data of tablesdata9) {
      if (tableDataOwnerNumbers.includes(data.OWNERNUMBER)) { //retaining owners
        // if (data.EKYCVERIFIED !== "Verfied") {
        //     allEKYCVerified = false;
        // }
        if (nameMatchStatuses[data.OWNERNUMBER] !== "MATCHED" && nameMatchStatuses[data.OWNERNUMBER] !== "NEW OWNER") {
          allNameMatchVerified = false;
        }
        if (data.MOBILEVERIFY !== "Verfied") {
          atLeastOneMobileVerified = false;
        }
      }
      else {
        //   if (data.EKYCVERIFIED !== "Verfied") {   //new Owners
        //     allEKYCVerified = false;
        // }
        if (data.MOBILEVERIFY !== "Verfied") {
          atLeastOneMobileVerified = false;
        }
        if (data.IDENTIFIERNAME.length <= 0 || data.IDENTIFIERNAME === null) {
          relationname = false;
        }
        if (data.IDENTIFIERTYPEID === "0" || data.IDENTIFIERTYPEID === null || data.IDENTIFIERTYPEID.length <= 0) {
          relationshiptype = false;
        }
      }
    }

    // Determine whether to navigate or alert
    if (allNameMatchVerified && atLeastOneMobileVerified && relationname && relationshiptype || tablesdata9.length > 0) {
      // Navigate to the desired location
      navigate("/PropertyRights")
    } else {
      // Display appropriate alerts
      // if (!allEKYCVerified) {
      //     alert("All owner numbers must have EKYCVERIFIED set to VERIFIED.");
      // }
      if (!allNameMatchVerified) {
        toast.error("All Retaining Owners Should Have there Name Matching with the existing Owners.");
      }
      if (!atLeastOneMobileVerified) {
        toast.error("All Owners Should Have there mobile Number Verified.");
      }
      if (!relationname) {
        toast.error("All Owners Should Have there Relation Name.");
      }
      if (!relationshiptype) {
        toast.error("All Owners Should Have there Relation Type.");
      }
      if (tablesdata9.length === 0) {
        toast.error("Atleast One Owner should be Added for E-Katha Verification");
      }

    }
  }



  const handleSave = async () => {
    debugger
    try {

      if (otpFieldsVisible) {
        toast.error("Verify the OTP!")
        return
      }
      if (formData.IDENTIFIERTYPEID === null || formData.IDENTIFIERTYPEID === undefined) 
        {
          toast.error("Please Select RelationShip Type")
          return
      }
      if (formData.IDENTIFIERTYPEID.length === 0) {
        toast.error("Please Select RelationShip Type")
        return
      }
      if (formData.IDENTIFIERNAME === null || formData.IDENTIFIERNAME === undefined) 
        {
          toast.error("Please enter the Relation Name")
          return
        }
      if (formData.IDENTIFIERNAME.length <= 0) {
        toast.error("Please enter the Relation Name")
        return
      }
      
      if (formData.MOBILENUMBER === null || formData.MOBILENUMBER === undefined) 
        {
          toast.error("Please enter a valid Mobile Number")
          return
      }
      if (formData.MOBILENUMBER.length <= 0 && formData.MOBILENUMBER.length < 10) {
        toast.error("Please enter a valid Mobile Number")
        return
      }


      setEditableIndex(-1);
      const params = {
        EIDAPPNO: JSON.parse(sessionStorage.getItem('EIDAPPNO')),
        propertyCode: formData.PROPERTYCODE,
        ownerNumber: formData.OWNERNUMBER,
        IDENTIFIERTYPE: formData.IDENTIFIERTYPEID || null,
        IDENTIFIERNAME_EN: formData.IDENTIFIERNAME || null,
        MOBILENUMBER: formData.MOBILENUMBER || "0",
        MOBILEVERIFY: formData.MOBILEVERIFY !== "" ? formData.MOBILEVERIFY : "NOT VERIFIED",
        loginId: 'crc'
      };

      const queryString = new URLSearchParams(params).toString();


      const response = await axiosInstance.get(`BBMPCITZAPI/UPD_NCL_PROPERTY_OWNER_TEMP_MOBILEVERIFY?${queryString}`);
      console.log(response.data);
      toast.success("Owner Edited Successfully")
      await fetchData();
    } catch (error) {
      toast.error("Error Saving Data ", error)
    }

  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const response1 = await axiosInstance.get('BBMPCITZAPI/GetMasterTablesData?UlbCode=555');
      const response2 = JSON.parse(sessionStorage.getItem('BBD_DRAFT_API'));
      const response3 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP?ULBCODE=555&EIDAPPNO=' + JSON.parse(sessionStorage.getItem('EIDAPPNO')) + '&Propertycode=' + JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')) + '');
      const { Table5 = [] } = response2.data;
      const { Table9: NCLTABLE9 = [] } = response3.data;
      const { Table8 = [] } = response1.data;
      setTableData8(Table8.length > 0 ? Table8 : [])
      setTableData(Table5.length > 0 ? Table5 : []);
      setTablesData9(NCLTABLE9.length > 0 ? NCLTABLE9 : []);
      setLoading(false);
    } catch (error) {
      toast.error("Error Getting data!" + error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  }

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const txnno = params.get('txnno');
    debugger
    if (txnno !== null && txnno !== undefined) {
      console.log('E-KYC completed successfully with txnno:', txnno);
      toast.success("E-KYC completed successfully with txnno:", txnno)
      const callEditEYCDate = async () => {
        var ownerNumber = await EditOwnerDetailsFromEKYCData(txnno); //581
        if (ownerNumber !== "") {
          setOwnerNumber(ownerNumber);
        }
      }
      callEditEYCDate();
    }
    //  toast.error("E-KYC was not successfully with txnno:",txnno)
    fetchData();
  }, [location.search]);
  React.useEffect(() => {
    tablesdata9.forEach(row => {
      updateNameMatchStatus(row);
    });
  }, [tablesdata9])
  const handleSubmit = (e) => {

    // Submit form data logic here
  };
  const EditOwnerDetailsFromEKYCData = async (txno) => {
    try {
      const response = await axiosInstance.get("E-KYCAPI/EditOwnerDetailsFromEKYCData?transactionNumber=" + txno)
      if (response.data.length > 0) {
        return response.data.Table[0].OWNERNUMBER || ""
      }
      return ""
    } catch (error) {
      console.log("EditOwnerDetailsFromEKYCData", error)
    }

  };
  const back = () => {
    navigate('/AreaDimension/select');
  };
  const VerfiyEKYC = async () => {
    var response = await axiosInstance.post("E-KYCAPI/RequestEKYC?OwnerNumber=" + 23)

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
    try {
      const response = await axiosInstance.get("BBMPCITZAPI/NameMatchScore2323?ownerName1=" + name1 + "&ownerName2=" + name2)
      return response.data;
    } catch (error) {
      console.log("Fn_CPlus_NameMatchJulyFinal2023", error)
    }
  };

  const calculateNameMatchStatus = async (grid2OwnerName, grid2Ownernumber) => {
    let nameMatchStatus = "NEW OWNER";
    const ownerData = tableData.find((owner) => owner.OWNERNUMBER === grid2Ownernumber);
    if (ownerData) {
      const grid1OwnerName = ownerData.OWNERNAME;
      const nameMatchScore = await Fn_CPlus_NameMatchJulyFinal2023(grid2OwnerName, grid1OwnerName);

      if (nameMatchScore) {
        nameMatchStatus = "MATCHED";
      } else {
        nameMatchStatus = "NOT MATCHED";
      }
    }
    return nameMatchStatus;
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

                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Owner No.</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Owner Name</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Father/ Mother/ Husband/ Spouse Name</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Address</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>E-KYC Status</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Owner Status</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Verify E-KYC</TableCell>
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
                      <TableCell>{OwnerExists(row.OWNERNUMBER) ?
                        <Button variant="contained" color="primary" onClick={VerfiyEKYC}>
                          Verfiy EKYC
                        </Button>
                        :
                        ""
                      }
                      </TableCell>
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
                          width: 'auto',
                          height: 'auto',
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
                        value={nameMatchStatuses[owner.OWNERNUMBER] || "Loading..."}
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
                            // disabled
                            inputProps={{ readOnly: true }}
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
                      {editableIndex === index ? (
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
                      <Typography sx={{ fontWeight: 'bold' }}>
                        Gender :
                      </Typography>
                      <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
                        <RadioGroup row name="Gender" value={owner.GENDER} onChange={handleChange}>
                          <FormControlLabel value="M" control={<Radio disabled={true} />} label="Male" />
                          <FormControlLabel value="F" control={<Radio disabled={true} />} label="Female" />
                          <FormControlLabel value="O" control={<Radio disabled={true} />} label="Other" />
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
                      {editableIndex === index ? (
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
                              <br></br>
                              {!otpButtonDisabled && (
                                <>
                                  <Button variant="contained" color="primary" onClick={() => handleGenerateOtp(index)}>
                                    Generate OTP
                                  </Button>
                                </>
                              )}
                              {otpButtonDisabled && (
                                <Typography >
                                  Resend OTP in {timer} seconds
                                </Typography>

                              )}
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
                              <br></br>
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
                      {editableIndex === index ? (
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

                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Owner No.</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Owner Name</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Father/ Mother/ Husband/ Spouse Name</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Address</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Mobile Number</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Owner Photo</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Mobile Verification</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>E-KYC</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>NAME MATCH STATUS</TableCell>
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
                  tablesdata9.map((row) => {

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
            <Button variant="contained" color="success" onClick={handleNavigation}>
              Next
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default OwnerDetails;
