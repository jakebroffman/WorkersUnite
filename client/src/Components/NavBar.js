import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import UserContext from './Context_Components/UserContext';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    flexGrow: 1,
    fontSize: '1.5rem',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  button: {
    margin: theme.spacing(1),
    fontSize: 'auto',
    whiteSpace: 'nowrap',
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const { setIsLoggedIn, setCurrentUser, isLoggedIn, currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogOutClick = () => {
    console.log('Logging out...');
    fetch('/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('Logout successful.');
          setIsLoggedIn(!isLoggedIn);
          setCurrentUser(null);
          sessionStorage.removeItem('isLoggedIn');
          sessionStorage.removeItem('currentUser');
          navigate('/');
        } else {
          console.error('Failed to log out');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Workers United App
        </Typography>
        <Button color="inherit" className={classes.button} component={Link} to={`/${currentUser.username}/home`}>
        <HomeIcon />
        </Button>
        <Button color="inherit" className={classes.button} component={Link} to={`/${currentUser.username}/organize-event`}>
          Organize an Event
        </Button>
        <Button color="inherit" className={classes.button} component={Link} to={`/${currentUser.username}/browse-events`}>
          Rsvp to an Event
        </Button>
        <Button color="inherit" className={classes.button} component={Link} to={`/${currentUser.username}/my-events`}>
          My Events
        </Button>
        <Button color="inherit" className={classes.button} component={Link} to="/roles">
          Roles
        </Button>
        <Button
          color="inherit"
          className={classes.button}
          component={Link}
          to="/"
          onClick={handleLogOutClick}
        >
        Log Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
