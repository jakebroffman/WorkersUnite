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
    const { events } = useContext(EventContext);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
  
    // Find the detailed event by matching the ID
    const detailedEvent = events.find((event) => event.id === parseInt(eventId, 10));
  
    const handleEditEvent = () => {
      // Implement your logic for editing the event
      // You can redirect the user to an edit page or show a modal for editing
      setSnackbarOpen(true);
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
                {/* Add null checks for duration and description */}
                <Typography variant="body1">Duration: {detailedEvent.duration || 'N/A'} minutes</Typography>
                <Typography variant="body1">Description: {detailedEvent.description || 'No description available'}</Typography>
                <Typography variant="body1">Organizer: {detailedEvent.organizer.username}</Typography>
                <Typography variant="body1">Local Chapter: {detailedEvent.organizer.local_chapter}</Typography>
                {currentUser && currentUser.id === detailedEvent.organizer_id && (
                  <Button variant="contained" color="primary" onClick={handleEditEvent} style={{ marginTop: '10px' }}>
                    Edit Event
                  </Button>
                )}
              </Paper>
            )}
          </Grid>
          <Grid item xs={6}>
            {/* Calendar Component */}
            <Paper elevation={3} style={{ padding: '20px', height: '800px' }}>
              <Typography variant="h5" style={{ marginBottom: '20px' }}>
                Event Calendar
              </Typography>
              {/* Use detailedEvent instead of event */}
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
            Event edited successfully!
          </MuiAlert>
        </Snackbar>
      </>
    );
  };
  
  export default EventDetails;
