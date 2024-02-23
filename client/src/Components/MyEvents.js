import React, { useContext, useState } from 'react';
import { Grid, Typography, Card, CardContent, Button } from '@material-ui/core';
import NavBar from './NavBar';
import UserContext from './Context_Components/UserContext';
import EventContext from './Context_Components/EventContext';
import EditRsvpForm from './EditRsvpForm'; // Import your EditRsvpCard component

const MyEvents = () => {
  const { currentUser } = useContext(UserContext);
  const { events, setEvents } = useContext(EventContext);

  const organizedEvents = events.filter((event) => event.organizer.id === currentUser.id);
  const attendedEvents = events.filter((event) => {
    return event.attendees?.some((attendee) => attendee.username === currentUser.username);
  });

  const [showEditRsvp, setShowEditRsvp] = useState(false); 
  const [selectedEvent, setSelectedEvent] = useState(null); 

  const handleRsvpChange = (event) => {
    setSelectedEvent(event);
    setShowEditRsvp(true);
  };

  const handleCantMakeIt = (event) => {
    const currentUserRsvp = event.rsvps.find((rsvp) => rsvp.user.id === currentUser.id);
  
    if (currentUserRsvp) {
      fetch(`/rsvps/${currentUserRsvp.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: currentUser.id,
        }),
      })
        .then((response) => {
          if (response.ok) {
            // Update the events in the context to reflect the change
            setEvents((prevEvents) => {
              const updatedEvents = prevEvents.map((e) => {
                if (e.id === event.id) {
                  const updatedRsvps = e.rsvps.filter((r) => r.id !== currentUserRsvp.id);
                  return { ...e, rsvps: updatedRsvps, attending: updatedRsvps.length };
                }
                return e;
              });
              return updatedEvents;
            });
  
            // Optionally, close the EditRsvpForm if it's open for the deleted event
            setShowEditRsvp(false);
          }
        })
        .catch(() => {
          console.error('Failed to delete RSVP');
        });
    }
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
