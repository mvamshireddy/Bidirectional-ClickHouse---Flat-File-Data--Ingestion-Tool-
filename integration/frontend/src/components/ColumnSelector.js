import React, { useState } from 'react';
import api from '../api';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Container,
  Grid,
} from '@mui/material';

function ColumnSelector() {
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [columns, setColumns] = useState([]);

  const loadColumns = async () => {
    try {
      const response = await api.post('/load-columns/clickhouse');
      setColumns(response.data.columns);
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to load columns');
    }
  };

  const handleCheckboxChange = (column) => {
    setSelectedColumns((prev) =>
      prev.includes(column) ? prev.filter((col) => col !== column) : [...prev, column]
    );
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>Select Columns</Typography>
      <Button variant="contained" color="primary" onClick={loadColumns}>
        Load Columns
      </Button>
      <Grid container spacing={2} style={{ marginTop: '16px' }}>
        {Object.keys(columns).map((table) => (
          <Grid item xs={12} key={table}>
            <Typography variant="h6">{table}</Typography>
            {columns[table].map((column) => (
              <FormControlLabel
                key={column}
                control={
                  <Checkbox
                    checked={selectedColumns.includes(column)}
                    onChange={() => handleCheckboxChange(column)}
                  />
                }
                label={column}
              />
            ))}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ColumnSelector;