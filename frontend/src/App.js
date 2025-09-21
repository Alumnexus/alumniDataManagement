import './App.css';
import {Routes, Route} from "react-router-dom";
 import Footer from './Components/Footer';
import Header from './Components/Header';
import Important from "./Components/HomeBtn/Important";
import EventsPage from "./Components/EngageHub/EventPage";
import InternshipsPage from "./Components/EngageHub/InternshipPage";
import JobsPage from "./Components/EngageHub/JobPage";
import MentorshipPage from "./Components/EngageHub/MentorShipPage";
import AlumniDirectoryPage from "./Components/EngageHub/AlumniDirectoryPage";
import Features from './Components/HomeBtn/Important';
import MainHeroPage from './Components/HeroSection/MainHeroPage';
import AddEventForm from './Components/AddForm/AddEventForm';


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
      </Routes>
      {/* <HeroSection/> */}
      <Footer/>
    </div>
    </>
  );
}
export default App;