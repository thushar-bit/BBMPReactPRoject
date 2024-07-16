import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box,Container, Typography, CircularProgress ,Tooltip,IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../components/Axios';
import ErrorPage from './ErrorPage';
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

const BbmpForm = () => {
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
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);


  const fetchData = async () => {
    setLoading(true)
    try {
      const response = JSON.parse(sessionStorage.getItem('BBD_DRAFT_API'));
      const response2 = JSON.parse(sessionStorage.getItem('NCL_TEMP_API'));
      
      const {  Table1,   Table5,   } = response.data;
      const {  Table17   } = response2.data;
    
      const table1Item = Table1.length > 0 ? Table1[0] : {};
      const table5Item = Table5.length > 0 ? Table5[0] : {};
      const table17Item = Table17.length > 0 ? Table17[0] : {};
      setPreviewUrl(`data:image1/png;base64,${table17Item.PROPERTYPHOTO}`); 
      
      setFormData({
        propertyEID: table1Item.PROPERTYID || '',
        address: table1Item.ADDRESS || '',
        district: table1Item.DISTRICTNAME || '',
        wardNumber: table1Item.WARDNUMBER || '',
        propertyNumber: table1Item.PROPERTYCODE || '',
        ulbname: table1Item.ULBNAME || '',
        ownerName: table5Item.OWNERNAME || '',
        streetName: table1Item.STREETNAME_EN || '',
        DoorPlotNo: table17Item.DOORNO || '',
        BuildingLandName: table17Item.BUILDINGNAME||'',
        Street: table17Item.STREET ||'',
        NearestLandmark: table17Item.LANDMARK ||'',
        Pincode: table17Item.PINCODE ||'',
        AreaLocality: table17Item.AREAORLOCALITY ||'',
      });
      setLoading(false);
    } catch (error) {
      console.error('There was an error!', error);
      return <ErrorPage errorMessage={error} />;
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
  const [previewUrl, setPreviewUrl] = useState('');
  const handleFileChange = (e) => {
    if (!isEditable) return;
    setSelectedFile(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(file);
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileDelete = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };
  const handleAddressEdit = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  
    if (isEditable === false) {
      setIsEditable(true);
    } else  {
      setIsEditable(false);
    }
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

const  handleSubmit = async (e) => {
 
  e.preventDefault();
  var propertyphoto2 = "";
  debugger
  if(isEditable){
  if(selectedFile)
    {
      propertyphoto2 = await getPropertyphoto(selectedFile);
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
      propertyphoto:propertyphoto2,
      categoryId: 2,
      puidNo: 's23', 
      loginId:"crc"
    };
    try {
     await  axiosInstance.post('BBMPCITZAPI/GET_PROPERTY_CTZ_PROPERTY', data
      )
      setSelectedFile(null);
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
  }else {
    await   toast.warning("No changes to save", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  setLoading(false);
  }



const handleNavigation= () =>{
  navigate('/AreaDimension/select')
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
              variant={isEditable ? "standard" : "filled"}
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
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t("buildingLandName")}
              name="BuildingLandName"
              value={formData.BuildingLandName}
              onChange={handleChange}
              variant={isEditable ? "standard" : "filled"}
              InputProps={{
                readOnly: !isEditable,
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
              variant={isEditable ? "standard" : "filled"}
              InputProps={{
                readOnly: !isEditable,
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
              variant={isEditable ? "standard" : "filled"}
              InputProps={{
                readOnly: !isEditable,
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
              variant={isEditable ? "standard" : "filled"}
              InputProps={{
                readOnly: !isEditable,
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
              variant={isEditable ? "standard" : "filled"}
              InputProps={{
                readOnly: !isEditable,
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
                disabled={!isEditable}
              >
                {t("Uploadfile")}
                <VisuallyHiddenInput type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} />
              </Button>
              
            </Box>
            {previewUrl && (
        <div style={{ marginLeft: '10px', position: 'relative' }}>
          <img
            src={previewUrl}
            alt="No Images Found"
            style={{
              maxWidth: '100%', 
              maxHeight: '200px', 
              width: 'auto', // Allow the width to adjust responsively
              height: 'auto', // Allow the height to adjust responsively
            }}
          />
        </div>
      )}
      
            {selectedFile && (
              <Box display="flex" alignItems="center" mt={2}>
                <Typography variant="body1">{selectedFile.name}</Typography>
                <Button color="error" variant='outlined' onClick={handleFileDelete} sx={{ ml: 2 }}>
                  Delete Image
                </Button>
                <Typography variant="body1" sx={{ ml: 1,color:'#df1414' }}>
              Maximum File Size should not exceed 200 KB
              </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" gap={2}>
          <Button variant="contained" color="primary" onClick={handleAddressEdit}>
            Edit Address
            </Button>
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
            <Button variant="contained" color="primary" onClick={handleNavigation}>
            Next
            </Button>
          </Box>
        </Grid>
      </form>
    </Box>
    </Container>
  );
};

export default BbmpForm;
