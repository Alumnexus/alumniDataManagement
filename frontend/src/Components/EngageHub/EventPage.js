// src/components/EventsPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
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
  CircularProgress, // Import for loading indicator
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EventRegisterForm from "./ReletedForm/EventRegisterForm";
import AlertMessage from "../Utils/AlertMessage";
import axios from "axios";
import { backendAPI } from "../middleware.js";

export default function EventsPage() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [notification, setNotification] = useState({ message: '', type: 'info' });
  const [events, setEvents] = useState([]); // This will hold data from the database
  const [loading, setLoading] = useState(true); // To show a loading indicator
  const [error, setError] = useState(null); // To handle fetch errors

  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch events from the database when the component mounts

  const findEventData = async () => {
    try {
      setLoading(true); // Ensure loading is true when starting
      const api = backendAPI();
      const res = await axios.get(`${api}/api/get/event`);
      
      // Assuming res.data.data is the array of events
      setEvents(res.data.data || []); 
      setError(null);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load events. Please try again later.");
    } finally {
      setLoading(false); // Stop the spinner regardless of success or failure
    }
  };

  useEffect(() => {
    findEventData();
  }, []);

  useEffect(() => {
    findEventData()
  }, []);

  useEffect(() => {
    if (location.state?.message) {
      setNotification({
        message: location.state.message,
        type: location.state.type || 'success',
      });
      // Optional: Clear the location state to prevent message from re-appearing on refresh
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, location.pathname, navigate]);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleAddEvent = () => navigate("/add-event");

  const handleOptionClick = (category) => {
    setSelectedCategory(category);
    handleMenuClose();
  };

  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((event) => event.category === selectedCategory);

  // Show loading indicator while fetching
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Show error message if fetch fails
  if (error) {
    return (
       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Typography color="error">{error}</Typography>
       </Box>
    );
  }

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
            filteredEvents.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event._id}> {/* Use a unique ID from the database */}
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
                      📅 {new Date(event.date).toLocaleDateString()} {/* Format date for better display */}
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