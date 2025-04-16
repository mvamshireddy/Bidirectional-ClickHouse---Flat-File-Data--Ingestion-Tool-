import React from 'react';
import ConnectionForm from './components/ConnectionForm';
import ColumnSelector from './components/ColumnSelector';
import StatusDisplay from './components/StatusDisplay';
import PreviewTable from './components/PreviewTable';

function App() {
  return (
    <div className="App">
      <h1>Data Ingestion Tool</h1>
      <ConnectionForm />
      <ColumnSelector />
      <StatusDisplay />
      <PreviewTable />
    </div>
  );
}

export default App;