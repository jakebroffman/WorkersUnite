import React, { useContext, useState } from 'react';
import { Grid, Paper, Typography, Button, Snackbar, Card, CardContent } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import EventContext from './EventContext';
// import RsvpForm from './RsvpForm'; // Import the RsvpForm component

const RsvpPage = () => {
    const { events } = useContext(EventContext);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [rsvpFormOpen, setRsvpFormOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
  
    const handleRsvpButtonClick = (event) => {
      setSelectedEvent(event);
      setRsvpFormOpen(true);
    };
  
    const handleSeeAttendeesClick = (event) => {
      setSelectedEvent(event);
    };
  
    const handleCloseSnackbar = () => {
      setSnackbarOpen(false);
    };
  
    return (
      <Grid container spacing={3}>
        <Grid item xs={6}>
          {events.map((event) => (
            <Paper key={event.id} elevation={3} style={{ padding: '20px', marginBottom: '10px' }}>
              <Typography variant="h5">{event.title}</Typography>
              <Typography variant="body1">Date: {event.date}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleRsvpButtonClick(event)}
                style={{ marginTop: '10px' }}
              >
                RSVP
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleSeeAttendeesClick(event)}
                style={{ marginTop: '10px', marginLeft: '10px' }}
              >
                See Who Is Attending
              </Button>
            </Paper>
          ))}
        </Grid>
        <Grid item xs={6}>
          {selectedEvent && selectedEvent.attendees && (
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h5">People Attending</Typography>
              {selectedEvent.attendees.map((attendee) => (
                <Card key={attendee.id} style={{ marginTop: '10px' }}>
                  <CardContent>
                    <Typography variant="body1">Username: {attendee.username}</Typography>
                    <Typography variant="body1">Local Chapter: {attendee.local_chapter}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Paper>
          )}
        </Grid>
        <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleCloseSnackbar}>
          <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
            RSVP successful!
          </MuiAlert>
        </Snackbar>
      </Grid>
    );
  };
  
  export default RsvpPage;
  
