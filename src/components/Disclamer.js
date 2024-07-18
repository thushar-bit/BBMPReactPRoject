import React, {  useRef,useState } from 'react';
import { Dialog, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const DisclaimerDialog = ({ open, onClose, onAgree }) => {
    const contentRef = useRef(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const handleAgree = () => {
      setConfirmOpen(true);
  };
  const handleConfirmYes = () => {
    // Navigation function or any action you want to perform
    // Example: navigate('/some-path');
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
        <Typography variant="h5">Do you confirm that the provided details are correct and that you wish to submit the application?</Typography>
    </DialogContent>
    <DialogActions>
        <Button onClick={handleConfirmYes} color="primary">Yes</Button>
        <Button onClick={handleConfirmNo} color="secondary">No</Button>
    </DialogActions>
</Dialog>
      <DialogContent dividers style={{ maxHeight: '500px' }} ref={contentRef}>
        <Typography variant="h3" gutterBottom>
          Disclaimer
        </Typography>
        <Typography variant="h5">
          I understand:
          <ol>
            <li>In case of core wards [south, east + west zones], the existing A-katha properties will be issued A-katha upon submission of UpToDate information of existing owners along with their Aadhaar etc. Registered deed and other supporting documents are optional.</li>
            <li>In case of any additional owner or change in name etc., registered deed or other supporting documents are mandatory.</li>
            <li>In case of MAR 19 properties for old ULBs merged with BBMP, the relevant MAR 19 register scan must be cited for approval of A-katha.</li>
            <li>In case old GP properties either eswathu registration of Form 9 or original Form 9 scan of register of GP is mandatory for A-katha.</li>
            <li>In every other case, registered deed or allotment by govt Authority Agency with conversion of other approvals by KTCP Act 1961 is mandatory for A-katha.</li>
            <li>Properties on Govt lands / rajakaluve / lakes / etc. will not get final ekatha in general.</li>
          </ol>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleAgree}
          color="primary"
        //   disabled={!isScrolledToBottom}
        >
          I Understand
        </Button>
      </DialogActions>
    </Dialog>
    
  );
};
export default DisclaimerDialog;