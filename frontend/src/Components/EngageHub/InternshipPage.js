import React, { useState, useEffect } from "react";
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
  Stack,
  Snackbar,
  Alert,
  Popover,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendAPI } from "../middleware.js";

const skillCategories = ["All", "Web Dev", "ML", "Software Eng."];

export default function InternshipsPage() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("All");
  const navigate = useNavigate();
  const location = useLocation();
  const [internships, setInternship] = useState([]);

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Popover state
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [popoverInternship, setPopoverInternship] = useState(null);

  useEffect(() => {
    if (location.state?.successMessage) {
      setSnackbarMessage(location.state.successMessage);
      setOpenSnackbar(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  const findinternData = async () => {
    try {
      const api = backendAPI();
      const res = await axios.get(`${api}/get/intern/data`);
      setInternship(res.data.data);
    } catch (err) {
      console.log("Some error happened", err);
    }
  };

  useEffect(() => {
    findinternData();
  }, [location.state]);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleFilterSelect = (skill) => {
    setCurrentFilter(skill);
    handleMenuClose();
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  const handleAddInternship = () => navigate("/add-Internship");

  const filteredInternships = internships.filter((internship) => {
    if (currentFilter === "All") return true;
    return internship.skills === currentFilter;
  });

  // Popover handlers
  const handlePopoverOpen = (event, internship) => {
    setPopoverAnchor(event.currentTarget);
    setPopoverInternship(internship);
  };
  const handlePopoverClose = () => {
    setPopoverAnchor(null);
    setPopoverInternship(null);
  };
  const open = Boolean(popoverAnchor);

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* HEADER */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4, flexWrap: "wrap", gap: 2 }}>
        <Typography variant="h3" sx={{ color: "#43A047", fontWeight: "bold", flexGrow: 1 }}>
          Internship Opportunities
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton aria-label="filter internships" onClick={handleMenuOpen} sx={{ border: "1px solid #ddd" }}>
            <FilterListIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            {skillCategories.map((skill) => (
              <MenuItem key={skill} selected={skill === currentFilter} onClick={() => handleFilterSelect(skill)}>
                {skill}
              </MenuItem>
            ))}
          </Menu>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "#43A047",
              "&:hover": { backgroundColor: "#388E3C" },
              textTransform: "none",
              fontWeight: "bold",
              py: 1,
              px: 2,
            }}
            onClick={handleAddInternship}
          >
            Add Internship
          </Button>
        </Stack>
      </Box>

      {/* INTERNSHIP CARDS GRID */}
      <Grid container spacing={4} justifyContent="center">
        {filteredInternships.map((internship, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                background: "white",
                borderRadius: 3,
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": { transform: "scale(1.05)", boxShadow: "0 8px 25px rgba(0,0,0,0.2)" },
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <CardContent sx={{ textAlign: "center", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, flexGrow: 1 }}>
                  {internship.title}
                </Typography>
                <Typography sx={{ mb: 1, color: "#555" }}>{internship.company}</Typography>
                <Typography sx={{ mb: 1, color: "#777" }}>Duration: {internship.duration}</Typography>
                <Typography sx={{ mb: 2, color: "#777" }}>Location: {internship.location}</Typography>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#43A047", "&:hover": { backgroundColor: "#66BB6A" }, mt: "auto" }}
                  onClick={() => navigate(`/apply/${internship.id}`)}
                  onMouseEnter={(e) => handlePopoverOpen(e, internship)}
                  onMouseLeave={handlePopoverClose}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* POPUP FOR INTERNSHIP DETAILS */}
      <Popover
        open={open}
        anchorEl={popoverAnchor}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "bottom", horizontal: "left" }}
        disableRestoreFocus
        sx={{ pointerEvents: "none" }}
        PaperProps={{ sx: { p: 2, maxWidth: 300 } }}
      >
        {popoverInternship && (
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              {popoverInternship.title}
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>Company: {popoverInternship.company}</Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>Duration: {popoverInternship.duration}</Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>Location: {popoverInternship.location}</Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>Skills: {popoverInternship.skills}</Typography>
            {popoverInternship.description && (
              <Typography variant="body2">Description: {popoverInternship.description}</Typography>
            )}
          </Box>
        )}
      </Popover>

      {/* SNACKBAR */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" variant="filled" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
