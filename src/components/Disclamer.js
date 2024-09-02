import React, {  useRef,useState } from 'react';
import { Dialog, DialogContent, DialogActions, Button, Typography,Box } from '@mui/material';
import Switch from '@mui/material/Switch';
import { useTranslation } from 'react-i18next';
const DisclaimerDialog = ({ open, onClose, onAgree }) => {
    const contentRef = useRef(null);
    const { t } = useTranslation();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [disabled,setDisabled] = useState(false)
    const handleAgree = () => {
      if(disabled){
      setConfirmOpen(true);
      }else {
        alert("Please Agree that you Understand");
      }
  };
  const handleSwtich = () => {
    if(disabled){
      setDisabled(false)
    }else {
      setDisabled(true)
    }
  }
  const handleConfirmYes = () => {
    // Navigation function or any action you want to perform
    // Example: navigate('/some-path');
    setDisabled(false)
    setConfirmOpen(false);
    onClose(); // Close the DisclaimerDialog
};

const handleConfirmNo = () => {
    setConfirmOpen(false);
    onClose(); // Close the DisclaimerDialog
};
 

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <Dialog open={confirmOpen} onClose={handleConfirmNo} maxWidth="md" fullWidth>
    <DialogContent>
        <Typography variant="h5">{t("disclamerMessage1")}</Typography>
    </DialogContent>
    <DialogActions>
        <Button onClick={handleConfirmYes} color="primary">{t("Yes")}</Button>
        <Button onClick={handleConfirmNo} color="secondary">{t("No")}</Button>
    </DialogActions>
</Dialog>
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
        <Switch defaultChecked={disabled} color="warning" onClick={handleSwtich} />
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
        <Button onClick={handleAgree} disabled={!disabled} color="primary" style={{ float: 'right' }}>
           {t("disclamerMessage9")}
        </Button>
      </Box>
    
        
      </DialogActions>
    </Dialog>
    
  );
};
export default DisclaimerDialog;