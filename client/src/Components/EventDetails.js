import React, { useContext, useState } from 'react';
import { Grid, Paper, Typography, Button, Snackbar } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import NavBar from './NavBar';
import MuiAlert from '@material-ui/lab/Alert';
import UserContext from './UserContext';
import EventContext from './EventContext';

const localizer = momentLocalizer(moment);

const EventDetails = () => {
  const { eventId } = useParams();
  const { currentUser } = useContext(UserContext);
  const { events, setEvents } = useContext(EventContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const detailedEvent = events.find((event) => event.id === parseInt(eventId, 10));

  const handleEditEvent = () => {
    setSnackbarOpen(true);
    // Implement your logic for editing the event
  };

  const handleDeleteEvent = (eventId) => {
    fetch(`/events/${eventId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        console.log('Response:', response);
  
        if (response.ok) {
          setEvents((prevEvents) =>
            prevEvents.filter((event) => event.id !== eventId)
          );
  
          console.log('Event deleted successfully!');
        } else {
          console.error('Failed to delete event');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <NavBar />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          {detailedEvent && (
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h5">{detailedEvent.title}</Typography>
              <Typography variant="body1">Date: {moment(detailedEvent.date).format('MMMM D, YYYY')}</Typography>
              <Typography variant="body1">Location: {detailedEvent.location}</Typography>
              <Typography variant="body1">Start Time: {moment(detailedEvent.start_time, 'HH:mm:ss').format('h:mm A')}</Typography>
              <Typography variant="body1">Duration: {detailedEvent.duration || 'N/A'} minutes</Typography>
              <Typography variant="body1">Description: {detailedEvent.description || 'No description available'}</Typography>
              <Typography variant="body1">Organizer: {detailedEvent.organizer.username}</Typography>
              <Typography variant="body1">Local Chapter: {detailedEvent.organizer.local_chapter}</Typography>
              {currentUser && currentUser.id === detailedEvent.organizer.id && (
                <>
                  <Button variant="contained" color="primary" onClick={handleEditEvent} style={{ marginTop: '10px' }}>
                    Edit Event
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteEvent(detailedEvent.id)} 
                    style={{ marginTop: '10px', marginLeft: '10px' }}
                    >
  Delete Event
</Button>
                </>
              )}
            </Paper>
          )}
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} style={{ padding: '20px', height: '800px' }}>
            <Typography variant="h5" style={{ marginBottom: '20px' }}>
              Event Calendar
            </Typography>
            <Calendar
              localizer={localizer}
              events={detailedEvent ? [{ ...detailedEvent, start: moment(detailedEvent.date).toDate(), end: moment(detailedEvent.date).add(detailedEvent.duration, 'minutes').toDate() }] : []}
              startAccessor="start"
              endAccessor="end"
              views={['month']}
              style={{ height: 'calc(100% - 50px)' }}
            />
          </Paper>
        </Grid>
      </Grid>
      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleCloseSnackbar}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
          Event action successful!
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default EventDetails;
