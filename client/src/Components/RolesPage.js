import React, { useState, useEffect, useContext } from 'react';
import { Grid, Paper, Typography, Button, Card, CardContent } from '@material-ui/core';
import NavBar from './NavBar';
import RoleContext from './Context_Components/RoleContext';
import RolesForm from './RolesForm';

const RolesPage = () => {
  const { roles, setRoles } = useContext(RoleContext);
  const [showRolesForm, setShowRolesForm] = useState(false);
  const [expandedRoleId, setExpandedRoleId] = useState(null);

  useEffect(() => {
    fetch('/roles')
      .then((response) => response.json())
      .then((data) => setRoles(data))
      .catch((error) => console.error('Error fetching roles:', error));
  }, [setRoles]); 

  const handleAddRoleClick = () => {
    setShowRolesForm(!showRolesForm);
  };

  const handleViewRoleDetails = (roleId) => {
    setExpandedRoleId(expandedRoleId === roleId ? null : roleId);
  };

  return (
    <div>
      <NavBar />
      <Grid container spacing={3}>
        {/* Left side */}
        <Grid item xs={6} style={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom style={{ margin: '20px 0' }}>
            Add a new role to the database
          </Typography>
          <Button variant="contained" color="primary" onClick={handleAddRoleClick}>
            Click to add role
          </Button>
          {showRolesForm && <RolesForm />}
        </Grid>

        {/* Right side */}
        <Grid item xs={6}>
          {roles.map((role) => (
            <Card key={role.id} variant="outlined" style={{ marginBottom: '10px' }}>
              <CardContent>
                <Typography variant="h6">{role.title}</Typography>
                <Typography variant="body2">Type: {role.paid ? 'Paid' : 'Unpaid'}</Typography>
                {expandedRoleId === role.id && (
                  <div>
                    <Typography variant="body2">Description: {role.responsibilities}</Typography>
                  </div>
                )}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleViewRoleDetails(role.id)}
                  style={{ marginTop: '10px' }}
                >
                  {expandedRoleId === role.id ? 'Close Role Details' : 'View Role Details'}
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
