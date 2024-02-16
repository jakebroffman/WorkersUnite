import React, { useContext } from 'react';
import { Button, Typography, Container } from '@mui/material';
import NavBar from './NavBar';  
import UserContext from './UserContext';

const LandingPage = () => {
  const { currentUser, setCurrentUser } = useContext();  

  return (
    <div>
      <NavBar />

      <Container maxWidth="md">
        <Typography variant="h1" align="center" gutterBottom>
          Welcome to Your App, {currentUser.username}!
        </Typography>
        <Typography variant="subtitle1" align="center" paragraph>
          Discover amazing features and benefits of your app.
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Get Started
        </Button>
      </Container>
    </div>
  );
};

export default LandingPage;
