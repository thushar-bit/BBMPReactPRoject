import React, { useState } from 'react';
import {
   Button, Box, Container, Typography, //Tooltip, IconButton,
  //FormControl, MenuItem, Select, InputLabel, Radio, RadioGroup, FormControlLabel,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
//import InfoIcon from '@mui/icons-material/Info';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../components/Axios';

const OwnerDetails = () => {
  const [formData, setFormData] = useState({
   
      BlockName: '',
      FlatNo: '',
      floornumber: '',
      features: '',
      Typeofuse: '',
      yearOfConstruction: '',
      Totalnumberofparkingunits: '',
      TotalParkingArea: '',
      Occupancy: '',
      BesomCustomerID: '',
      SelectOwnerShareType: '',
      OwnersSharePercent: '',
      ParkingFacility: '',
   
    
  });

  const [tableData, setTableData] = useState([
  ]);

  const navigate = useNavigate();
  // const [isEditable, setIsEditable] = useState(false);
  const [tablesdata9,setTablesData9] = useState([]);
  // const [tablesdata3,setTablesData3] = useState([]);
  // const [tablesdata4,setTablesData4] = useState([]);
  // const [tablesdata6,setTablesData6] = useState([]);

  const { t } = useTranslation();

  
  const handleChange = async (e) => {
    const { name, value } = e.target;
   
    setFormData({
      ...formData,
      [name]: value
    });
    
  };
  
  const fetchData = async () => {
    const response1 = await axiosInstance.get('BBMPCITZAPI/GetMasterTablesData?UlbCode=555');
    const response2 = JSON.parse(sessionStorage.getItem('BBD_DRAFT_API'));
    const response3 = JSON.parse(sessionStorage.getItem('NCL_TEMP_API'));
        const {  Table15,Table16 ,Table17  } = response1.data;
        const {  Table5   } = response2.data;
        const {Table9:NCLTABLE9} = response3.data;
        const table1Item = Table5.length > 0 ? Table5 : [];
        const table9Item = NCLTABLE9.length > 0 ? NCLTABLE9 : [];
        const table16Item = Table16.length > 0 ? Table16 : [];
        const table15Item = Table15.length > 0 ? Table15 : [];
        const table17Item = Table17.length > 0 ? Table17 : [];

        setTableData(table1Item);
        setTablesData9(table9Item);
        // setTablesData4(table15Item);
        // setTablesData6(table17Item);
        // setFormData({
        //   BlockName: table13Item.BLOCKNUMBER,
        //   FlatNo: table13Item.FLATNO,
        //   floornumber: table13Item.FLOORNUMBERID,
        //   features: table13Item.FEATUREHEADID,
        //   Typeofuse: table13Item.FEATUREID,
        //   yearOfConstruction: table13Item.BUILTYEAR,
        //   Totalnumberofparkingunits: table13Item.PARKINGUNITS,
        //   TotalParkingArea: table13Item.PARKINGAREA,
        //   Occupancy: table13Item.BUILDINGUSAGETYPEID,
        //   BesomCustomerID: table13Item.RRNO,
        //   SelectOwnerShareType: table13Item.BUILDINGUSAGETYPEID,
        //   OwnersSharePercent: table13Item.PLOTAREAOWNERSHARE_AREA,
        //   ParkingFacility: table13Item.PARKINGAVAILABLE,
        // });
  }
  React.useEffect(() => {
    
    fetchData();
        
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data logic here
  };

  const back = () => {
    navigate('/AreaDimension/flats');
  };
  const VerfiyEKYC = () => {
    navigate('/AreaDimension/flats');
  };
  const handleNavigation = () => {
   
      navigate('/PropertyRights');
  
  };

  console.log(formData.propertyType);

  return (
    <Container maxWidth="xl">
      <Box sx={{ backgroundColor: '#f0f0f0', padding: 4, borderRadius: 2, mt: 8 }}>
        <form onSubmit={handleSubmit}>
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
            Owner Details
          </Typography>
          
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Existing Owners As Per Digitization
              </Typography>
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
               
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>Owner No.</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>Owner Name</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>Father/ Mother/ Husband/ Spouse Name</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>Address</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>Name of the Company</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>Does a Company own this property?</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>RE-ADD Deleted Owner</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>Verify E-KYC</TableCell>
                
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
            <TableCell>{row.OWNERNUMBER}</TableCell>
            <TableCell>{row.OWNERNAME}</TableCell>
            <TableCell>{row.IDENTIFIERNAME}</TableCell>
            <TableCell>{row.OWNERADDRESS}</TableCell>
            <TableCell>{row.COMPANYNAME}</TableCell>
            <TableCell>{row.ISCOMPANY}</TableCell>
            <TableCell> <Button variant="contained" color="primary" onClick={back}>
              Re-Add Deleted Owner
            </Button></TableCell>
            <TableCell> <Button variant="contained" color="primary" onClick={VerfiyEKYC}>
              Verfiy EKYC
            </Button></TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  </Table>
</TableContainer>
<TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
               
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>Owner No.</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>Owner Name</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold' ,color:'#FFFFFF'}}>Father/ Mother/ Husband/ Spouse Name</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>Address</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>Name of the Company</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>Does a Company own this property?</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>ID Document Number</TableCell>
                  {/* <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>Owner Photograph</TableCell> */}
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>Mobile Verification</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>E-KYC</TableCell>
                  <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold',color:'#FFFFFF' }}>NAME MATCH STATUS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {tablesdata9.length === 0 ? (
        <TableRow>
          <TableCell colSpan={12} align="center">
            No data available
          </TableCell>
        </TableRow>
      ) : (
        tablesdata9.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.OWNERNUMBER}</TableCell>
            <TableCell>{row.OWNERNAME}</TableCell>
            <TableCell>{row.IDENTIFIERNAME} {row.IDENTIFIERTYPE}</TableCell>
            <TableCell>{row.OWNERADDRESS} {row.MOBILENUMBER}</TableCell>
            <TableCell>{row.COMPANYNAME}</TableCell>
            <TableCell>{row.ISCOMPANY}</TableCell>
            <TableCell>{row.IDENTITYTYPEDESCRIPTION} {row.OWNERIDENTITYSLNO}</TableCell>
            {/* <TableCell>{row.ISCOMPANY}</TableCell> need image here */}
            <TableCell>{row.MOBILEVERIFY}</TableCell>
            <TableCell>{row.APIRETURNRESPONSE}</TableCell>
            <TableCell>{row.NAMEMATCHSCORE}</TableCell>
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

export default OwnerDetails;
