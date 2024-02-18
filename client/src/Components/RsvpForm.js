import React, { useState } from 'react';
import { TextField, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const RsvpForm = ({ eventId, onClose, onRsvpSubmit, setErrorState }) => {
  const [formData, setFormData] = useState({
    comment: '',
    attending: false,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/rsvps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          event_id: eventId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to submit RSVP: ${errorData.message}`);
      }

      setSnackbarOpen(true);
      onRsvpSubmit();
      onClose();
    } catch (error) {
      let errorDetails;
      try {
        errorDetails = JSON.parse(error.message);
      } catch (jsonError) {
        errorDetails = { message: error.message };
      }

      setErrorState(errorDetails.message);
      console.error('Error submitting RSVP:', error);
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
      <div>
        <label>Attending:</label>
        <input
          type="checkbox"
          name="attending"
          checked={formData.attending}
          onChange={(e) => setFormData({ ...formData, attending: e.target.checked })}
        />
      </div>
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
