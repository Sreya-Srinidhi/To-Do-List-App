import React from 'react';
import { TableHead, TableRow, TableCell } from '@mui/material';

class TableHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Deadline</TableCell>
          <TableCell>Priority</TableCell>
          <TableCell>Is Complete</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
    );
  }
}

export default TableHeader;
