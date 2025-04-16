import React, { useState } from 'react';

function StatusDisplay() {
  const [status, setStatus] = useState('');

  const updateStatus = (newStatus) => {
    setStatus(newStatus);
  };

  return (
    <div>
      <h2>Status</h2>
      <p>{status}</p>
    </div>
  );
}

export default StatusDisplay;