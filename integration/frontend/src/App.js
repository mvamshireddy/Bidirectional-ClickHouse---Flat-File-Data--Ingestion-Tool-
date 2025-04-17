import React from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import ConnectionForm from './components/ConnectionForm';
import ColumnSelector from './components/ColumnSelector';
import StatusDisplay from './components/StatusDisplay';
import PreviewTable from './components/PreviewTable';

function App() {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        {/* Header Section */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" component="h1" color="primary" gutterBottom>
            Data Ingestion Tool
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Streamline your data ingestion process with ease
          </Typography>
        </Box>

        {/* Main Sections */}
        <Box mb={4}>
          <ConnectionForm />
        </Box>
        <Box mb={4}>
          <ColumnSelector />
        </Box>
        <Box mb={4}>
          <StatusDisplay />
        </Box>
        <Box>
          <PreviewTable />
        </Box>
      </Paper>
    </Container>
  );
}

export default App;