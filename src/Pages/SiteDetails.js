import React, { useState } from 'react';
import {
  TextField, Button, Box, Container, Typography,
  FormControl, MenuItem, Select, InputLabel, FormHelperText
} from '@mui/material';
//import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../components/Axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import '../components/Shake.css';
import Loaders from '../components/Loader';
const SiteDetails = () => {
  const [formData, setFormData] = useState({
    features: "",
    Typeofuse: "",
    yearOfConstruction: ""
  });
  
  const validationSchema = Yup.object().shape({
    features: Yup.string().required('Type of Feature is required'),
    Typeofuse: Yup.string().required('Type Of Use is required'),
    yearOfConstruction: Yup.string()
      .required('Year of Construction is required')
      .matches(/^\d{4}$/, 'Year of Construction must be a 4-digit number'),

  });
  const navigate = useNavigate();
  const [tablesdata2, setTablesData2] = useState([]);
  const [tablesdata3, setTablesData3] = useState([]);
  const [isInitialEditable,setInitialEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (name === "features") {
      try {
        const response = await axiosInstance.get(`BBMPCITZAPI/GetNPMMasterTable?FeaturesHeadID=${value}`);
        if (response.data.Table.length > 0) {
          setTablesData3(response.data.Table);
        }
      } catch (error) {
        toast.error("error Fetching data", error)
        setTimeout(() => {
          navigate('/ErrorPage', { state: { errorMessage: error.message, errorLocation: window.location.pathname } });
        }, 2000);
      }
    }
    if (name === "yearOfConstruction") {
      if (/^\d{0,4}$/.test(value)) {
        setFormData(prevFormData => ({
          ...prevFormData,
          [name]: value
        }));
      }
      return
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };


  // const { t } = useTranslation();

  const handleSubmit = async (e) => {
debugger
    const data = {
      propertyCode: JSON.parse(sessionStorage.getItem('SETPROPERTYCODE')),
      featureheadid: formData.features,
      featureid: formData.Typeofuse,
      builtyear: formData.yearOfConstruction,
      loginId: "crc",
      p_BOOKS_PROP_APPNO: JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))

    }

    try {
      await axiosInstance.post('BBMPCITZAPI/UPD_NCL_PROPERTY_SITE_TEMP_USAGE', data
      )

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
        setInitialEditable(false);
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
  const handleEdit = () => {
    if(isInitialEditable)
      {
      setInitialEditable(false);
    }
    else {
      setInitialEditable(true);
    }
  }
  const back = () => {
    navigate('/AreaDimension')
  }
  const handleNavigation = () => {

    navigate('/OwnerDetails')

  }
  const fetchData = async () => {
    debugger
    try {
      setLoading(true);
      const response1 = await axiosInstance.get('BBMPCITZAPI/GetMasterTablesData?UlbCode=555');
      const response2 = JSON.parse(sessionStorage.getItem('NCL_TEMP_API'));
      const { Table16 = [] } = response1.data;
      const { Table2 = [] } = response2.data;
      if(Table2.length === 0){
        setInitialEditable(true)
      }
      const table2Item = Table2.length > 0 ? Table2[0] : [];
      const table16Item = Table16.length > 0 ? Table16 : [];
      setTablesData2(table16Item);
      debugger
      if (table2Item) {
        if (table2Item.FEATUREHEADID !== null && table2Item.FEATUREHEADID !== "" && table2Item.FEATUREHEADID !== undefined) {
          const response3 = await axiosInstance.get(`BBMPCITZAPI/GetNPMMasterTable?FeaturesHeadID=${table2Item.FEATUREHEADID}`);
          if (response3.data.Table.length > 0) {
            setTablesData3(response3.data.Table);
          }
        }
        if (table2Item) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            features: table2Item.FEATUREHEADID || "",
            Typeofuse: table2Item.FEATUREID || "",
            yearOfConstruction: table2Item.BUILTYEAR || '',
          }));
        }
      }
      setLoading(false)
    } catch (error) {
      toast.error("something went wrong",error)
      setTimeout(() => {
        navigate('/ErrorPage', { state: { errorMessage: error.message, errorLocation: window.location.pathname } });
      }, 2000);
    }

  }
  React.useEffect(() => {

    fetchData();

  }, []);

  return (
    <Container maxWidth="lg">
      <Loaders loading={loading} />
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
                variant="h5"
                align="center"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  marginBottom: 3,
                }}
              >
                Details Of Usage Of Vacant Plot
              </Typography>
              <FormControl
                fullWidth
                error={touched.features && !!errors.features}
                sx={{ marginBottom: 3 }}
                className={touched.features && !!errors.features ? 'shake' : ''}
              >
                <InputLabel>Features :</InputLabel>
                <Select
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  sx={{ backgroundColor: !isInitialEditable?  '':"#ffff" }}
                      inputProps={{ readOnly: !isInitialEditable }}
                >
                  <MenuItem value="">--Select--</MenuItem>
                  {tablesdata2.map((item) => (
                    <MenuItem key={item.FEATUREHEADID} value={item.FEATUREHEADID}>
                      {item.FEATUREHEADNAME_EN}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {touched.features && errors.features ? errors.features : ''}
                </FormHelperText>
              </FormControl>
              <FormControl
                fullWidth
                error={touched.Typeofuse && !!errors.Typeofuse}
                sx={{ marginBottom: 3 }}
                className={touched.Typeofuse && !!errors.Typeofuse ? 'shake' : ''}
              >
                <InputLabel>Type of use(Sub Category) :</InputLabel>
                <Select
                  name="Typeofuse"
                  value={formData.Typeofuse}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ backgroundColor: !isInitialEditable?  '':"#ffff" }}
                      inputProps={{ readOnly: !isInitialEditable }}
                >
                  <MenuItem value="">--Select--</MenuItem>
                  {tablesdata3.map((item) => (
                    <MenuItem key={item.FEATUREID} value={item.FEATUREID}>
                      {item.FEATURENAME_EN}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {touched.Typeofuse && errors.Typeofuse ? errors.Typeofuse : ''}
                </FormHelperText>
              </FormControl>

              <FormControl fullWidth sx={{ marginBottom: 3 }}>
                <InputLabel></InputLabel>
                <TextField
                  fullWidth
                  label="
                       Year Of Construction/Usage Started"
                  name="yearOfConstruction"
                  value={formData.yearOfConstruction}
                  onChange={handleChange}
                  type="number"
                  className={touched.yearOfConstruction && !!errors.yearOfConstruction ? 'shake' : ''}
                  error={touched.yearOfConstruction && !!errors.yearOfConstruction}
                  helperText={touched.yearOfConstruction && errors.yearOfConstruction}
                  InputProps={{
                  style: { backgroundColor:  isInitialEditable ? '#ffff': "" } ,
                  readOnly: !isInitialEditable,
                }}
                />
              </FormControl>
              <Box display="flex" justifyContent="center" gap={2} mt={3}>
                <Button variant="contained" color="primary" onClick={back}>
                  Previous
                </Button>
                <Button variant="contained" color="primary" onClick={handleEdit}>
                  Edit
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

export default SiteDetails;
