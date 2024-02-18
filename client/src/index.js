import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import reportWebVitals from './reportWebVitals';
import UserContext from './Components/Context_Components/UserContext';
import EventContext from './Components/Context_Components/EventContext';
import FontLoader from './Components/FontLoader';
import { ThemeProvider } from '@emotion/react';
import theme from './Components/Theme';
import { CssBaseline } from '@mui/material';
import RoleContext from './Components/Context_Components/RoleContext'; // Import the RolesContextProvider

const RootComponent = () => {
  const [events, setEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState({});
  const [roles, setRoles] = useState([]); // Include roles state

  useEffect(() => {
    fetch('/check-authentication')
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            setCurrentUser(user);
            setIsLoggedIn(true);
          });
        } else {
          r.json().then((error) => console.log(error));
        }
      });

    fetch('/events')
      .then((r) => r.json())
      .then((data) => {
        setEvents(data);
      });

   
    fetch('/roles')
      .then((response) => response.json())
      .then((data) => setRoles(data))
      .catch((error) => console.error('Error fetching roles:', error));
  }, []);

  return (
    <React.StrictMode>
      <EventContext.Provider value={{ events, setEvents }}>
        <UserContext.Provider value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}>
          <RoleContext.Provider value={{ roles, setRoles }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <FontLoader />
              <App />
            </ThemeProvider>
          </RoleContext.Provider>
        </UserContext.Provider>
      </EventContext.Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<RootComponent />, document.getElementById('root'));
reportWebVitals();
