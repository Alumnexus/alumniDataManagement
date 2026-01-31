import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  CircularProgress,
  Popover,
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
  const [notification, setNotification] = useState({ message: "", type: "info" });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hover states
  const [hoverAnchorEl, setHoverAnchorEl] = useState(null);
  const [hoverEvent, setHoverEvent] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const open = Boolean(anchorEl);

  const findEventData = async () => {
    try {
      setLoading(true);
      const api = backendAPI();
      const res = await axios.get(`${api}/api/get/event`);
      setEvents(res.data.data || []);
    } catch (err) {
      setError("Failed to load events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    findEventData();
  }, []);

  useEffect(() => {
    if (location.state?.message) {
      setNotification({
        message: location.state.message,
        type: location.state.type || "success",
      });
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((event) => event.category === selectedCategory);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", height: "100vh" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <>
      <AlertMessage
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "info" })}
      />

      <Box sx={{ px: { xs: 2, md: 6 }, py: 6, backgroundColor: "#f9fafc", minHeight: "100vh" }}>
        {/* HEADER */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
          <IconButton
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ border: "1px solid #1976D2", borderRadius: 2 }}
          >
            <MenuIcon sx={{ color: "#1976D2" }} />
          </IconButton>

          <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
            {["All", "Workshop", "Fest", "Webinar", "Orientation", "Other"].map((cat) => (
              <MenuItem
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setAnchorEl(null);
                }}
              >
                {cat}
              </MenuItem>
            ))}
          </Menu>

          <Button
            variant="contained"
            sx={{ backgroundColor: "#1976D2", "&:hover": { backgroundColor: "#1565C0" } }}
            onClick={() => navigate("/add-event")}
          >
            Add Event
          </Button>
        </Box>

        {/* TITLE */}
        <Typography variant="h3" align="center" sx={{ color: "#1976D2", fontWeight: "bold", mb: 4 }}>
          {selectedCategory === "All" ? "Events" : `${selectedCategory} Events`}
        </Typography>

        {/* EVENTS GRID */}
        <Grid container spacing={4}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {event.title}
                  </Typography>
                  <Typography>📅 {new Date(event.date).toLocaleDateString()}</Typography>
                  <Typography>📍 {event.location}</Typography>
                  <Typography sx={{ color: "#777", mb: 2 }}>
                    {event.description}
                  </Typography>

                  {/* REGISTER BUTTON */}
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#1976D2",
                      "&:hover": { backgroundColor: "#1565C0" },
                      textTransform: "none",
                    }}
                    onMouseEnter={(e) => {
                      setHoverAnchorEl(e.currentTarget);
                      setHoverEvent(event);
                    }}
                    onClick={() => setOpenRegisterModal(true)}
                  >
                    Register
                  </Button>

                  {/* HOVER DETAILS CARD */}
                  <Popover
                    open={Boolean(hoverAnchorEl) && hoverEvent?._id === event._id}
                    anchorEl={hoverAnchorEl}
                    disableRestoreFocus
                    sx={{ pointerEvents: "none" }}   // ⭐ button stays clickable
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    PaperProps={{
                      sx: {
                        p: 2,
                        width: 300,
                        borderRadius: 2,
                        boxShadow: "0px 8px 25px rgba(0,0,0,0.15)",
                        pointerEvents: "auto",
                      },
                      onMouseLeave: () => {
                        setHoverAnchorEl(null);
                        setHoverEvent(null);
                      },
                    }}
                  >
                    {hoverEvent && (
                      <>
                        <Typography variant="h6" fontWeight="bold">
                          {hoverEvent.title}
                        </Typography>
                        <Typography variant="body2">
                          <b>Date:</b> {new Date(hoverEvent.date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2">
                          <b>Location:</b> {hoverEvent.location}
                        </Typography>
                        <Typography variant="body2">
                          <b>Category:</b> {hoverEvent.category}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {hoverEvent.description}
                        </Typography>
                      </>
                    )}
                  </Popover>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* REGISTER MODAL */}
        <Modal open={openRegisterModal} onClose={() => setOpenRegisterModal(false)}>
          <EventRegisterForm onClose={() => setOpenRegisterModal(false)} />
        </Modal>
      </Box>
    </>
  );
}
