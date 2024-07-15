import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const DisclaimerDialog = ({ open, onClose, onAgree }) => {
    const contentRef = useRef(null);
   

 

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
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
          onClick={onAgree}
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