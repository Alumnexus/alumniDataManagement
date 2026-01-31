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
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("All");
  const [internships, setInternship] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null); // store current user id

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [popoverInternship, setPopoverInternship] = useState(null);

  /* ================= ROLE CHECK ================= */
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserRole(user.role);
      setUserId(user._id); // save logged-in user's id
    }
  }, []);

  /* ================= SUCCESS MESSAGE ================= */
  useEffect(() => {
    if (location.state?.successMessage) {
      setSnackbarMessage(location.state.successMessage);
      setOpenSnackbar(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  /* ================= FETCH DATA ================= */
  const findinternData = async () => {
    try {
      const api = backendAPI();
      const res = await axios.get(`${api}/get/intern/data`);
      setInternship(res.data.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    findinternData();
  }, []);

  /* ================= HANDLERS ================= */
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleFilterSelect = (skill) => {
    setCurrentFilter(skill);
    handleMenuClose();
  };

  const handleAddInternship = () => navigate("/add-Internship");

  const handlePopoverOpen = (event, internship) => {
    setPopoverAnchor(event.currentTarget);
    setPopoverInternship(internship);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
    setPopoverInternship(null);
  };

  const filteredInternships = internships.filter((internship) => {
    if (currentFilter === "All") return true;
    return internship.skills
      ?.toLowerCase()
      .includes(currentFilter.toLowerCase());
  });

  /* ================= UI ================= */
  return (
    <Box
      sx={{
        px: { xs: 2, md: 6 },
        py: 6,
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4, gap: 2 }}>
        <Typography
          variant="h3"
          sx={{ color: "#43A047", fontWeight: "bold", flexGrow: 1 }}
        >
          Internship Opportunities
        </Typography>

        <Stack direction="row" spacing={1}>
          <IconButton onClick={handleMenuOpen} sx={{ border: "1px solid #ddd" }}>
            <FilterListIcon />
          </IconButton>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            {skillCategories.map((skill) => (
              <MenuItem
                key={skill}
                selected={skill === currentFilter}
                onClick={() => handleFilterSelect(skill)}
              >
                {skill}
              </MenuItem>
            ))}
          </Menu>

          {userRole === "alumni" && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ backgroundColor: "#43A047", fontWeight: "bold" }}
              onClick={handleAddInternship}
            >
              Add Internship
            </Button>
          )}
        </Stack>
      </Box>

      {/* CARDS */}
      <Grid container spacing={4}>
        {filteredInternships.length > 0 ? (
          filteredInternships.map((internship) => (
            <Grid item xs={12} sm={6} md={4} key={internship._id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  transition: "0.3s",
                  "&:hover": { transform: "translateY(-5px)" },
                }}
              >
                <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="h6" fontWeight="bold">
                    {internship.title}
                  </Typography>

                  <Typography color="text.secondary">
                    {internship.company}
                  </Typography>

                  <Typography variant="body2">
                    Duration: {internship.duration}
                  </Typography>

                  <Typography variant="body2">
                    Location: {internship.location}
                  </Typography>

                  {/* STUDENT BUTTON */}
                  {userRole === "student" && (
                    <Button
                      variant="contained"
                      sx={{ mt: 2, backgroundColor: "#43A047", fontWeight: "bold" }}
                      onClick={() => navigate(`/apply/${internship._id}`)}
                      onMouseEnter={(e) => handlePopoverOpen(e, internship)}
                      onMouseLeave={handlePopoverClose}
                    >
                      Apply Now
                    </Button>
                  )}

                  {/* ALUMNI WHO CREATED THIS INTERNSHIP */}
                  {userRole === "alumni" && internship.createdBy === userId && (
                    <Button
                      variant="outlined"
                      sx={{ mt: 2, borderColor: "#1E88E5", color: "#1E88E5", fontWeight: "bold" }}
                      onClick={() =>
                        navigate(`/internship/${internship._id}/participants`)
                      }
                      onMouseEnter={(e) => handlePopoverOpen(e, internship)}
                      onMouseLeave={handlePopoverClose}
                    >
                      View Participant Details
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No internships found.</Typography>
        )}
      </Grid>

      {/* POPOVER */}
      <Popover
        open={Boolean(popoverAnchor)}
        anchorEl={popoverAnchor}
        onClose={handlePopoverClose}
        disableRestoreFocus
        sx={{ pointerEvents: "none" }}
      >
        {popoverInternship && (
          <Box sx={{ p: 2, maxWidth: 300 }}>
            <Typography fontWeight="bold">{popoverInternship.title}</Typography>
            <Typography variant="body2">
              <b>Company:</b> {popoverInternship.company}
            </Typography>
            <Typography variant="body2">
              <b>Skills:</b> {popoverInternship.skills}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {popoverInternship.description}
            </Typography>
          </Box>
        )}
      </Popover>

      {/* SNACKBAR */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
