import React, { useState, useEffect ,useCallback} from 'react';
import {
  Button,  Box, Container, Typography,
 Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,TablePagination,
 CircularProgress
} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../components/Axios';
import {  useNavigate ,useLocation} from 'react-router-dom';

const PendingMutationReport = () => {
    const [propertyData, setPropertyData] = useState([]);
    const [loading,setLoading] = useState(false);
      const location = useLocation();
        const [LoginData,setLoginData] = useState("")
     const [page, setPage] = useState(0);
    const [formattedDate,setFormattedDate] = useState("");
     const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totals1,settotals] = useState([]);
    const navigate = useNavigate();
    const fetchDailyDetails = (row) => {
      debugger
      //sessionStorage.setItem("SETPROPERTYMUTATIONEPID",row.PROPERTYEPID)
      sessionStorage.setItem("SETPROPERTYMUTATIONEPID", JSON.stringify("123123"))
      if(LoginData !== null && LoginData !== undefined){
        alert("Please Log-In To File Mutation Objections. Click On The File Mutation Objection Link After Logging In.")
        navigate("/MutationObjection")
      }else {
        window.location.href = "https://bbmpeaasthi.karnataka.gov.in/CitzLogin.aspx";
      }
    

    }
    const fetchData = async () => {
        debugger
        try {
          setLoading(true)
          const params = new URLSearchParams(location.search);
      const LoginData = params.get('LoginData');
      if (LoginData !== null && LoginData !== undefined) {
        let response4 = await axiosInstance.get("Auth/DecryptJson?encryptedXML="+LoginData)
        sessionStorage.setItem('SETLOGINID', JSON.stringify(response4.data.UserId));
        sessionStorage.setItem("LoginData", JSON.stringify(response4.data)); 
      }
            let response = await axiosInstance.get("MutationObjectionAPI/Get_Pending_Mutation_Details?TypeOfSearch=12&PageNo=23&PageCount=32")
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
        padding: '15px',
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
          Property EPID 
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
            {row.AUTO_APPROVED}
            </TableCell>
            <TableCell style={bodyCellStyle}>
            {row.AUTO_APPROVED} 
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
            {row.AUTO_APPROVED} 
            </TableCell>
            <TableCell style={bodyCellStyle}>
            {row.AUTO_APPROVED}
            </TableCell>
            <TableCell style={bodyCellStyle}>
            <Button color="primary" style={{ width: '2rem',height:"0.5rem" }} onClick={() =>fetchDailyDetails(row.ZONENUMBER)}>Click Here</Button> 
            </TableCell>
           
          </TableRow>
          
        ))
      )}
      
    </TableBody>
    
  </Table>
</TableContainer>
            </Box>
            <TablePagination
  rowsPerPageOptions={[10, 25, 50, 100]}
  component="div"
  count={propertyData.length > 0 ? propertyData[0].TOTAL_COUNT : 10} 
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={ async (event, newPage) => {
    setPage(newPage);
  await  fetchData(newPage + 1, rowsPerPage); 
  }}
  onRowsPerPageChange={ async(event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
   await  fetchData(1, parseInt(event.target.value, 10)); 
  }}
  labelRowsPerPage="Properties per Page:"
  labelDisplayedRows={({ from, to, count }) => 
    `Properties: ${from}–${to} of ${count !== -1 ? count : `more than ${to}`} `
  }
/>
  </Container>
   );
};
export default PendingMutationReport;