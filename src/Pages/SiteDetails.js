import React, { useState } from 'react';
import {
  TextField, Button,  Box, Container, Typography, 
   FormControl, MenuItem, Select, InputLabel
} from '@mui/material';
//import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../components/Axios';
const SiteDetails = () => {
  const [formData, setFormData] = useState({
    features:"",
    Typeofuse:"",
    yearOfConstruction:""
  });
  const navigate = useNavigate();
  const [tablesdata,setTablesData] = useState([]);
  const [tablesdata2,setTablesData2] = useState([]);
  const [tablesdata3,setTablesData3] = useState([]);
  const handleChange = async (e) => {
    const { name, value } = e.target;
  debugger
    if (name === "features") {
      try {
        const response = await axiosInstance.get(`BBMPCITZAPI/GetNPMMasterTable?FeaturesHeadID=${value}`);
        if (response.data.Table.length > 0) {
          setTablesData3(response.data.Table);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
       
      }
    }
  
    setFormData({
      ...formData,
      [name]: value
    });
  };
  

 // const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data logic here
  };
  const back = () => {
    navigate('/AreaDimension/vacant')
  }
  const handleNavigation= () =>{
    debugger
    navigate('/OwnerDetails')
    
  }
  const fetchData = async () => {
    const response1 = await axiosInstance.get('BBMPCITZAPI/GetMasterTablesData?UlbCode=555');
    const response2 = JSON.parse(sessionStorage.getItem('NCL_TEMP_API'));
    const {  Table16   } = response1.data;
        const {  Table2   } = response2.data;
        setTablesData({ Table2});
        const table1Item = Table2.length > 0 ? Table2[0] : {};
        const table16Item = Table16.length > 0 ? Table16 : {};
       setTablesData2(table16Item);
       if(table1Item.FEATUREID !== null || table1Item.FEATUREID !== ""){
        debugger
       const response3 = await axiosInstance.get(`BBMPCITZAPI/GetNPMMasterTable?FeaturesHeadID=${table1Item.FEATUREID}`);
       if (response3.data.Table.length > 0) {
        setTablesData3(response3.data.Table);
      }
       }
    if (table1Item) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        features:table1Item.FEATUREHEADID || "",
        Typeofuse:table1Item.FEATUREID || "",
         yearOfConstruction: table1Item.BUILTYEAR || '',
      }));
    }
  }
  React.useEffect(() => {
    
    fetchData();
        
  }, []);
 
  return (
    <Container maxWidth="lg">
      <Box sx={{ backgroundColor: '#f0f0f0', padding: 4, borderRadius: 2, mt: 8 }}>
        <form onSubmit={handleSubmit}>
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
          <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <InputLabel>Features :</InputLabel>
        <Select
          name="features"
          value={formData.features}
          onChange={handleChange}
        >
          <MenuItem value="">--Select--</MenuItem>
          {tablesdata2.map((item) => (
            <MenuItem key={item.FEATUREHEADID} value={item.FEATUREHEADID}>
              {item.FEATUREHEADNAME_EN}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginBottom: 3 }}>
  <InputLabel>Type of use(Sub Category) :</InputLabel>
  <Select
    name="Typeofuse"
    value={formData.Typeofuse}
    onChange={handleChange}
  >
    <MenuItem value="">--Select--</MenuItem>
    {tablesdata3.map((item) => (
      <MenuItem key={item.FEATUREID} value={item.FEATUREID}>
        {item.FEATURENAME_EN}
      </MenuItem>
    ))}
  </Select>
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
                 
                />
          </FormControl>
          <Box display="flex" justifyContent="center" gap={2} mt={3}>
          <Button variant="contained" color="primary" onClick={back}>
              Previous
            </Button>
            <Button variant="contained" color="success" type="submit">
              Save
            </Button>
            <Button variant="contained" color="error" type="reset">
              Clear
            </Button>
            <Button variant="contained" color="primary" onClick={handleNavigation}>
              Next
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default SiteDetails;
