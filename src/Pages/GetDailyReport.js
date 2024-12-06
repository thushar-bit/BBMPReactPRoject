import React, { useState, useEffect ,useCallback} from 'react';
import {
  Button,  Box, Container, Typography,
 Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
 
} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../components/Axios';


const GetDailyReport = () => {
    const [propertyData, setPropertyData] = useState([]);
    const fetchData = async () => {
        debugger
        try {
           
            let response = await axiosInstance.get("Report/GetEAASTHIDailyReport")
        setPropertyData(response.data.Table || [])
        }
catch(error){
   
console.log(error)
}
    }
  
    const cellStyle = {
        fontWeight: 'bold',
        backgroundColor: "#5ba6d0",
        textAlign: 'center',
        padding: '8px',
        fontSize: "1em",
        borderBottom: '2px solid #ddd',
      };
      
      const subCellStyle = {
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: "#5ba6d0",
        padding: '6px',
        borderBottom: '1px solid #ddd',
      };
      const bodyCellStyle = {
        padding: '8px',
        textAlign: 'center',
        borderRight: '1px solid #ddd',
        borderBottom: '1px solid #ddd',
      };      
      

    useEffect( () => {
        fetchData();
      }, []);
    return (
        <Container maxWidth="xl">
       <Box sx={{ backgroundColor: '#f0f0f0', padding: 1, borderRadius: 2, mt: 1 }}>
       <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            fontFamily: "sans-serif",
          
            color: '#1565c0',
            fontSize: {
              xs: '1.5rem',
              sm: '2rem',
              md: '2.5rem',
            }
          }}
        >
        
          Daily Report
        </Typography>
        <TableContainer component={Paper} sx={{ mt: 4, border: '1px solid #ddd' }}>
  <Table sx={{ borderCollapse: 'collapse' }}>
    <TableHead>
      {/* Main Headers */}
      <TableRow>
        <TableCell
          rowSpan={2}
          style={{ ...cellStyle, borderRight: '4px solid #ddd' }}
        >
          Zone
        </TableCell>
        <TableCell
          rowSpan={2}
          style={{ ...cellStyle, borderRight: '4px solid #ddd' }}
        >
          ARO
        </TableCell>
        <TableCell
          colSpan={2}
          style={{ ...cellStyle, borderRight: '4px solid #ddd' }}
        >
          e-Khatha Applications Received
        </TableCell>
        <TableCell
          colSpan={2}
          style={{ ...cellStyle, borderRight: '4px solid #ddd' }}
        >
          Active No of
        </TableCell>
        <TableCell
          colSpan={3}
          style={{ ...cellStyle, borderRight: '4px solid #ddd' }}
        >
          e-Khatha Approved
        </TableCell>
        <TableCell
          colSpan={2}
          style={{ ...cellStyle, borderRight: '4px solid #ddd' }}
        >
          Disposal in 24-hour
        </TableCell>
        <TableCell colSpan={2} style={cellStyle}>
          Pending with
        </TableCell>
      </TableRow>
      {/* Subheaders */}
      <TableRow>
        <TableCell style={subCellStyle}>Total</TableCell>
        <TableCell style={{ ...subCellStyle, borderRight: '4px solid #ddd' }}>
          In 24 Hours
        </TableCell>
        <TableCell style={subCellStyle}>CW Login</TableCell>
        <TableCell style={{ ...subCellStyle, borderRight: '4px solid #ddd' }}>
          ARO Login
        </TableCell>
        <TableCell style={subCellStyle}>By ARO</TableCell>
        <TableCell style={subCellStyle}>Automate</TableCell>
        <TableCell style={{ ...subCellStyle, borderRight: '4px solid #ddd' }}>
          Total
        </TableCell>
        <TableCell style={subCellStyle}>Case Worker</TableCell>
        <TableCell style={{ ...subCellStyle, borderRight: '4px solid #ddd' }}>
          ARO
        </TableCell>
        <TableCell style={subCellStyle}>Case Worker</TableCell>
        <TableCell style={subCellStyle}>ARO</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {propertyData.length === 0 ? (
        <TableRow>
          <TableCell colSpan={13} align="center" style={{ padding: '16px' }}>
            No Data Available
          </TableCell>
        </TableRow>
      ) : (
        propertyData.map((row, index) => (
          <TableRow key={index}>
            <TableCell style={bodyCellStyle}>
            {row.ZONENAME}
            </TableCell>
            <TableCell style={bodyCellStyle}>
            {row.WARDNUMBER} - {row.WARDNAME}
            </TableCell>
            <TableCell style={bodyCellStyle}>
              {row.APPLICATIONS_RECEIVED}
            </TableCell>
            <TableCell style={bodyCellStyle}>
              {row.APPLICATIONS_RECEIVED}
            </TableCell>
            <TableCell style={bodyCellStyle}>
              {row.NO_OF_APPLICATIONS_TODAY_SUBMITTED}
            </TableCell>
            <TableCell style={bodyCellStyle}>
              {row.NO_OF_APPLICATIONS_FORWARDED_TO_CW_TODAY}
            </TableCell>
            <TableCell style={bodyCellStyle}>
              {row.APPROVED_ARO}
            </TableCell>
            <TableCell style={bodyCellStyle}>
              {row.AUTO_APPROVED}
            </TableCell>
            <TableCell style={bodyCellStyle}>
              {row.TODAY_AUTO_APPROVED}
            </TableCell>
            <TableCell style={bodyCellStyle}>
              {row.TODAY_AUTO_APPROVED}
            </TableCell>
            <TableCell style={bodyCellStyle}>
              {row.TODAY_AUTO_APPROVED}
            </TableCell>
            <TableCell style={bodyCellStyle}>
              {row.PENDING_IN_CW}
            </TableCell>
            <TableCell style={bodyCellStyle}>
              {row.PENDING_IN_ARO}
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  </Table>
</TableContainer>
            </Box>
  </Container>
   );
};
export default GetDailyReport;