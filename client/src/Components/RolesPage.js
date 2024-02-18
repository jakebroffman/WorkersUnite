import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Button, Card, CardContent } from '@material-ui/core';
import NavBar from './NavBar';

const RolesPage = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    // Fetch roles from the backend and update the state
    fetch('/roles')
      .then((response) => response.json())
      .then((data) => setRoles(data))
      .catch((error) => console.error('Error fetching roles:', error));
  }, []); // Empty dependency array to fetch roles on component mount

  const handleAddRoleClick = () => {
    // Implement logic to add a new role to the database
    // This could open a modal or navigate to a new page with a role form
    console.log('Add role clicked');
  };

  const handleViewRoleDetails = (roleId) => {
    // Implement logic to view role details
    console.log(`View details for role with ID: ${roleId}`);
  };

  return (
    <div>
      <NavBar />
      <Grid container spacing={3}>
        {/* Left side */}
        <Grid item xs={6}>
          <Typography variant="h4" gutterBottom>
            Add a new role to the database
          </Typography>
          <Button variant="contained" color="primary" onClick={handleAddRoleClick}>
            Click to add role
          </Button>
        </Grid>

        {/* Right side */}
        <Grid item xs={6}>
          {roles.map((role) => (
            <Card key={role.id} variant="outlined" style={{ marginBottom: '10px' }}>
              <CardContent>
                <Typography variant="h6">{role.title}</Typography>
                <Typography variant="body2">Type: {role.paid ? 'Paid' : 'Unpaid'}</Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleViewRoleDetails(role.id)}
                  style={{ marginTop: '10px' }}
                >
                  View Role Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default RolesPage;
