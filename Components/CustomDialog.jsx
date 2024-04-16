import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Stack from '@mui/material/Stack';
import 'bootstrap/dist/css/bootstrap.min.css';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import Snackbar from '@mui/material/Snackbar';
import EditIcon from '@mui/icons-material/Edit';

class CustomDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validDescription: true,
      validTitle: true,
      title: '',
      description: '',
      deadline: '',
      priority: 'low',
      showSnackbar: 'false',
      message: '',
    };
  }

  reset = () => {
    this.setState({
      validDescription: true,
      validTitle: true,
      title: '',
      description: '',
      deadline: '',
      priority: 'low',
      showSnackbar: 'false',
      message: '',
    });
    this.props.setShowDialog(false);
    this.props.setIsAdd(false);
  };

  handleCancel = () => {
    this.reset();
  };

  handleAdd = () => {
    const { title, description, deadline, priority } = this.state;
    this.setState({
      validTitle: Boolean(title) && this.uniqueTitle(title),
      validDescription: Boolean(description),
    });
    this.setState({
      validTitle: Boolean(title) && this.uniqueTitle(title),
      validDescription: Boolean(description),
    });
    if (
      Boolean(title) &&
      this.uniqueTitle(title) &&
      Boolean(description) &&
      Boolean(deadline)
    ) {
      const rowData = {
        title,
        description,
        deadline,
        priority,
        isComplete: false,
      };
      this.props.setTodos([...this.props.todos, rowData]);
      this.reset();
      this.showSnackbarAdded();
    }
  };

  showSnackbarAdded = () => {
    this.props.setMessage('Task Added Successfully');
    this.props.setColor('green');
    this.props.setShowSnackbar(true);
  };

  uniqueTitle = (title) => {
    return this.props.todos.filter((todo) => todo.title === title).length === 0;
  };

  handleEdit = () => {
    const { description, priority, deadline } = this.state;
    const { targetTitle, todos } = this.props;
    if (Boolean(description) && Boolean(deadline)) {
      const updatedTodos = todos.map((todo) => {
        if (todo.title === targetTitle) {
          return {
            ...todo,
            description: description,
            priority: priority,
            deadline: deadline,
          };
        }
        return todo;
      });
      this.showSnackbarUpdated();
      this.props.setTodos([...updatedTodos]);
      this.reset();
    }
  };

  showSnackbarUpdated = () => {
    this.props.setMessage('Task Updated Successfully');
    this.props.setColor('green');
    this.props.setShowSnackbar(true);
  };

  handleRadioChange = (e) => {
    this.setState({ priority: e.target.value });
  };

  render() {
    const { showDialog, setShowDialog } = this.props;
    const { title, description, priority } = this.state;
    const isValidDate = (date) => {
      return dayjs(date).isValid();
    };

    return (
      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle className="bg-primary text-white">
          <AddCircleIcon />
          Add Task
        </DialogTitle>
        <DialogContent>
          <Stack>
            {this.props.isAdd && (
              <TextField
                fullWidth
                label="Title"
                name="title"
                error={!this.state.validTitle}
                helperText={
                  this.state.validTitle ? '' : 'Please enter a valid title'
                }
                sx={{ marginBottom: -1 }}
                value={title}
                onChange={(e) => this.setState({ title: e.target.value })}
                margin="normal"
              />
            )}
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={description}
              error={!this.state.validDescription}
              helperText={
                this.state.validDescription
                  ? ''
                  : 'Please enter a valid description'
              }
              onChange={(e) => this.setState({ description: e.target.value })}
              margin="normal"
            />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                classname="form-control"
                label="Deadline"
                required={true}
                renderInput={(params) => <TextField {...params} />}
                onChange={(date) =>
                  this.setState({ deadline: date.toString() })
                }
              />
            </LocalizationProvider>
          </Stack>
          <RadioGroup
            row
            aria-label="priority"
            name="priority"
            defaultValue="low"
            onChange={this.handleRadioChange}
          >
            <FormControlLabel value="low" control={<Radio />} label="Low" />
            <FormControlLabel value="medium" control={<Radio />} label="Med" />
            <FormControlLabel value="high" control={<Radio />} label="High" />
          </RadioGroup>
          <DialogActions>
            <Stack direction="row" spacing={2}>
              {this.props.isAdd ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleAdd}
                >
                  <AddCircleIcon />
                  Add
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleEdit}
                >
                  <EditIcon />
                  Edit
                </Button>
              )}
              <Button
                variant="contained"
                color="error"
                onClick={this.handleCancel}
              >
                <DoDisturbIcon />
                Cancel
              </Button>
            </Stack>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }
}

export default CustomDialog;
