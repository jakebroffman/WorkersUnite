import React, { useState, useContext, useEffect } from 'react';
import { TextField, Button, Snackbar, MenuItem, InputLabel, Select, Checkbox, FormControlLabel } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import RoleContext from './Context_Components/RoleContext';
import UserContext from './Context_Components/UserContext';
import EventContext from './Context_Components/EventContext';

const RsvpEditForm = ({ eventId, onClose }) => {
  const { currentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    comment: '',
    attending: false,
    role_id: '',
    user_id: currentUser.id,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { roles } = useContext(RoleContext);
  const { events, updateEventRsvp } = useContext(EventContext);
  const [errorState, setErrorState] = useState(null); 

  // Fetch RSVP details on component mount
  useEffect(() => {
    console.log("Events:", events);
    console.log("Received eventId:", eventId);
  
    const currentEvent = events.find(event => event.id === eventId);
    console.log("Current Event:", currentEvent);
  
    if (!currentEvent) {
      console.log(`Event with id ${eventId} not found`);
    } else {
      console.log("Current Event's RSVPs:", currentEvent.rsvps);
    }
  
    if (currentEvent && currentEvent.rsvps) {
      const currentRsvp = currentEvent.rsvps.find(
        (rsvp) => rsvp.user && rsvp.user.id === parseInt(currentUser.id)
      );
      console.log("Current RSVP:", currentRsvp);
  
      if (currentRsvp) {
        setFormData({
          comment: currentRsvp.comment || '',
          attending: currentRsvp.attending || false,
          role_id: currentRsvp.role_id || '',
          user_id: currentUser.id,
        });
      }
    }
  }, [eventId, currentUser.id, events]);
  
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

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/rsvps/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          event_id: eventId,
          user_id: currentUser.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error data from backend:', errorData);

        const errorMessage = Array.isArray(errorData.error)
          ? errorData.error.join(', ')
          : errorData.error;

        throw new Error(errorMessage);
      }

      setSnackbarOpen(true);
      onClose();
    } catch (error) {
      console.error('Error updating RSVP:', error);
      setErrorState(error.message || 'Failed to update RSVP');
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <form onSubmit={handleRsvpSubmit}>
      <TextField
        fullWidth
        label="Comment"
        name="comment"
        variant="outlined"
        margin="normal"
        value={formData.comment}
        onChange={handleChange}
      />
      <FormControlLabel
        control={<Checkbox name="attending" checked={formData.attending} onChange={handleCheckboxChange} />}
        label="Attending"
      />
      <InputLabel id="role-label">Select Role</InputLabel>
      <Select
        labelId="role-label"
        id="role"
        name="role_id"
        value={formData.role_id}
        onChange={handleChange}
        fullWidth
      >
        {roles
          .filter((role) => !role.event_id)
          .map((role) => (
            <MenuItem key={role.id} value={role.id}>
              {role.title}
            </MenuItem>
          ))}
      </Select>
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
        Update RSVP
      </Button>
      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleCloseSnackbar}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
          RSVP updated successfully!
        </MuiAlert>
      </Snackbar>
    </form>
  );
};

export default RsvpEditForm;
