import React, { useContext, useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Button,
  Snackbar,
  Card,
  CardContent
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import EventContext from './Context_Components/EventContext';
import RsvpForm from './RsvpForm';
import NavBar from './NavBar';
import UserContext from './Context_Components/UserContext';

const RsvpPage = () => {
  const { events, setEvents } = useContext(EventContext);
  const { currentUser } = useContext(UserContext);
  const [selectedEvent, setSelectedEvent] = useState({
    attendees: [],
    rsvps: []
  });
  const [isRsvpFormVisible, setIsRsvpFormVisible] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorState, setErrorState] = useState(null);
  const [isRsvpSuccess, setIsRsvpSuccess] = useState(false);

  const handleRsvpButtonClick = (event) => {
    setSelectedEvent(event)
    // setSelectedEvent((selectedEvent) => { 
    //   // (selectedEvent && selectedEvent.id === event.id ? null : event)
    //   if (!(selectedEvent&& selectedEvent.id === event.id)){
    //     debugger
    //     return event
    //   }
    // });
    setIsRsvpFormVisible(isRsvpFormVisible => !isRsvpFormVisible);
  };



  const handleRsvpSuccessSnackbarClose = () => {
    setIsRsvpSuccess(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setErrorState(null);
  };

  const handleRsvpSubmit = () => {
    // setEvents((prevEvents) =>
    //   prevEvents.map((event) =>
    //     event.id === selectedEvent.id ? { ...event, attendees: [...event.attendees, newRsvp] } : event
    //   )
    // );
    setSnackbarOpen(true);
    setIsRsvpFormVisible(false);
    setIsRsvpSuccess(true);
  };

  return (
    <div>
      <NavBar />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          {events.map((event) => (
            <Paper key={event.id} elevation={3} style={{ padding: '20px', marginBottom: '10px' }}>
              {/* Display event details */}
              <Typography variant="h5">{event.title}</Typography>
              <Typography variant="body1">Date: {event.date}</Typography>

              {/* RSVP button */}
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleRsvpButtonClick(event)}
                style={{
                  marginTop: '10px',
                  display: 'block',
                  margin: '0 auto',
                  width: '150px',
                  height: '40px',
                }}
              >
                {selectedEvent && selectedEvent.id === event.id ? 'Close' : 'RSVP'}
              </Button>

              {/* Display RsvpForm */}
              {selectedEvent && selectedEvent.id === event.id && isRsvpFormVisible && (
                <RsvpForm
                  eventId={selectedEvent.id}
                  onClose={() => {
                    setSelectedEvent({
                      attendees: []
                    });
                    setIsRsvpFormVisible(false);
                    setIsRsvpSuccess(true);
                  }}
                  onRsvpSubmit={handleRsvpSubmit}
                  setErrorState={setErrorState}
                />
              )}

              {console.log('rsvpData:', selectedEvent ? selectedEvent.attendees : null)}
            </Paper>
          ))}
        </Grid>
        <Grid item xs={6}>
          {/* Display people attending */}
          {selectedEvent && selectedEvent.attendees && (
            <Paper elevation={3} style={{ padding: '20px', marginTop: '10px' }}>
              <Typography variant="h5">People Attending</Typography>
              {selectedEvent.organizer && (
                <Card key={selectedEvent.organizer.id} style={{ marginTop: '10px' }}>
                  <CardContent>
                    <Typography variant="body1">Username: {selectedEvent.organizer.username}</Typography>
                    <Typography variant="body1">Local Chapter: {selectedEvent.organizer.local_chapter}</Typography>
                  </CardContent>
                </Card>
              )}
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
      </Grid>
      {/* Snackbar for RSVP success */}
      <Snackbar open={isRsvpSuccess} autoHideDuration={5000} onClose={handleRsvpSuccessSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleRsvpSuccessSnackbarClose} severity="success">
          RSVP successful!
        </MuiAlert>
      </Snackbar>
      {/* Snackbar for errorState */}
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
