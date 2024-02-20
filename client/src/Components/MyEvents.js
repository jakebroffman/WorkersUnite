import React, { useContext } from 'react';
import { Grid, Typography, Card, CardContent } from '@material-ui/core';
import NavBar from './NavBar';
import UserContext from './Context_Components/UserContext';
import EventContext from './Context_Components/EventContext';

const MyEvents = () => {
  const { currentUser } = useContext(UserContext);
  const { events } = useContext(EventContext);

  const organizedEvents = events.filter((event) => event.organizer.id === currentUser.id);
  const attendedEvents = events.filter((event) => {
    return event.attendees?.some((attendee) => attendee.username === currentUser.username);
  });
  
  
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
                {/* Add more event details as needed */}
                {/* Assuming you have RSVP information stored in each event */}
                {event.rsvp && (
                  <div>
                    <Typography variant="body2">RSVP Role: {event.rsvp.role.title}</Typography>
                    {/* Add more RSVP role details as needed */}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default MyEvents;
