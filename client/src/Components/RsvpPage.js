import React, { useContext, useState } from 'react';
import { Grid, Paper, Typography, Button, Snackbar, Card, CardContent } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import EventContext from './Context_Components/EventContext';
import RsvpForm from './RsvpForm';
import NavBar from './NavBar';

const RsvpPage = () => {
  const { events } = useContext(EventContext);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rsvpFormOpen, setRsvpFormOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorState, setErrorState] = useState(null);

  const handleRsvpButtonClick = (event) => {
    setSelectedEvent(event);
    setRsvpFormOpen(!rsvpFormOpen); // Toggle the visibility of RsvpForm
  };

  const handleSeeAttendeesClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setErrorState(null);
  };

  return (
    <div>
      <NavBar />
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
          {rsvpFormOpen && (
            <RsvpForm
              eventId={selectedEvent ? selectedEvent.id : null}
              onClose={() => setRsvpFormOpen(false)}
              onRsvpSubmit={() => setSnackbarOpen(true)}
              setErrorState={setErrorState}
            />
          )}
          {selectedEvent && (
            <Paper elevation={3} style={{ padding: '20px', marginTop: '10px' }}>
              <Typography variant="h5">People Attending</Typography>
              {/* Display the organizer */}
              {selectedEvent.organizer && (
                <Card key={selectedEvent.organizer.id} style={{ marginTop: '10px' }}>
                  <CardContent>
                    <Typography variant="body1">Username: {selectedEvent.organizer.username}</Typography>
                    <Typography variant="body1">Local Chapter: {selectedEvent.organizer.local_chapter}</Typography>
                  </CardContent>
                </Card>
              )}
              {/* Display other attendees */}
              {selectedEvent.attendees && selectedEvent.attendees.map((attendee) => (
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
      </Grid>
      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleCloseSnackbar}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
          RSVP successful!
        </MuiAlert>
      </Snackbar>
      {errorState && (
        <Snackbar open={true} autoHideDuration={5000} onClose={() => setErrorState(null)}>
          <MuiAlert elevation={6} variant="filled" onClose={() => setErrorState(null)} severity="error">
            {errorState}
          </MuiAlert>
        </Snackbar>
      )}
    </div>
  );
};

export default RsvpPage;
