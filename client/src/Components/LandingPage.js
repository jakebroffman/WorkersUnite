import React, { useContext } from 'react';
import { Button, Typography, Container } from '@mui/material';
import NavBar from './NavBar';  
import UserContext from './UserContext'; 
import theme from './Theme';

const LandingPage = () => {
  const { setIsLoggedIn, setCurrentUser, isLoggedIn, currentUser } = useContext(UserContext);

  return (
    <div>
      <NavBar />
      <Container maxWidth="md">
        <Typography variant="h1" align="center" gutterBottom>
          Welcome to Workers United App, {currentUser && currentUser.username ? currentUser.username : 'Guest'} !
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
