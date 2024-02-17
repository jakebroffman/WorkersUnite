import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const EventCard = ({ title, description, date, onButtonClick }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          {date}
        </Typography>
        <Typography variant="body2" component="div">
          {description}
        </Typography>
        <Button variant="contained" onClick={onButtonClick}>
          Click Me
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
