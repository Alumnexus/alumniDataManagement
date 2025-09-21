import { Routes, Route } from "react-router-dom";
import Features from "./Components/HomeBtn/Important";
import EventsPage from "./Components/EngageHub/EventPage";
import InternshipPage from "./Components/EngageHub/InternshipPage";
import JobPortalPage from "./Components/EngageHub/JobPage";
import MentorshipPage from "./Components/EngageHub/MentorShipPage";
import AlumniDirectoryPage from "./Components/AlumniRegistrationForm";

function Temp() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Features />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/internships" element={<InternshipPage />} />
        <Route path="/jobs" element={<JobPortalPage />} />
        <Route path="/mentorship" element={<MentorshipPage />} />
        <Route path="/alumni-directory" element={<AlumniDirectoryPage />} />
      </Routes>
    </>
  );
}

export default Temp;