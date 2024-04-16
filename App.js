import React, { useState } from 'react';
import './style.css';
import Card from '@mui/material/Card';
import Title from './Components/Title.jsx';
import CustomDialog from './Components/CustomDialog.jsx';
import TableHeader from './Components/TableHeader.jsx';
import { Table } from '@mui/material';
import TableElements from './Components/TableElements.jsx';
import Snackbar from '@mui/material/Snackbar';

export default function App() {
  const [showDialog, setShowDialog] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [todos, setTodos] = useState([]);
  const [targetTitle, setTargetTitle] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('');
  const [vertical, setVertical] = useState('bottom');
  const [horizontal, setHorizontal] = useState('right');

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackbar(false);
  };

  return (
    <Card>
      <Title setShowDialog={setShowDialog} setIsAdd={setIsAdd} />
      <CustomDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        isAdd={isAdd}
        setIsAdd={setIsAdd}
        todos={todos}
        setTodos={setTodos}
        targetTitle={targetTitle}
        setShowSnackbar={setShowSnackbar} // Update here
        setMessage={setMessage}
        setColor={setColor}
      />
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={message}
        key={vertical + horizontal}
      />
      <Table>
        <TableHeader />
        <TableElements
          setTargetTitle={setTargetTitle}
          setShowDialog={setShowDialog}
          todos={todos}
          setTodos={setTodos}
          targetTitle={targetTitle}
          setShowSnackbar={setShowSnackbar} // Update here
          setMessage={setMessage}
          setColor={setColor}
        />
      </Table>
    </Card>
  );
}
