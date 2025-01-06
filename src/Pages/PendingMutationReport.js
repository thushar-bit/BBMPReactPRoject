import React, { useState, useEffect ,useCallback} from 'react';
import {
  Button,  Box, Container, Typography,
 Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
 CircularProgress
} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../components/Axios';
import { useNavigate } from 'react-router-dom';

const PendingMutationReport = () => {
    const [propertyData, setPropertyData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [formattedDate,setFormattedDate] = useState("")
    const [totals1,settotals] = useState([]);
    const navigate = useNavigate();
    const fetchDailyDetails = (row,reportType) => {
      debugger
      navigate("/MutationObjection", {
        state: {
            WARDNUMBER: row,
            REPORTTYPE: reportType
        }
    });

    }
    const fetchData = async () => {
        debugger
        try {
          setLoading(true)
            let response = await axiosInstance.get("Report/GetEAASTHIDailyReport")
        setPropertyData(response.data.Table || [])
      
   
        setLoading(false)
        }
catch(error){
  setLoading(false)
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
        
        Pending Mutations
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
          Date of Registered Deed or Mutation Application
        </TableCell>
        <TableCell
          rowSpan={2}
          style={{ ...cellStyle, borderRight: '4px solid #ddd' }}
        >
          Basis of Mutation (Regd Deed/inheritance/Court Order/Bank Order)
        </TableCell>
        <TableCell
         rowSpan={2}
          style={{ ...cellStyle, borderRight: '4px solid #ddd' }}
        >
          Property EPID and view eKhata
        </TableCell>
        <TableCell
          rowSpan={2}
          style={{ ...cellStyle, borderRight: '4px solid #ddd' }}
        >
         Seller / Giving Party Name
        </TableCell>
        <TableCell
         rowSpan={2}
          style={{ ...cellStyle, borderRight: '4px solid #ddd' }}
        >
          Purchased/Receiving Party Name
        </TableCell>
        <TableCell
         rowSpan={2}
          style={{ ...cellStyle, borderRight: '4px solid #ddd' }}
        >
          Date of Issuance of Public Notice
        </TableCell>
        <TableCell colSpan={4} style={{...cellStyle ,borderRight: '4px solid #ddd' }}>
          Pending with whom
        </TableCell>
        <TableCell
         rowSpan={2}
          style={{ ...cellStyle, borderRight: '4px solid #ddd' }}
        >
         File Objection
        </TableCell>
      </TableRow>
      {/* Subheaders */}
      <TableRow>
        
        <TableCell  style={{ ...subCellStyle, borderRight: '4px solid #ddd' }}>Name</TableCell>
        <TableCell  style={{ ...subCellStyle, borderRight: '4px solid #ddd' }}>Designation</TableCell>
        <TableCell style={{ ...subCellStyle, borderRight: '4px solid #ddd' }}>Mobile Number</TableCell>
        <TableCell style={{ ...subCellStyle, borderRight: '4px solid #ddd' }}>In - Date</TableCell>
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
            {row.ZONENAME_EN}
            </TableCell>
            <TableCell style={bodyCellStyle}>
            {row.WARDNUMBER} - {row.WARDNAME_EN}
            </TableCell>
            <TableCell style={bodyCellStyle}>
            <Button color="primary" style={{ width: '2rem',height:"0.1rem" }} onClick={() =>fetchDailyDetails(row.WARDNUMBER,"TOTAL_RECEIVED")}>{row.TOTAL_RECEIVED}</Button>
            </TableCell>
            <TableCell style={bodyCellStyle}>
            <Button color="primary" style={{ width: '2rem',height:"0.1rem" }} onClick={() =>fetchDailyDetails(row.WARDNUMBER,"YEST_RECEIVED")}>{row.YEST_RECEIVED}</Button> 
            </TableCell>
            <TableCell style={bodyCellStyle}>
            {row.ACTIVE_CW}
            </TableCell>
            <TableCell style={bodyCellStyle}>
            {row.ACTIVE_ARO}
            </TableCell>
            <TableCell style={bodyCellStyle}>
            {row.ARO_APPROVED}
            </TableCell>
            <TableCell style={bodyCellStyle}>
            {row.AUTO_APPROVED}
            </TableCell>
            {/* <TableCell style={bodyCellStyle}>
              {row.ARO_APPROVED + row.AUTO_APPROVED}
            </TableCell> */}
            <TableCell style={bodyCellStyle}>
            <Button color="primary" style={{ width: '2rem',height:"0.1rem" }} onClick={() =>fetchDailyDetails(row.WARDNUMBER,"YEST_CW_DISPOSED_COUNT")}>{row.YEST_CW_DISPOSED_COUNT}</Button> 
            </TableCell>
            <TableCell style={bodyCellStyle}>
            <Button color="primary" style={{ width: '2rem',height:"0.1rem" }} onClick={() =>fetchDailyDetails(row.WARDNUMBER,"YEST_RI_DISPOSED_COUNT")}>{row.YEST_RI_DISPOSED_COUNT}</Button> 
            </TableCell>
            <TableCell style={bodyCellStyle}>
            <Button color="primary" style={{ width: '2rem',height:"0.1rem" }} onClick={() =>fetchDailyDetails(row.WARDNUMBER,"YEST_RI_DISPOSED_COUNT")}>{row.YEST_RI_DISPOSED_COUNT}</Button> 
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
export default PendingMutationReport;