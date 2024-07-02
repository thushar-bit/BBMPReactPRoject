import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Box,Container, Typography, CircularProgress ,Tooltip,IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
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

const MultiStoreyBuildingDetails = () => {
  const [formData, setFormData] = useState({
    propertyCode: '',
    streetid: '',
    doorno: '',
    buildingname: '',
    areaorlocality: '',
    landmark: '',
    pincode: '',
    propertyphoto: '',
    categoryId: 2,
    puidNo: '',
    loginId: 'crc'
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tablesdata,setTablesData] = useState([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:44368/v1/BBMPCITZAPI/GET_PROPERTY_PENDING_CITZ_BBD_DRAFT?UlbCode=555&propertyid=104931');
      const { Table, Table1, Table2, Table3, Table4, Table5, Table6, Table7 } = response.data;
      setTablesData({ Table, Table1, Table2, Table3, Table4, Table5, Table6, Table7 });

      const table1Item = Table1.length > 0 ? Table1[0] : {};
      const table5Item = Table5.length > 0 ? Table5[0] : {};

      setFormData({
        propertyEID: table1Item.PROPERTYID || '',
        address: table1Item.ADDRESS || '',
        district: table1Item.DISTRICTNAME || '',
        wardNumber: table1Item.WARDNUMBER || '',
        propertyNumber: table1Item.PROPERTYCODE || '',
        ulbname: table1Item.ULBNAME || '',
        ownerName: table5Item.OWNERNAME || '',
        streetName: table1Item.STREETNAME_EN || '',
        DoorPlotNo: '',
        BuildingLandName: '',
        Street: '',
        NearestLandmark: '',
        Pincode: '',
        AreaLocality: ''
      });
      setLoading(false);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const { t } = useTranslation();
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileDelete = () => {
    setSelectedFile(null);
  };


const  handleSubmit = async (e) => {
  e.preventDefault();
  let propertyphoto = '';
  setLoading(true);
       if (selectedFile) {
         const reader = new FileReader();
         reader.readAsDataURL(selectedFile);
         reader.onloadend = async () => {
           propertyphoto = reader.result.split(',')[1];
  reader.onloadend =  async () => {
    const propertyphoto = reader.result.split(',')[1];
  }
    debugger
    const data = {
      propertyCode: formData.propertyNumber,
      streetid: formData.streetid, 
      doorno: formData.DoorPlotNo,
      buildingname: formData.BuildingLandName,
      areaorlocality: formData.AreaLocality,
      landmark: formData.NearestLandmark,
      pincode: formData.Pincode,
      propertyphoto:propertyphoto,
      categoryId: 2,
      puidNo: 's23', 
      loginId: 'crc'
    };
    try {
     await  axios.post('https://localhost:44368/v1/BBMPCITZAPI/GET_PROPERTY_CTZ_PROPERTY', data
      )
      setSelectedFile(null);
     await toast.success("Details Saved Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
    
    } catch (error) {
   await   toast.error("Error saving data", {
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
} 
setLoading(false);
}


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
    <Container maxWidth="lg">
      <Box sx={{ backgroundColor: '#f0f0f0', padding: 4, borderRadius: 2, mt: 8 }}>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            fontFamily:"sans-serif",
            marginBottom: 3,
            color: '#',
            fontSize: {
              xs: '1.5rem',
              sm: '2rem',
              md: '2.5rem',
            }
          }}
        >
          {t("DataAvailableInBBMPBooks")}
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="filled"
              label="Property EID"
              name="propertyEID"
              value={formData.propertyEID}
              onChange={handleChange}
              InputProps={{
                readOnly: true,
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
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="filled"
                InputProps={{
                readOnly: true,
                endAdornment: (
                  <Tooltip title={t("cityInfo")}>
                     <IconButton color="primary">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                )
              }}
              label={t("city")}
              name="ulbname"
              value={formData.ulbname}
              onChange={handleChange}
              
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="filled"
                InputProps={{
                readOnly: true,
                endAdornment: (
                  <Tooltip title={t("districtInfo")}>
                    <IconButton color="primary">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                )
              }}
              label={t("district")}
              name="district"
              value={formData.district}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="filled"
              label={t("wardNumber")}
              name="wardNumber"
              value={formData.wardNumber}
              onChange={handleChange}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Tooltip title={t("wardNumberInfo")}>
                     <IconButton color="primary">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="filled"
              label={t("propertyNumber")}
              name="propertyNumber"
              value={formData.propertyNumber}
              onChange={handleChange}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Tooltip title={t("propertyNumberInfo")}>
                     <IconButton color="primary">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="filled"
              label={t("ownerName")}
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Tooltip title={t("ownerNameInfo")}>
                     <IconButton color="primary">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="filled"
              label={t("streetName")}
              name="streetName"
              value={formData.streetName}
              onChange={handleChange}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Tooltip title={t("streetNameInfo")}>
                     <IconButton color="primary">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                )
              }}
            />
          </Grid>
        </Grid>
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            fontFamily:"sans-serif",
            marginBottom: 3,
            color: '#1565c0',
            fontSize: {
              xs: '1.5rem',
              sm: '2rem',
              md: '2.5rem',
            }
          }}
        >
           {t("PostalAddressofProperty")}
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label={t("doorPlotNo")}
              name="DoorPlotNo"
              value={formData.DoorPlotNo}
              onChange={handleChange}
              InputProps={{
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
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t("buildingLandName")}
              name="BuildingLandName"
              value={formData.BuildingLandName}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <Tooltip title={t("buildingLandNameInfo")}>
                     <IconButton color="primary">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t("street")}
              name="Street"
              value={formData.Street}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <Tooltip title={t("streetInfo")}>
                     <IconButton color="primary">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t("nearestLandmark")}
              name="NearestLandmark"
              value={formData.NearestLandmark}
              onChange={handleChange}
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
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t("pincode")}
              name="Pincode"
              type="number"
              value={formData.Pincode}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <Tooltip title={t("pincodeInfo")}>
                     <IconButton color="primary">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t("areaLocality")}
              name="AreaLocality"
              value={formData.AreaLocality}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <Tooltip title={t("areaLocalityInfo")}>
                     <IconButton color="primary">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
                <VisuallyHiddenInput type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} />
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
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button variant="contained" color="success" type="submit">
            {t("save")}
            </Button>
            <Button variant="contained" color="error" type="reset"
            onClick={() => setFormData({
              DoorPlotNo: '',
              BuildingLandName: '',
              Street: '',
              NearestLandmark: '',
              Pincode: '',
              AreaLocality: ''
            })}
          >
            {t("clear")}
              
            </Button>
            <Button variant="contained" color="primary" onClick={navigate('/AreaDimension')}>
            Next
            </Button>
          </Box>
        </Grid>
      </form>
    </Box>
    </Container>
  );
};

export default MultiStoreyBuildingDetails;
