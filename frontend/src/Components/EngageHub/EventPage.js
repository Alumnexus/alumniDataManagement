// src/components/EventsPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Modal,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import EventRegisterForm from "./ReletedForm/EventRegisterForm"; // Import the form
import AlertMessage from "../Utils/AlertMessage";

// Events Data with categories
const events = [
  {
    title: "Alumni Meet 2025",
    date: "October 15, 2025",
    location: "Auditorium, Main Campus",
    description:
      "Reconnect with fellow alumni and faculty over an evening of memories and networking.",
    category: "Fest",
  },
  {
    title: "Tech Talk: AI & Future",
    date: "November 5, 2025",
    location: "Seminar Hall B",
    description:
      "Join industry experts discussing the future of Artificial Intelligence and its impact.",
    category: "Webinar",
  },
  {
    title: "Career Fair",
    date: "December 2, 2025",
    location: "Sports Complex",
    description:
      "Meet top recruiters and explore internship and job opportunities across various domains.",
    category: "Workshop",
  },
  {
    title: "Coding Hackathon 2025",
    date: "January 12, 2026",
    location: "Innovation Lab",
    description:
      "A 24-hour coding event to test your skills and win exciting prizes.",
    category: "Workshop",
  },
  {
    title: "Music Night 2025",
    date: "February 20, 2026",
    location: "Open Grounds",
    description:
      "A night of fun, music, and dance organized for alumni and students.",
    category: "Fest",
  },
];

export default function EventsPage() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [notification, setNotification] = useState({ message: '', type: 'info' });
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if we were redirected here with a message
    if (location.state?.message) {
      setNotification({
        message: location.state.message,
        type: location.state.type || 'success',
      });
    }
  }, [location.state]);

  // Menu logic
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Navigate to Add Event
  const handleAddEvent = () => navigate("/add-event");

  // Filter logic
  const handleOptionClick = (category) => {
    setSelectedCategory(category);
    handleMenuClose();
  };

  // Filter events based on selected category
  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((event) => event.category === selectedCategory);

  return (
    <>
    <AlertMessage
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: 'info' })}
      />

    <Box
      sx={{
        px: { xs: 2, md: 6 },
        py: 6,
        backgroundColor: "#f9fafc",
        minHeight: "100vh",
      }}
    >
      {/* Sticky Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
          position: "sticky",
          top: 0,
          backgroundColor: "#f9fafc",
          zIndex: 100,
          paddingY: 1,
        }}
      >
        {/* Hamburger Menu */}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuClick}
          sx={{
            border: "1px solid #1976D2",
            borderRadius: 2,
            padding: 1,
            color: "#1976D2",
          }}
        >
          <MenuIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          <MenuItem onClick={() => handleOptionClick("All")}>All Events</MenuItem>
          <MenuItem onClick={() => handleOptionClick("Workshop")}>Workshop</MenuItem>
          <MenuItem onClick={() => handleOptionClick("Fest")}>Fest</MenuItem>
          <MenuItem onClick={() => handleOptionClick("Webinar")}>Webinar</MenuItem>
          <MenuItem onClick={() => handleOptionClick("Orientation")}>Orientation</MenuItem>
          <MenuItem onClick={() => handleOptionClick("Other")}>Other</MenuItem>
        </Menu>

        {/* Add Event Button */}
        <Button
          variant="contained"
          sx={{ backgroundColor: "#1976D2", textTransform: "none" }}
          onClick={handleAddEvent}
        >
          Add Event
        </Button>
      </Box>

      {/* Page Title */}
      <Typography
        variant="h3"
        sx={{
          color: "#1976D2",
          textAlign: "center",
          mb: 2,
          fontWeight: "bold",
        }}
      >
        {selectedCategory === "All" ? "Events" : `${selectedCategory} Events`}
      </Typography>
      <Typography sx={{ textAlign: "center", mb: 5, fontSize: 18 }}>
        {selectedCategory === "All"
          ? "View all events organized for alumni and students."
          : `Showing ${selectedCategory.toLowerCase()} events.`}
      </Typography>

      {/* Events Grid */}
      <Grid container spacing={4}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555", mb: 0.5 }}>
                    📅 {event.date}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555", mb: 1 }}>
                    📍 {event.location}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#777", mb: 2 }}>
                    {event.description}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#1976D2", textTransform: "none" }}
                    onClick={() => setOpenRegisterModal(true)}
                  >
                    Register
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography
            sx={{
              textAlign: "center",
              width: "100%",
              color: "#777",
              mt: 5,
            }}
          >
            No events found for "{selectedCategory}".
          </Typography>
        )}
      </Grid>

      {/* Modal for Registration Form */}
      <Modal
        open={openRegisterModal}
        onClose={() => setOpenRegisterModal(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <EventRegisterForm onClose={() => setOpenRegisterModal(false)} />
      </Modal>
    </Box>
    </>
  );
}