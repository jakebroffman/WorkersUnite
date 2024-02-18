import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const EventCard = ({ event, onButtonClick }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {event.title}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          {event.date}
        </Typography>
        <Typography variant="body2" component="div">
          {event.description}
        </Typography>
        <Typography variant="body2" component="div">
          Organizer: {event.organizer.username}
        </Typography>
        <Typography variant="body2" component="div">
          Local Chapter: {event.organizer.local_chapter}
        </Typography>
        <Button variant="contained" component={Link} to={`/events/${event.id}`}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
