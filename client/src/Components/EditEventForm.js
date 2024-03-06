import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const EditEventForm = ({ event, onEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    start_time: '',
    duration: '',
    description: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    if (event) {
      const startDateTime = new Date(event.start_time);
      const hours = startDateTime.getHours();
      const minutes = startDateTime.getMinutes();
  
      setFormData({
        title: event.title || '',
        date: event.date || '',
        location: event.location || '',
        start_time: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
        duration: event.duration || '',
        description: event.description || '',
      });
    }
  }, [event]);
  
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditEvent = (e) => {
    e.preventDefault();
  
    if (!event) {
      // Handle the case where the event is deleted
      setSnackbarMessage('Event does not exist or has been deleted.');
      setSnackbarOpen(true);
      return;
    }
  
    fetch(`/events/${event.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            setSnackbarMessage(errorData.errors ? errorData.errors.join(', ') : 'Failed to edit event');
            setSnackbarOpen(true);
            throw new Error('Failed to edit event');
          });
        }
        setSnackbarMessage('Event edited successfully!');
        setSnackbarOpen(true);
  
        // Pass the updated event to the onEdit callback
        return response.json();
      })
      .then((updatedEvent) => {
        onEdit(updatedEvent); // Call onEdit with the updated event
      })
      .catch((error) => {
        console.error('Error editing event:', error);
      });
  };
  
  

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Typography variant="h5">Edit Event</Typography>
      <form onSubmit={handleEditEvent}>
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
          label="Date"
          name="date"
          type="date"
          variant="outlined"
          margin="normal"
          required
          value={formData.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Location"
          name="location"
          variant="outlined"
          margin="normal"
          required
          value={formData.location}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Start Time"
          name="start_time"
          type="time"
          variant="outlined"
          margin="normal"
          required
          value={formData.start_time}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          inputProps={{ step: 300 }} // Set step to 5 minutes (300 seconds)
        />
        <TextField
          fullWidth
          label="Duration (in minutes)"
          name="duration"
          type="number"
          variant="outlined"
          margin="normal"
          required
          value={formData.duration}
          onChange={handleChange}
          inputProps={{ step: 30 }}
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          multiline
          minRows={4}
          variant="outlined"
          margin="normal"
          required
          value={formData.description}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
          Save Changes
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default EditEventForm;
