import React, { useState } from 'react';
import api from '../api';

function ConnectionForm() {
  const [formData, setFormData] = useState({
    host: '',
    port: '',
    database: '',
    user: '',
    jwt_token: '', // Keep this field but make it optional
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Remove jwt_token from the payload if it's empty
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
    <form onSubmit={handleSubmit}>
      <h2>Connect to ClickHouse</h2>
      <input type="text" name="host" placeholder="Host" onChange={handleChange} required />
      <input type="text" name="port" placeholder="Port" onChange={handleChange} required />
      <input type="text" name="database" placeholder="Database" onChange={handleChange} required />
      <input type="text" name="user" placeholder="User" onChange={handleChange} required />
      {/* Remove the "required" attribute from the JWT Token field */}
      <input type="password" name="jwt_token" placeholder="JWT Token (Optional)" onChange={handleChange} />
      <button type="submit">Connect</button>
    </form>
  );
}

export default ConnectionForm;