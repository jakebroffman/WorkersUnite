import React, { useContext, useState, useEffect } from 'react';
import { Grid, Typography, Card, CardContent, Button } from '@material-ui/core';
import NavBar from './NavBar';
import UserContext from './Context_Components/UserContext';
import EventContext from './Context_Components/EventContext';
import EditRsvpForm from './EditRsvpForm'; // Import your EditRsvpCard component

const MyEvents = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { events, setEvents } = useContext(EventContext)
  const [organizedEvents, setOrganizedEvents] = useState([]);
  const [attendedEvents, setAttendedEvents] = useState([]);

  useEffect(() => {
    const organized = events.filter((event) => event.organizer.id === currentUser.id);
    const attended = events.filter((event) => {
      return event.attendees?.some((attendee) => attendee.username === currentUser.username);
    });
  debugger
    setOrganizedEvents(organized);
    setAttendedEvents(attended);
  }, [events, currentUser]);

  const [showEditRsvp, setShowEditRsvp] = useState(false); 
  const [selectedEvent, setSelectedEvent] = useState(null); 

  const handleRsvpChange = (event) => {
    setSelectedEvent(event);
    setShowEditRsvp(true);
  };

  const handleCantMakeIt = (event) => {
    const currentUserRsvp = event.rsvps.find((rsvp) => rsvp.user.id === currentUser.id);
    if (!currentUserRsvp) return;
  
    fetch(`/rsvps/${currentUserRsvp.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: currentUser.id }),
    })
      .then((response) => {
        if (response.ok) {
          const updatedAttendees = event.rsvps.filter((r) => r.id !== currentUserRsvp.id);
          const updatedEvents = events.map((e) =>
            e.id === event.id
              ? {
                  ...e,
                  rsvps: e.rsvps.filter((r) => r.id !== currentUserRsvp.id),
                  attendees: updatedAttendees
                }
              : e
          );
          debugger
          const attended = updatedEvents.filter((event) => {
            return event.attendees?.some((attendee) => attendee.username === currentUser.username);
          });
          setAttendedEvents(attended)
          setEvents(updatedEvents);
          setShowEditRsvp(false);
        } else {
          console.error('Failed to delete RSVP');
        }
      })
      .catch((error) => {
        console.error('Error deleting RSVP:', error);
      });
  };
  
  
  

  const handleEditRsvpClose = () => {
    setShowEditRsvp(false);
  };

  return (
    <div>
      <NavBar />
      <Grid container spacing={3}>
        {/* Left side - Events I organized */}
        <Grid item xs={6} style={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom style={{ margin: '20px 0' }}>
            Events I organized:
          </Typography>
          {organizedEvents.map((event) => (
            <Card key={event.id} variant="outlined" style={{ marginBottom: '10px' }}>
              <CardContent>
                <Typography variant="h6">{event.title}</Typography>
                <Typography variant="body2">Date: {event.date}</Typography>
                {/* Add more event details as needed */}
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Right side - Events I am attending */}
        <Grid item xs={6} style={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom style={{ margin: '20px 0' }}>
            Events I am attending:
          </Typography>
          {attendedEvents.map((event) => (
            <Card key={event.id} variant="outlined" style={{ marginBottom: '10px' }}>
              <CardContent>
                <Typography variant="h6">{event.title}</Typography>
                <Typography variant="body2">Date: {event.date}</Typography>
                {/* Buttons for changing RSVP */}
                <Button variant="outlined" color="primary" onClick={() => handleRsvpChange(event)}>
                  Change RSVP
                </Button>
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  onClick={() => handleCantMakeIt(event)}
                  type="button" 
                >
                  I can't make it, sorry
                </Button>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>

      {showEditRsvp && selectedEvent && (
        <EditRsvpForm eventId={selectedEvent.id} event={selectedEvent} onClose={handleEditRsvpClose} />
      )}
    </div>
  );
};

export default MyEvents;
