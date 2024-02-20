import React, { useState, useContext } from 'react';
import EventContext from './Context_Components/EventContext';
import NavBar from './NavBar';
import UserContext from './Context_Components/UserContext';

import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import EventCard from './EventCard';

const OrganizeEventForm = () => {
  const { events, setEvents } = useContext(EventContext);
  const { currentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    start_time: '',
    duration: '',
    description: '',
    organizer: currentUser.id,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrganizeEvent = (e) => {
    e.preventDefault();
  
    fetch('/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            console.error('Error data from backend:', errorData);
            const errorMessage = Array.isArray(errorData.errors)
              ? errorData.errors.join(', ')
              : errorData.errors;
            throw new Error(errorMessage);
          });
        }
  
        setSnackbarMessage('Event created successfully!');
        setSnackbarOpen(true);
        setFormData({
          title: '',
          date: '',
          location: '',
          start_time: '',
          duration: '',
          description: '',
          organizer: currentUser.id,
        });
  
        return response.json();
      })
      .then((data) => {
        setEvents((prevEvents) => [...prevEvents, data]);
      })
      .catch((errorData) => {
        console.error('Error creating event:', errorData);
        setSnackbarMessage(errorData.message || 'Failed to create event');
        setSnackbarOpen(true);
      });
  };  

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
        <NavBar />  
        <Grid container spacing={3}>
        <Grid item xs={6}>
            <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5">Organize an Event</Typography>
            <form onSubmit={handleOrganizeEvent}>
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
                Organize Event
                </Button>
            </form>
            </Paper>
        </Grid>
        <Grid item xs={6}>
            <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5">Upcoming Events</Typography>
            <div>
                {events.map((event) => (
                <EventCard key={event.id} event={event} />
                ))}
            </div>
            </Paper>
        </Grid>
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
        </Grid>
    </div>
  );  
};

export default OrganizeEventForm;
