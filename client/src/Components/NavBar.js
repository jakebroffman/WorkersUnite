// NavBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Workers United App
        </Typography>
        <Button color="inherit" className={classes.button} component={Link} to="/organize-event">
          Organize an Event
        </Button>
        <Button color="inherit" className={classes.button} component={Link} to="/browse-events">
          Browse All Events
        </Button>
        <Button color="inherit" className={classes.button} component={Link} to="/my-events">
          My Events
        </Button>
        <Button color="inherit" className={classes.button} component={Link} to="/roles">
          Roles
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
