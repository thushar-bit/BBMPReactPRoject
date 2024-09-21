import React, { useState, useEffect } from 'react';
import {
  Button, Box, Container, Typography, CircularProgress,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  
} from '@mui/material';


import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../components/Axios';
import ErrorPage from './ErrorPage';
import '../components/Shake.css';

const BBDDraftGenerated = () => {
  

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);

 
  const { t } = useTranslation();
  const fetchData = async () => {
    try {
      setLoading(true)
    var response = await axiosInstance.get("BBMPCITZAPI/GET_PROPERTY_BBD_Draft_Generated_Wards")
    const uniqueData = response.data.Table.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.AROID === value.AROID )
      );
    setData(uniqueData || [])
    setLoading(false)
    }
    catch(error){
      return <ErrorPage errorMessage={error} />;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNavigation = async (row) => {
    //  navigate('/AddressDetails')
debugger

try {
      sessionStorage.setItem('DraftZoneId', JSON.stringify(row.ZONEID));
      sessionStorage.setItem('DraftWardId', JSON.stringify(row.WARDID));
        navigate('/BBDDraft')
      } catch (error) {

        navigate('/ErrorPage', { state: { errorMessage: error.message, errorLocation: window.location.pathname } });
      }
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
      
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            fontFamily: "sans-serif",
            marginBottom: 3,
            color: '#1565c0',
            fontSize: {
              xs: '1.5rem',
              sm: '2rem',
              md: '2.5rem',
            }
          }}
        >
         eKhata Roll-Out Status and Information
        </Typography>
        
        <TableContainer component={Paper} sx={{ mt: 4, maxHeight: 900  }}>
  <Table stickyHeader aria-label="sticky table">
    <TableHead>
      <TableRow>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>ZONE</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>ARO or Subdivision</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Ward Name and Number Where Draft eKhata rolled out</TableCell>
        <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>Status of Draft eKhata rolled out in ward</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {Data.length === 0 ? (
        <TableRow>
          <TableCell colSpan={12} align="center">
            {t("Nodataavailable")}
          </TableCell>
        </TableRow>
      ) : (
        Data
       
        .map((row, index, arr) => {
          const showZoneName = index === 0 || row.ZONEID !== arr[index - 1].ZONEID;
          

          return (
            <TableRow key={index}>
             
              <TableCell>{showZoneName ? row.ZONENAME : ""}</TableCell>
             
              <TableCell>{ row.ARONAME}</TableCell>
              <TableCell>
                {row.WARDNAME ? (
                  <Button color="primary" onClick={() => handleNavigation(row)}>
                    {row.WARDNAME}
                  </Button>
                ) : ""}
              </TableCell>
              <TableCell>{row.STATUS}</TableCell>
            </TableRow>
          );
        })
      )}
    </TableBody>
  </Table>
</TableContainer>
        
      </Box>
    </Container>
  );
};

export default BBDDraftGenerated;
