import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Grid, Box, Container, Typography, Tooltip, IconButton,
  FormControl, MenuItem, Select, InputLabel,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormHelperText
} from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import InfoIcon from '@mui/icons-material/Info';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../components/Axios';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/en-gb';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import '../components/Shake.css';
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
    DocumentType: '',
    documentregistereddate: "",
    DocumentDetails: '',
    DocumentNumber: '',
  });
  const validationSchema = Yup.object().shape({
    DocumentType: Yup.string().required('Document Type is required'),
    DocumentNumber: Yup.string().required('Document Number is required'),
  });
  const [tableData, setTableData] = useState([
  ]);
  const navigate = useNavigate();
  const [tablesdata2, setTablesData2] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileExtension, setfileExtension] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const getPropertyphoto = (selectedFile) => {
    return new Promise((resolve, reject) => {
      if (!selectedFile) {
        resolve(''); // Return an empty string if no file is selected
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        const propertyphoto = reader.result.split(',')[1];
        resolve(propertyphoto);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleChange = async (e) => {

    const { name, value } = e.target;
    if (name === "DocumentType") {
      if (value === 26) {
        setIsEditable(true);
      } else {
        setIsEditable(false);
      }
    }
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const { t } = useTranslation();
  const fetchData = async () => {
    try {
      const response1 = await axiosInstance.get('BBMPCITZAPI/GetMasterDocByCategoryOrClaimType?ULBCODE=555&CATEGORYID=1');
      const response2 = JSON.parse(sessionStorage.getItem('NCL_TEMP_API'));
      const { Table1 = [] } = response1.data;
      const { Table15: NCLTable15 = [] } = response2.data;
      setTableData(NCLTable15.length > 0 ? NCLTable15 : []);
      setTablesData2(Table1.length > 0 ? Table1 : []);
    } catch (error) {
      toast.error("Error saving data ", error, {
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
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 5 * 1024 * 1024;
    if (file && file.size > maxSize) {
      toast.error('File size exceeds 5 MB limit');
      e.target.value = null;
      setSelectedFile(null);
      return;
    }
    const fileName = file.name;
    const fileExtension = fileName.split('.').pop().toLowerCase();
    setfileExtension(fileExtension);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(file);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleFileDelete = () => {
    setSelectedFile(null);
    setfileExtension('');
  }
  const handleSubmit = async (e) => {

    var propertyphoto2 = "";

    if (selectedFile) {
      propertyphoto2 = await getPropertyphoto(selectedFile);
    }
    if(fileExtension.length === 0)
      {
        toast.error("Please Upload the Required Document");
        return
      }
      if(selectedDate === null)
        {
        toast.error("Please Provide Document Registed Date");
        return
      }
      const today = new Date();
      if (new Date(selectedDate) > today) {
        toast.error("Document Registered Date cannot be greater than today");
        return;
      }
    const data = {
      ordernumber: formData.DocumentNumber,
      createdby: "crc",
      documentextension: fileExtension,
      propertycode: JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')),
      documentdetails: formData.DocumentDetails,
      scanneddocument: propertyphoto2, //bytes

      orderdate: selectedDate,
      documenttypeid: formData.DocumentType,
      ulbcode: 555,
      eidappno: JSON.parse(sessionStorage.getItem('EIDAPPNO'))
      //  createdip: string

    }

    try {
      await axiosInstance.post('BBMPCITZAPI/NCL_PROPERTY_ID_TEMP_INS?ID_BASIC_PROPERTY=0', data
      )

      const response1 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP?ULBCODE=555&EIDAPPNO=' + JSON.parse(sessionStorage.getItem('EIDAPPNO')) + '&Propertycode=' + JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')) + '');
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
      setTimeout(async () => {
        await fetchData();
        //    handleNavigation()
      }, 2000);
    } catch (error) {
      await toast.error("Error saving data!" + error, {
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
  const back = () => {
    navigate('/PropertyRights')
  }
  const handleNavigation = () => {

    navigate('/ClassificationDocumentUploadPage');

  }
  const handleDownload = (base64Data, fileExtension, documentdescription) => {
    const filename = `${documentdescription}.${fileExtension.toLowerCase()}`;

    const mimeTypes = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    };

    const mimeType = mimeTypes[fileExtension.toLowerCase()] || 'application/octet-stream';


    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length).fill().map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });


    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();


    URL.revokeObjectURL(link.href);
  };
  const handleDelete = async (row) => {

    const data = {
      propertyCode: JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')),
      documentid: row.DOCUMENTID,
      ulbcode: 555,
      eidappno: JSON.parse(sessionStorage.getItem('EIDAPPNO'))
    }
    try {
      await axiosInstance.post('BBMPCITZAPI/NCL_PROPERTY_ID_TEMP_DEL?ID_BASIC_PROPERTY=0', data
      )
      const response1 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP?ULBCODE=555&EIDAPPNO=' + JSON.parse(sessionStorage.getItem('EIDAPPNO')) + '&Propertycode=' + JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')) + '');
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
      setTimeout(async () => {
        await fetchData();
        //    handleNavigation()
      }, 2000);
    } catch (error) {
      await toast.error("Error Deleting data!" + error, {
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


  useEffect(() => {

    fetchData();

  }, []);
  return (
    <Container maxWidth="xl">
      <ToastContainer />
      <Box sx={{ backgroundColor: '#f0f0f0', padding: 4, borderRadius: 2, mt: 8 }}>
        <Formik
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange={handleChange}
          enableReinitialize
        >
          {({ errors, touched, handleBlur }) => (
            <Form>
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
                Eligibility Documents
              </Typography>
              <Typography variant="h6"
                align="center"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  fontFamily: "sans-serif",
                  marginBottom: 3,
                  color: '#df1414',
                  fontSize: {
                    xs: '1rem',
                    sm: '1rem',
                    md: '1.3rem',
                  }
                }}> (* One of the accompanying documents must be uploaded)</Typography>
              <Grid container spacing={4}>


                <Grid item xs={12} sm={4}>
                  <FormControl
                    fullWidth
                    error={touched.DocumentType && !!errors.DocumentType}
                    sx={{ marginBottom: 3 }}
                    className={touched.DocumentType && !!errors.DocumentType ? 'shake' : ''}
                  >
                    <InputLabel>Document Type :</InputLabel>
                    <Select
                      name="DocumentType"
                      value={formData.DocumentType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value="">--Select--</MenuItem>
                      {tablesdata2.map((item) => (
                        <MenuItem key={item.DOCUMENTTYPEID} value={item.DOCUMENTTYPEID}>
                          {item.DOCUMENTTYPEDESCRIPTION_EN}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {touched.DocumentType && errors.DocumentType ? errors.DocumentType : ''}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3.5}>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                    <DatePicker

                      label="Document Registered Date (dd-mm-yyyy)"
                      name='documentregistereddate'
                      placeholder='dd-mm-yyyy'
                      value={selectedDate}
                      onChange={date => handleDateChange(date)}
                      disableFuture
                      sx={{ width: '100%' }}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    variant={isEditable ? "standard" : "filled"}
                    label={"Document Details:"}
                    placeholder='Document Details'
                    name="DocumentDetails"
                    value={formData.DocumentDetails}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: !isEditable,
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
                    name="DocumentNumber"
                    value={formData.DocumentNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touched.DocumentNumber && !!errors.DocumentNumber ? 'shake' : ''}
                    error={touched.DocumentNumber && !!errors.DocumentNumber}
                    helperText={touched.DocumentNumber && errors.DocumentNumber}
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

                    >
                      {t("Uploadfile")}
                      <VisuallyHiddenInput type="file" accept=".jpg,.jpeg,.png,.pdf,.doc" onChange={handleFileChange} />
                    </Button>

                  </Box>
                  {selectedFile && (
                    <Box display="flex" alignItems="center" mt={2}>
                      <Typography variant="body1">{selectedFile.name}</Typography>
                      <Button color="error" onClick={handleFileDelete} sx={{ ml: 2 }}>
                        Delete
                      </Button>
                    </Box>
                  )}
                  <Typography variant="body1" sx={{ ml: 1, color: '#df1414' }}>
                    Maximum File Size should not exceed 5 MB
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Documents Uploaded
              </Typography>
              <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Sl No.</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Document</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Document Details</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Document Number</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Document Registered Date</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Uploaded Document</TableCell>
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
                          <TableCell>{row.DOCUMENTID}</TableCell>
                          <TableCell>{row.DOCUMENTTYPEDESCRIPTION}</TableCell>
                          <TableCell>{row.DOCUMENTDETAILS}</TableCell>
                          <TableCell>{row.ORDERNUMBER}</TableCell>
                          <TableCell>{row.ORDERDATE}</TableCell>
                          <TableCell>
                            {row.SCANNEDDOCUMENT ?
                              <IconButton onClick={() => handleDownload(row.SCANNEDDOCUMENT, row.DOCUMENTEXTENSION, row.DOCUMENTTYPEDESCRIPTION)}>
                                <GetAppIcon color='primary' />
                              </IconButton>
                              :
                              ""
                            }
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

                <Button variant="contained" color="primary" onClick={handleNavigation}>
                  Next
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default DocumentUploadPage;
