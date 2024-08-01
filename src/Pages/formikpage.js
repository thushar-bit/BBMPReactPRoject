import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Container, Tooltip, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const Formikpage = () => {
  const [formData, setFormData] = useState({
    propertyCode: '',
    streetid: '',
    streetName: '',
    Street: '',
    doorno: '',
    buildingname: '',
    areaorlocality: '',
    landmark: '',
    pincode: '',
    propertyphoto: '',
    categoryId: 2,
    puidNo: '',
    loginId: 'crc',
    verifySASNUM: '',
    lat1: 0,
    long1: 0
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const validationSchema = Yup.object().shape({
    // propertyNumber: Yup.string().required('Property Number is required'),
    // DoorPlotNo: Yup.string().required('Door/Plot Number is required'),
    buildingname: Yup.string().required('Building/Land Name is required'),
    // AreaLocality: Yup.string().required('Area/Locality is required'),
    // NearestLandmark: Yup.string().required('Nearest Landmark is required'),
    // Pincode: Yup.string()
    //   .required('Pincode is required')
    //   .matches(/^\d{6}$/, 'Pincode must be a 6-digit number'),
    // verifySASNUM: Yup.string().required('SAS Application Number is required'),
    // streetid: Yup.string().required('Street is required'),
  });

  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);

  const handleAddressEdit = () => {
    setIsEditable((prev) => !prev);
  };

  const submitForm = async () => {
    debugger
    console.log(formData.buildingname)
    
      console.log('Form data submitted successfully:', formData.buildingname);
      toast.success('Form submitted successfully');
    
      // Optionally, navigate to another page or perform other actions after successful submission
      // navigate('/next-page');
   
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ backgroundColor: '#f0f0f0', padding: 4, borderRadius: 2, mt: 8 }}>
        <ToastContainer />
        <Formik
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={submitForm}
          validateOnChange={handleChange}
          enableReinitialize
        >
          {({ errors, touched, handleBlur }) => (
            <Form>
              <TextField
                fullWidth
                label="Building Land Name"
                name="buildingname"
                variant={isEditable ? "standard" : "filled"}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.buildingname && !!errors.buildingname}
                helperText={touched.buildingname && errors.buildingname}
                InputProps={{
                  readOnly: !isEditable,
                }}
              />
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" gap={2}>
                  <Button variant="contained" color="primary" onClick={handleAddressEdit}>
                    Edit Address
                  </Button>
                  <Button variant="contained" color="success" type="submit" >
                    Save
                  </Button>
                </Box>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Formikpage;
