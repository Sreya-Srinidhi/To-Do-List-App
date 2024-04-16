import React from 'react';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';

class Title extends React.Component {
  constructor(props) {
    super(props);
  }

  handleAdd = () => {
    this.props.setShowDialog(true);
    this.props.setIsAdd(true);
  };

  render() {
    return (
      <CardHeader
        title={
          <div style={{ textAlign: 'center' }}>
            <MenuIcon />
            FRAMEWORKS
          </div>
        }
        action={
            <Button variant="contained" onClick={this.handleAdd}>
              <AddCircleIcon />
              Add
            </Button>
        }
        className="bg-primary text-white"
      />
    );
  }
}

export default Title;
