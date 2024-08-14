import React, { useState, useEffect } from 'react';
import {
  Button, Box, Container, Typography, Tooltip, IconButton, Grid, TextField,
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
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import '../components/Shake.css';
const PropertyRights = () => {
  const [formData, setFormData] = useState({

    propertyrights: ""

  });
  const validationSchema = Yup.object().shape({
    propertyrights: Yup.string().required('Property Rights / Encumbrances is required')
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
      propertyrights: row.RIGHTS || ""
    });
  };
  const handleDelete = async (row) => {

    try {
      await axiosInstance.get("BBMPCITZAPI/NCL_PROPERTY_RIGHTS_TEMP_DEL?P_BOOKS_PROP_APPNO=" + JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO')) + "&RIGHTSID=" + row.PROPERTYRIGHTSID + "&ID_BASIC_PROPERTY=" + IDBASICPROPERTY + "&ULBCODE=" + 555 + "&PROPERTYCODE=" + JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')))

      const response1 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP?ULBCODE=555&P_BOOKS_PROP_APPNO=' + JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO')) + '&Propertycode=' + JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')) + '');
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
      setTimeout(async () => {
        await fetchData();
        //    handleNavigation()
      }, 2000);
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

  const fetchData = async () => {
    const response1 = JSON.parse(sessionStorage.getItem('NCL_TEMP_API'));
    const { Table1 = [], Table6 = [] } = response1.data;
    const tableItem = Table1.length > 0 ? Table1[0] : [];
    const table6Item = Table6.length > 0 ? Table6 : [];
    setTableData(table6Item);
    setIDBASICPROPERTY(tableItem.ID_BASIC_PROPERTY)
  }
  useEffect(() => {
    fetchData();
  }, []);
  const handleSubmit = async (e) => {


    if (isEditable === false) {
      const data = {
        rights: formData.propertyrights,
        propertycode: JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')),
        createdby: "crc",
        ulbcode: 555,
        p_BOOKS_PROP_APPNO: JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))
      }
      try {
        await axiosInstance.post("BBMPCITZAPI/NCL_PROPERTY_RIGHTS_TEMP_INS?ID_BASIC_PROPERTY=" + IDBASICPROPERTY, data)

        const response1 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP?ULBCODE=555&P_BOOKS_PROP_APPNO=' + JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO')) + '&Propertycode=' + JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')) + '');
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
    }
    else {
      const data = {
        rights: formData.propertyrights,
        propertyrightsid: Propertyrightsid,
        propertycode: JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')),
        createdby: "crc",
        ulbcode: 555,
        p_BOOKS_PROP_APPNO: JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))
      }
      try {
        await axiosInstance.post("BBMPCITZAPI/NCL_PROPERTY_RIGHTS_TEMP_UPD?ID_BASIC_PROPERTY=" + IDBASICPROPERTY, data)

        const response1 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP?ULBCODE=555&P_BOOKS_PROP_APPNO=' + JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO')) + '&Propertycode=' + JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')) + '');
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
        setTimeout(async () => {
          setIsEditable(false);
          await fetchData();
          //    handleNavigation()
        }, 2000);
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
                Property Rights / Encumbrances
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={9}>
                  <TextField
                    fullWidth
                    label="Property Rights/Encumbrances:"
                    name="propertyrights"
                    value={formData.propertyrights}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={touched.propertyrights && !!errors.propertyrights ? 'shake' : ''}
                    error={touched.propertyrights && !!errors.propertyrights}
                    helperText={touched.propertyrights && errors.propertyrights}
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

                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>PROPERTY RIGHTS NO</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>PROPERTY RIGHTS</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>EDIT</TableCell>
                      <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>DELETE</TableCell>

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
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default PropertyRights;
