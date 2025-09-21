import React, { useState } from "react";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const events = [
  {
    title: "Alumni Meet 2025",
    date: "October 15, 2025",
    location: "Auditorium, Main Campus",
    description:
      "Reconnect with fellow alumni and faculty over an evening of memories and networking.",
  },
  {
    title: "Tech Talk: AI & Future",
    date: "November 5, 2025",
    location: "Seminar Hall B",
    description:
      "Join industry experts discussing the future of Artificial Intelligence and its impact.",
  },
  {
    title: "Career Fair",
    date: "December 2, 2025",
    location: "Sports Complex",
    description:
      "Meet top recruiters and explore internship and job opportunities across various domains.",
  },
];

export default function EventsPage() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
const navigate = useNavigate();

const handleAddEvent = () => {
  navigate("/add-event"); // navigate to AddEvent page
};

  const handleOptionClick = (option) => {
    alert(`You selected: ${option}`); // replace with filter logic
    handleMenuClose();
  };

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6, backgroundColor: "#f9fafc", minHeight: "100vh" }}>
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
          <MenuItem onClick={() => handleOptionClick("Workshop")}>Workshop</MenuItem>
          <MenuItem onClick={() => handleOptionClick("Party Event")}>Party Event</MenuItem>
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
        sx={{ color: "#1976D2", textAlign: "center", mb: 2, fontWeight: "bold" }}
      >
        Events
      </Typography>
      <Typography sx={{ textAlign: "center", mb: 5 }}>
        View all events organized for alumni and students.
      </Typography>

      {/* Events Grid */}
      <Grid container spacing={4}>
        {events.map((event, index) => (
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
                >
                  Register
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
