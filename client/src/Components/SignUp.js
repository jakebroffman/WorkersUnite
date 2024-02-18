import React, { useRef, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useTheme } from '@material-ui/core/styles'

const SignUp = ({ open, onClose }) => {
  const theme = useTheme();
  const dialogRef = useRef();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirmation: '',
    local_chapter: '',
    email: '',
  });

  const [errorMessages, setErrorMessages] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessages(errorData.errors || ['Failed to create user']);
        throw new Error('Failed to create user');
      }

      setSnackbarOpen(true);

      setTimeout(() => {
        setSnackbarOpen(false);

        onClose();
      }, 5000);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Dialog open={open} onClose={onClose} ref={dialogRef}>
      <DialogTitle>Sign Up</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSignUp}>
          {errorMessages.length > 0 && (
            <Snackbar open={true} autoHideDuration={5000} onClose={handleCloseSnackbar}>
              <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="error">
                {errorMessages.map((message, index) => (
                  <div key={index}>{message}</div>
                ))}
              </MuiAlert>
            </Snackbar>
          )}

          <TextField
            fullWidth
            label="Username"
            name="username"
            variant="outlined"
            margin="normal"
            required
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            required
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            name="passwordConfirmation"
            type="password"
            variant="outlined"
            margin="normal"
            required
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Local Chapter"
            name="local_chapter"
            variant="outlined"
            margin="normal"
            required
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            variant="outlined"
            margin="normal"
            required
            onChange={handleChange}
          />
          <DialogActions>
            <Button type="submit" color="primary">
              Sign Up
            </Button>
            <Button onClick={onClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </form>
      </DialogContent>

      <Snackbar open={snackbarOpen} autoHideDuration={1000} onClose={handleCloseSnackbar}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
          Sign up successful!
        </MuiAlert>
      </Snackbar>
    </Dialog>
  );
};

export default SignUp;
