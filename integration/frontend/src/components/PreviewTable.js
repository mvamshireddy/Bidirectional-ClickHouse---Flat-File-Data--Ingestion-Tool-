import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Container,
} from '@mui/material';

function PreviewTable({ data = [] }) {
  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>Data Preview</Typography>
      <Table>
        <TableHead>
          <TableRow>
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => <TableCell key={key}>{key}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {Object.values(row).map((value, i) => (
                <TableCell key={i}>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default PreviewTable