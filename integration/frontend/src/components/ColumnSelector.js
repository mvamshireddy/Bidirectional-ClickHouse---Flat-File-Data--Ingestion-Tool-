import React, { useState } from 'react';
import api from '../api';

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
    <div>
      <h2>Select Columns</h2>
      <button onClick={loadColumns}>Load Columns</button>
      {Object.keys(columns).map((table) => (
        <div key={table}>
          <h3>{table}</h3>
          {columns[table].map((column) => (
            <label key={column}>
              <input
                type="checkbox"
                value={column}
                onChange={() => handleCheckboxChange(column)}
              />
              {column}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ColumnSelector;