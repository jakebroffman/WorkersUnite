import React, { useEffect } from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInSide from './SignInSide';
import LandingPage from './LandingPage';
import OrganizeEventForm from './OrganizeEventForm';


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
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/organize-event" element={<OrganizeEventForm />} />
        </Routes>
    </Router>
  );
};

export default App;
