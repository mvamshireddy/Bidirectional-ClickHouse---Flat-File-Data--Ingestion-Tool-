import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';

function StatusDisplay() {
  const [status, setStatus] = useState('');

  const updateStatus = (newStatus) => {
    setStatus(newStatus);
  };

  return (
    <Box padding={2} border={1} borderColor="grey.300" borderRadius={2}>
      <Typography variant="h5">Status</Typography>
      <Typography variant="body1">{status || 'No status available'}</Typography>
    </Box>
  );
}

export default StatusDisplay;