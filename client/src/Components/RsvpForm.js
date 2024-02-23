import React, { useState, useContext } from 'react';
import { TextField, Button, Snackbar, MenuItem, InputLabel, Select, Checkbox, FormControlLabel } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import RoleContext from './Context_Components/RoleContext';
import UserContext from './Context_Components/UserContext';
import EventContext from './Context_Components/EventContext'; // Import EventContext

const RsvpForm = ({ eventId, onClose, onRsvpSubmit, setErrorState }) => {
  const { currentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    comment: '',
    attending: false,
    role_id: '',
    user_id: currentUser.id,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { roles } = useContext(RoleContext);
  const { events, setEvents } = useContext(EventContext); // Import and use events from EventContext

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

  const handleRsvpSubmit = (e) => {
    e.preventDefault();

    fetch('/rsvps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        event_id: eventId,
        user_id: currentUser.id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            console.error('Error data from backend:', errorData);

            const errorMessage =
              errorData.base || (Array.isArray(errorData.error) ? errorData.error.join(', ') : errorData.error);

            throw new Error(errorMessage);
          });
        }
        setEvents([...events]); // Update events using setEvents
        setSnackbarOpen(true);
        onRsvpSubmit();

        onClose();
      })
      .catch((error) => {
        console.error('Error submitting RSVP:', error);
        setErrorState(error.message || 'Failed to submit RSVP');
      });
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
        RSVP
      </Button>
      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleCloseSnackbar}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
          RSVP successful!
        </MuiAlert>
      </Snackbar>
    </form>
  );
};

export default RsvpForm;
