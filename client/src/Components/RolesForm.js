import React, { useState, useContext } from 'react';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import RoleContext from './Context_Components/RoleContext';

const RoleForm = () => {
  const { setRoles } = useContext(RoleContext);

  const [formData, setFormData] = useState({
    title: '',
    responsibilities: '',
    paid: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/roles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create role');
        }
        return response.json();
      })
      .then((data) => {
        setRoles((prevRoles) => [...prevRoles, data]);

        setFormData({
          title: '',
          responsibilities: '',
          paid: false,
        });

        console.log('Role created successfully:', data);
      })
      .catch((error) => {
        console.error('Error creating role:', error);
      });
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={6}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h5">Create a New Role</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              variant="outlined"
              margin="normal"
              required
              value={formData.title}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Responsibilities"
              name="responsibilities"
              multiline
              minRows={4}
              variant="outlined"
              margin="normal"
              required
              value={formData.responsibilities}
              onChange={handleChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.paid}
                  onChange={handleCheckboxChange}
                  name="paid"
                  color="primary"
                />
              }
              label="Paid"
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
              Create Role
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RoleForm;
