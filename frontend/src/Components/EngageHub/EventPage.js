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
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
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

  // Hover popover states
  const [hoverAnchorEl, setHoverAnchorEl] = useState(null);
  const [hoverEvent, setHoverEvent] = useState(null);

  // Participant-listing states
  const [participantsDialogOpen, setParticipantsDialogOpen] = useState(false);
  const [participantsLoading, setParticipantsLoading] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [participantsError, setParticipantsError] = useState(null);

  // Participant detail dialog
  const [participantDetailOpen, setParticipantDetailOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  // Current user
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const open = Boolean(anchorEl);

  const api = backendAPI();

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const findEventData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${api}/api/get/event`, { headers: getAuthHeaders() });
      setEvents(res.data.data || []);
    } catch (err) {
      setError("Failed to load events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const loadCurrentUser = async () => {
    try {
      const res = await axios.get(`${api}/api/auth/me`, { headers: getAuthHeaders() });
      if (res?.data) setCurrentUser(res.data);
    } catch (err) {
      try {
        const stored = localStorage.getItem("user");
        if (stored) setCurrentUser(JSON.parse(stored));
      } catch (e) {
        setCurrentUser(null);
      }
    }
  };

  useEffect(() => {
    loadCurrentUser();
    findEventData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (location.state?.message) {
      setNotification({
        message: location.state.message,
        type: location.state.type || "success",
      });
      navigate(location.pathname, { replace: true });
    }

    if (location.state?.openRegister) {
      setOpenRegisterModal(true);
    }
  }, [location, navigate]);

  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((event) => event.category === selectedCategory);

  const isOrganizerOf = (event) => {
    if (!currentUser) return false;
    const id = currentUser._id || currentUser.id || currentUser?.userId;
    const email = currentUser.email;
    return (
      id &&
        (event.organizer === id ||
          event.organizerId === id ||
          event.organizerId === event.organizer ||
          event.organiserId === id) ||
      (email && (event.organizerEmail === email || event.organiserEmail === email))
    );
  };

  const handleViewParticipants = async (eventId) => {
    try {
      setParticipants([]);
      setParticipantsError(null);
      setParticipantsLoading(true);
      setParticipantsDialogOpen(true);

      const res = await axios.get(`${api}/api/events/${eventId}/participants`, {
        headers: getAuthHeaders(),
      });

      const data = res?.data?.participants ?? res?.data?.data ?? res?.data ?? [];
      setParticipants(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch participants:", err);
      setParticipantsError("Failed to load participants. Try again or check permissions.");
    } finally {
      setParticipantsLoading(false);
    }
  };

  const handleOpenParticipantDetail = (participant) => {
    setSelectedParticipant(participant);
    setParticipantDetailOpen(true);
  };

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

          {(currentUser?.role === "alumni" ||
            currentUser?.role === "admin" ||
            currentUser?.permission === "Faculty" ||
            currentUser?.permission === "Admin") && (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#1976D2",
                "&:hover": { backgroundColor: "#1565C0" },
                textTransform: "none",
                fontWeight: "bold"
              }}
              onClick={() => navigate("/add-event")}
            >
              Add Event
            </Button>
          )}
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
                  <Typography sx={{ color: "#777", mb: 2 }}>{event.description}</Typography>

                  <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
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
                      onClick={() => {
                        const token = localStorage.getItem("token");
                        if (!token) {
                          navigate("/login", { 
                            state: { 
                              from: location.pathname, 
                              openRegister: true, 
                              eventId: event._id 
                            } 
                          });
                        } else {
                          setOpenRegisterModal(true);
                        }
                      }}
                    >
                      Register
                    </Button>

                    {/* VIEW PARTICIPANTS BUTTON (only for organizers NOT students) */}
                    {isOrganizerOf(event) && currentUser?.role !== "student" && (
                      <Button
                        variant="outlined"
                        sx={{ textTransform: "none" }}
                        onClick={() => handleViewParticipants(event._id)}
                      >
                        View Participants
                      </Button>
                    )}
                  </Box>

                  {/* HOVER DETAILS POPOVER */}
                  <Popover
                    open={Boolean(hoverAnchorEl) && hoverEvent?._id === event._id}
                    anchorEl={hoverAnchorEl}
                    disableRestoreFocus
                    sx={{ pointerEvents: "none" }}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    transformOrigin={{ vertical: "bottom", horizontal: "center" }}
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
                        <Typography variant="h6" fontWeight="bold">{hoverEvent.title}</Typography>
                        <Typography variant="body2"><b>Date:</b> {new Date(hoverEvent.date).toLocaleDateString()}</Typography>
                        <Typography variant="body2"><b>Location:</b> {hoverEvent.location}</Typography>
                        <Typography variant="body2"><b>Category:</b> {hoverEvent.category}</Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>{hoverEvent.description}</Typography>
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

        {/* PARTICIPANTS DIALOG */}
        <Dialog
          open={participantsDialogOpen}
          onClose={() => {
            setParticipantsDialogOpen(false);
            setParticipants([]);
            setParticipantsError(null);
          }}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Participants
            <IconButton
              onClick={() => {
                setParticipantsDialogOpen(false);
                setParticipants([]);
                setParticipantsError(null);
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers>
            {participantsLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                <CircularProgress />
              </Box>
            ) : participantsError ? (
              <Typography color="error">{participantsError}</Typography>
            ) : participants.length === 0 ? (
              <Typography>No participants registered yet.</Typography>
            ) : (
              <List>
                {participants.map((p) => (
                  <React.Fragment key={p._id || p.id || p.email}>
                    <ListItem
                      secondaryAction={
                        <IconButton edge="end" onClick={() => handleOpenParticipantDetail(p)}>
                          <VisibilityIcon />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar src={p.avatar || p.photo} alt={p.name || p.fullName || p.email}>
                          {p.name ? p.name.charAt(0).toUpperCase() : p.email?.charAt(0)?.toUpperCase()}
                        </Avatar>
                      </ListItemAvatar>

                      <ListItemText
                        primary={p.name || p.fullName || p.email}
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.primary">
                              {p.email}
                            </Typography>
                            {p.phone ? ` — ${p.phone}` : ""}
                          </>
                        }
                      />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            )}
          </DialogContent>
        </Dialog>

        {/* PARTICIPANT DETAIL DIALOG */}
        <Dialog
          open={participantDetailOpen}
          onClose={() => {
            setParticipantDetailOpen(false);
            setSelectedParticipant(null);
          }}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Participant Details
            <IconButton
              onClick={() => {
                setParticipantDetailOpen(false);
                setSelectedParticipant(null);
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers>
            {selectedParticipant ? (
              <Box>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
                  <Avatar
                    src={selectedParticipant.avatar || selectedParticipant.photo}
                    sx={{ width: 72, height: 72 }}
                  >
                    {(selectedParticipant.name || selectedParticipant.email || "U").charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{selectedParticipant.name || selectedParticipant.fullName || "Unknown"}</Typography>
                    <Typography variant="body2">{selectedParticipant.email}</Typography>
                    {selectedParticipant.phone && <Typography variant="body2">{selectedParticipant.phone}</Typography>}
                  </Box>
                </Box>

                {selectedParticipant.college && (
                  <Typography><b>College:</b> {selectedParticipant.college}</Typography>
                )}
                {selectedParticipant.registrationDate && (
                  <Typography>
                    <b>Registered on:</b>{" "}
                    {new Date(selectedParticipant.registrationDate).toLocaleString()}
                  </Typography>
                )}
                {selectedParticipant.fields && (
                  <Box mt={1}>
                    <Typography><b>Other details</b></Typography>
                    <Typography variant="body2">{JSON.stringify(selectedParticipant.fields)}</Typography>
                  </Box>
                )}
              </Box>
            ) : (
              <Typography>No participant selected.</Typography>
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
}
