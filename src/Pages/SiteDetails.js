import React, { useState } from 'react';
import {
  TextField, Button, Box, Container, Typography,
  FormControl, MenuItem, Select, InputLabel, FormHelperText,Skeleton 
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../components/Axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import '../components/Shake.css';
import LabelWithAsterisk   from '../components/LabelWithAsterisk'
const SiteDetails = () => {
  const [formData, setFormData] = useState({
    features: "",
    Typeofuse: "",
    yearOfConstruction: ""
  });
  const { t } = useTranslation();
  const validationSchema = Yup.object().shape({
    features: Yup.string().required(`${t('usageCategoryRequired')}`).notOneOf(['0'], `${t('UsageCategoryInvalid')}`),
    Typeofuse: Yup.string().required(`${t('typeOfUseRequired')}`).notOneOf(['0'], `${t('typeOfUseRequiredInvalid')}`),
    yearOfConstruction: Yup.string()
      .required(`${t('yearUsageRequired')}`)

  });
  const navigate = useNavigate();
  const [tablesdata2, setTablesData2] = useState([]);
  const [tablesdata3, setTablesData3] = useState([]);
  const [fieldvalue,setFieldValue] = useState("")
  const [isInitialEditable,setInitialEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (name === "features") {
      try {
        const response = await axiosInstance.get(`BBMPCITZAPI/GET_MST_FEATURE_BY_FEATUREHEADID?FEATUREHEADID=${value}`);
        if (response.data.Table.length > 0) {
          setTablesData3(response.data.Table);
        }
      } catch (error) {
        toast.error(`${t("error Fetching data")}`, error)
        setTimeout(() => {
          navigate('/ErrorPage', { state: { errorMessage: error.message, errorLocation: window.location.pathname } });
        }, 500);
      }
    }
    

    setFormData({
      ...formData,
      [name]: value
    });
  };


   

  const handleSubmit = async (e) => {
    debugger
if(isInitialEditable){
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

      
      await toast.success(`${t("detailsSavedSuccess")}`, {
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
        handleNavigation()
      }, 500);
    } catch (error) {
      await toast.error(`${t("errorSavingData")}` + error, {
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
      }, 500);
    }
  }else{
    handleNavigation()
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
    
    try {
      setLoading(true);
      const response1 = await axiosInstance.get('BBMPCITZAPI/GetMasterTablesData_React?UlbCode=555&Page=SITE_DETAILS');
      const response2 = await axiosInstance.get(`BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP_React?ULBCODE=555&P_BOOKS_PROP_APPNO=${JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))}&Propertycode=${JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))}&Page=SITE_DETAILS`);;
      const { Table1:MasterTable1 = [] } = response1.data;
      const { Table1 = [] } = response2.data;
      if(Table1.length === 0){
        setInitialEditable(true)
      }
      const table2Item = Table1.length > 0 ? Table1[0] : [];
      const table16Item = MasterTable1.length > 0 ? MasterTable1 : [];
      setTablesData2(table16Item);
      
      if (table2Item) {
        if (table2Item.FEATUREHEADID !== null && table2Item.FEATUREHEADID !== "" && table2Item.FEATUREHEADID !== undefined) {
          const response3 = await axiosInstance.get(`BBMPCITZAPI/GET_MST_FEATURE_BY_FEATUREHEADID?FEATUREHEADID=${table2Item.FEATUREHEADID}`);
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
      }, 500);
    }

  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
    }
  };
  React.useEffect(() => {

    fetchData();

  }, []);

  return (
    <Container maxWidth="md">
      {/* <Loaders loading={loading} /> */}
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
             <Form onKeyDown={handleKeyDown}>
              <Typography
                variant="h5"
                align="center"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  marginBottom: 3,
                }}
              >
                {t("DetailsOfUsageOfVacantPlot")}
              </Typography>
              {loading ? (
          <>
            <Skeleton variant="text" height={60} sx={{ marginBottom: 3 }}  animation="wave"/>
            <Skeleton variant="rectangular" height={48} sx={{ marginBottom: 3 }}  animation="wave"/>
            <Skeleton variant="rectangular" height={48} sx={{ marginBottom: 3 }} animation="wave" />
            <Skeleton variant="rectangular" height={48} sx={{ marginBottom: 3 }}  animation="wave"/>
          </>
        ) : (
          <>
              <FormControl
                fullWidth
                error={touched.features && !!errors.features}
                sx={{ marginBottom: 3 }}
                className={touched.features && !!errors.features ? 'shake' : ''}
              >
                <InputLabel>
                <LabelWithAsterisk text={t('UsageCategory')} />
                </InputLabel>
                <Select
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ backgroundColor: !isInitialEditable?  '':"#ffff" }}
                      inputProps={{ readOnly: !isInitialEditable }}
                >
                  <MenuItem value="0">--Select--</MenuItem>
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
                <InputLabel>
                    <LabelWithAsterisk text={t('Typeofuse')} /></InputLabel>
                <Select
                  name="Typeofuse"
                  value={formData.Typeofuse}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ backgroundColor: !isInitialEditable?  '':"#ffff" }}
                      inputProps={{ readOnly: !isInitialEditable }}
                >
                  <MenuItem value="0">--Select--</MenuItem>
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

              <FormControl
                    fullWidth
                    error={touched.yearOfConstruction && !!errors.yearOfConstruction}
                    sx={{ marginBottom: 3 }}
                    className={touched.yearOfConstruction && !!errors.yearOfConstruction ? 'shake' : ''}
                  >
                    <InputLabel>      <LabelWithAsterisk text={t('YearUsage')} /></InputLabel>
                    <Select
                      name="yearOfConstruction"
                      value={formData.yearOfConstruction}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ backgroundColor: '#ffff' }}
                    >
                      <MenuItem value="">--Select--</MenuItem>
                      <MenuItem value="Before 2000">Before 2000</MenuItem>
                      <MenuItem value="2000">2000</MenuItem>
                      <MenuItem value="2001">2001</MenuItem>
                      <MenuItem value="2002">2002</MenuItem>
                      <MenuItem value="2003">2003</MenuItem>
                      <MenuItem value="2004">2004</MenuItem>
                      <MenuItem value="2005">2005</MenuItem>
                      <MenuItem value="2006">2006</MenuItem>
                      <MenuItem value="2007">2007</MenuItem>
                      <MenuItem value="2008">2008</MenuItem>
                      <MenuItem value="2009">2009</MenuItem>
                      <MenuItem value="2010">2010</MenuItem>
                      <MenuItem value="2011">2011</MenuItem>
                      <MenuItem value="2012">2012</MenuItem>
                      <MenuItem value="2013">2013</MenuItem>
                      <MenuItem value="2014">2014</MenuItem>
                      <MenuItem value="2015">2015</MenuItem>
                      <MenuItem value="2016">2016</MenuItem>
                      <MenuItem value="2017">2017</MenuItem>
                      <MenuItem value="2018">2018</MenuItem>
                      <MenuItem value="2019">2019</MenuItem>
                      <MenuItem value="2020">2020</MenuItem>
                      <MenuItem value="2021">2021</MenuItem>
                      <MenuItem value="2022">2022</MenuItem>
                      <MenuItem value="2023">2023</MenuItem>
                      <MenuItem value="2024">2024</MenuItem>
                    </Select>
                    <FormHelperText>
                      {touched.yearOfConstruction && errors.yearOfConstruction ? errors.yearOfConstruction : ''}
                    </FormHelperText>
                  </FormControl>
              <Box display="flex" justifyContent="center" gap={2} mt={3}>
                <Button variant="contained" color="primary" onClick={back}>
                  {t("Previous")}
                </Button>
               
                <Button variant="contained" color="primary" onClick={handleEdit}>
                  {t("Edit")}
                </Button>

                <Button variant="contained" color="success" type="submit" >
                  {t("save")}
                </Button>
               
              </Box>
              </>
        )}
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default SiteDetails;
