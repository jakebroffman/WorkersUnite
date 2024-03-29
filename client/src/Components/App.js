import React, { useEffect } from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInSide from './SignInSide';
import LandingPage from './LandingPage';
import OrganizeEventForm from './OrganizeEventForm';
import EventDetails from './EventDetails';
import RsvpPage from './RsvpPage';
import RolesPage from './RolesPage';
import MyEvents from './MyEvents';


const App = () => {

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
          <Route path="/:username/home" element={<LandingPage />} />
          <Route path="/:username/organize-event" element={<OrganizeEventForm />} />
          <Route path="/events/:eventId" element={<EventDetails />} />
          <Route path="/:username/browse-events" element={<RsvpPage />} />
          <Route path='/roles' element={<RolesPage />} />
          <Route path="/:username/my-events" element={<MyEvents />} />
        </Routes>
    </Router>
  );
};

export default App;
