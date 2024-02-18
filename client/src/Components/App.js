import React, { useEffect } from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInSide from './SignInSide';
import LandingPage from './LandingPage';
import OrganizeEventForm from './OrganizeEventForm';
import EventDetails from './EventDetails';
import { useTheme } from '@material-ui/core/styles'
import RsvpPage from './RsvpPage';


const App = () => {
  const theme = useTheme();

  useEffect(
    () => {
      fetch('/events')
      .then((res) => res.json())
      .then(data=>{console.log(data)}) 
    }, []
  ) 


  return (
    <Router>
        <Routes>
          <Route path="/" element={<SignInSide />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/organize-event" element={<OrganizeEventForm />} />
          <Route path="/events/:eventId" element={<EventDetails />} />
          <Route path="/browse-events" element={<RsvpPage />} />
        </Routes>
    </Router>
  );
};

export default App;
