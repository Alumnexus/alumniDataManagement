import './App.css';
import React, { useState } from "react";
import {Routes, Route} from "react-router-dom";
// Header
import Header from './Components/Header/Header';
//Footer
import Footer from './Components/Footer/Footer';
//HomeBtn/Important (Features)
import Features from './Components/HomeBtn/Important';
// HeroSection (MainHeroPage) => (Important.js,HeroSection.js)
import MainHeroPage from './Components/HeroSection/MainHeroPage';
import AddEventForm from './Components/AddForm/AddEventForm';
// EngageHub (Events, internships, Job Portal, mentorship, AlumniDirectory)
import MentorshipPage from "./Components/EngageHub/MentorShipPage";
import JobsPage from "./Components/EngageHub/JobPage";
import InternshipsPage from "./Components/EngageHub/InternshipPage";
import EventsPage from "./Components/EngageHub/EventPage";
import AddInternForm from "./Components/AddForm/AddInternForm"
import AlumniDirectoryPage from "./Components/EngageHub/AlumniDirectoryPage";
import InternApplicationForm from './Components/EngageHub/ReletedForm/InternApplicationForm';


function App() {
  return (
    <>
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<MainHeroPage />} />
        <Route path="/features" element={<Features />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/internships" element={<InternshipsPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/mentorship" element={<MentorshipPage />} />
        <Route path="/alumni-directory" element={<AlumniDirectoryPage />} />
        <Route path="/add-event" element={<AddEventForm />} />
        <Route path="/add-internship" element={<AddInternForm />}/>
        <Route path='/Apply-Internship' element={<InternApplicationForm/>}/>
      </Routes>
      <Footer/>
    </div>
    </>
  );
}
export default App;