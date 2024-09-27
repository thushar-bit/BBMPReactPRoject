import React, { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import Switch from '@mui/material/Switch';
import { useTranslation } from 'react-i18next';
import axiosInstance from '../components/Axios';

const DisclaimerDialog = ({ open, onClose, onAgree }) => {
  const contentRef = useRef(null);
  const { t } = useTranslation();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false); 
  const [pdfUrl, setPdfUrl] = useState('');

  const handleAgree = () => {
    if (isAgreed) {
      setConfirmOpen(true);
    } else {
      alert("Please Agree that you Understand");
    }
  };

  const handleSwitchChange = () => {
    setIsAgreed(!isAgreed); 
  };

  const fetchPdf = async () => {
    try {
      const response = await axiosInstance.get(
        `Report/GetFinalBBMPReport?propertycode=${JSON.parse(sessionStorage.getItem('SETPROPERTYCODE'))}&BOOKS_PROP_APPNO=${JSON.parse(sessionStorage.getItem('P_BOOKS_PROP_APPNO'))}`,
        {
          responseType: 'blob', 
        }
      );

      
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      setPdfUrl(pdfUrl); 
    } catch (error) {
      console.error("Error fetching PDF: ", error);
    }
  };
const onEsign = () => {

}
  const handleConfirmYes = () => {
   
    fetchPdf();
    setIsAgreed(false);
    setConfirmOpen(false);
    onClose(); 
  };

  const handleConfirmNo = () => {
    setConfirmOpen(false);
    onClose(); 
  };

  return (
    <>
     
      <Dialog open={confirmOpen} onClose={handleConfirmNo} maxWidth="md" fullWidth>
        <DialogContent>
          <Typography variant="h5">{t("disclamerMessage1")}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmYes} color="primary">{t("Yes")}</Button>
          <Button onClick={handleConfirmNo} color="secondary">{t("No")}</Button>
        </DialogActions>
      </Dialog>

   
      <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
        <DialogContent dividers style={{ maxHeight: '500px' }} ref={contentRef}>
          <Typography variant="h3" gutterBottom>
            {t("disclamer")}
          </Typography>
          <Typography variant="h5">
            <ol>
              <li>{t("disclamerMessage2")}</li>
              <li>{t("disclamerMessage3")}</li>
              <li>{t("disclamerMessage4")}</li>
              <li>{t("disclamerMessage5")}</li>
              <li>{t("disclamerMessage6")}</li>
              <li>{t("disclamerMessage7")}</li>
            </ol>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Switch checked={isAgreed} color="warning" onChange={handleSwitchChange} />
            <Typography variant="h5" sx={{ marginLeft: 1 }}>
              {t("disclamerMessage8")}
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Button onClick={handleConfirmNo} color="primary" style={{ float: 'left' }}>
              {t("disclamerMessage10")}
            </Button>
            <Button onClick={handleAgree} disabled={!isAgreed} color="primary" style={{ float: 'right' }}>
              {t("disclamerMessage9")}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      {/* PDF Viewer */}
      {pdfUrl && (
        <Dialog open={Boolean(pdfUrl)} onClose={() => setPdfUrl('')} maxWidth="md" fullWidth>
          <DialogContent>
            <iframe src={pdfUrl} width="100%" height="600px" title="PDF Viewer"></iframe>
          </DialogContent>
        
          <DialogActions>
          <Button onClick={() => onEsign} color="primary">
              E-Sign
            </Button>
            <Button onClick={() => setPdfUrl('')} color="primary">
              Close PDF
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default DisclaimerDialog;
