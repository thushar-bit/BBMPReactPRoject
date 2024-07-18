import React, { useState } from 'react';
import {
  TextField, Button,  Box, Container, Typography, 
   FormControl, MenuItem, Select, InputLabel
} from '@mui/material';
//import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../components/Axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SiteDetails = () => {
  const [formData, setFormData] = useState({
    features:"",
    Typeofuse:"",
    yearOfConstruction:""
  });
  const navigate = useNavigate();
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
    if(name === "yearOfConstruction")
      {
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

  const handleSubmit =  async (e) => {
    e.preventDefault();
    const data = {
      propertyCode: 104931,
      featureheadid: formData.features,
      featureid: formData.Typeofuse,
      builtyear: formData.yearOfConstruction,
loginId: "crc"

}
debugger
try {
  await  axiosInstance.post('BBMPCITZAPI/UPD_NCL_PROPERTY_SITE_TEMP_USAGE', data
   )
  
   const response1 = await axiosInstance.get('BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_NCLTEMP?UlbCode=555&propertyid=104931');
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
   setTimeout(() => {
    window.location.reload();
//    handleNavigation()
  }, 1000);
 } catch (error) {
await   toast.error("Error saving data!" + error, {
     position: "top-right",
     autoClose: 5000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
   });
 }
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
        const table2Item = Table2.length > 0 ? Table2[0] : {};
        const table16Item = Table16.length > 0 ? Table16 : {};
       setTablesData2(table16Item);
       if(table2Item.FEATUREHEADID !== null && table2Item.FEATUREHEADID !== ""){
        debugger
       const response3 = await axiosInstance.get(`BBMPCITZAPI/GetNPMMasterTable?FeaturesHeadID=${table2Item.FEATUREHEADID}`);
       if (response3.data.Table.length > 0) {
        setTablesData3(response3.data.Table);
      }
       }
    if (table2Item) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        features:table2Item.FEATUREHEADID || "",
        Typeofuse:table2Item.FEATUREID || "",
         yearOfConstruction: table2Item.BUILTYEAR || '',
      }));
    }
  }
  React.useEffect(() => {
    
    fetchData();
        
  }, []);
 
  return (
    <Container maxWidth="lg">
      <ToastContainer/>
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
