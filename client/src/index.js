import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import reportWebVitals from './reportWebVitals';
import UserContext from './Components/UserContext';
import EventContext from './Components/EventContext';
import FontLoader from './Components/FontLoader';
import { ThemeProvider } from '@emotion/react';
import theme from './Components/Theme';
import { CssBaseline } from '@mui/material';

const RootComponent = () => {
  const [events, setEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    fetch('/check-authentication')
    .then((r) => {
      
      if (r.ok) {
        r.json().then(user => 
        {setCurrentUser(user)
        setIsLoggedIn(true)}) 
      }
      else{ 
        r.json()
        .then(error => console.log(error))
      }
    })
  

    fetch('/events')
      .then((r) => r.json())
      .then((data) => {
        setEvents(data);
      });
  }, []); 

  return (
    <React.StrictMode>
      <EventContext.Provider value={{ events, setEvents }}>
        <UserContext.Provider value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}>
          <ThemeProvider theme ={theme}>
            <CssBaseline />
            <FontLoader />
            <App />
          </ThemeProvider>
        </UserContext.Provider>
      </EventContext.Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(
  <RootComponent />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
