import React from 'react';
import { TableRow, TableCell, FormControl } from '@mui/material';
import dayjs from 'dayjs';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

class TableElements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedRows: {},
    };
  }

  handleCheckbox = (index) => {
    this.setState((prevState) => {
      const checkedRows = { ...prevState.checkedRows };
      checkedRows[index] = !checkedRows[index];
      return { checkedRows };
    });
  };

  showSnackbarDelete = () => {
    this.props.setMessage('Task Deleted Successfully');
    this.props.setColor('red');
    this.props.setShowSnackbar(true);
  };

  handleDelete = (index) => {
    const updatedTodos = this.props.todos.filter((todo, i) => i !== index);
    this.props.setTodos(updatedTodos);
    this.showSnackbarDelete();
  };

  handleEdit = (title) => {
    this.props.setTargetTitle(title);
    this.props.setShowDialog(true);
  };

  render() {
    const { todos } = this.props;
    const { checkedRows } = this.state;
    return (
      <tbody>
        {todos.map((todo, index) => {
          const isRowChecked = checkedRows[index];
          return (
            <TableRow key={index}>
              <TableCell>{todo.title}</TableCell>
              <TableCell>{todo.description}</TableCell>
              <TableCell>{dayjs(todo.deadline).format('MM/DD/YYYY')}</TableCell>
              <TableCell>{todo.priority}</TableCell>
              <TableCell>
                <input
                  onChange={() => this.handleCheckbox(index)}
                  type="checkbox"
                  checked={checkedRows[index] || false}
                />
              </TableCell>
              <TableCell>
                <FormControl>
                  {!isRowChecked && (
                    <button
                      className="btn btn-primary"
                      onClick={() => this.handleEdit(todo.title)}
                    >
                      <EditNoteIcon />
                      Update
                    </button>
                  )}
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleDelete(index)}
                  >
                    <DoDisturbIcon />
                    Delete
                  </button>
                </FormControl>
              </TableCell>
            </TableRow>
          );
        })}
      </tbody>
    );
  }
}

export default TableElements;
