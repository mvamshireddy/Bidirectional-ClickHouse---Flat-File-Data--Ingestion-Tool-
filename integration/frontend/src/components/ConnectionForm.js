import React, { useState } from 'react';
import api from '../api';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';

function ConnectionForm() {
  const [formData, setFormData] = useState({
    host: '',
    port: '',
    database: '',
    user: '',
    jwt_token: '', // Optional field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (!payload.jwt_token) {
        delete payload.jwt_token;
      }

      const response = await api.post('/connect/clickhouse', payload);
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.error || 'Connection failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>Connect to ClickHouse</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Host"
              name="host"
              fullWidth
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Port"
              name="port"
              fullWidth
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Database"
              name="database"
              fullWidth
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="User"
              name="user"
              fullWidth
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="JWT Token (Optional)"
              name="jwt_token"
              type="password"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Connect
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default ConnectionForm;