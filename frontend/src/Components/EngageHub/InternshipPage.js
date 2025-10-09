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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useLocation, useNavigate } from "react-router-dom";

const internships = [
  { 
    id: 1, 
    title: "Software Development Intern", 
    company: "TechCorp Solutions", 
    duration: "3 Months", 
    location: "Remote", 
    skill: "Web Dev" 
  },
  { 
    id: 2, 
    title: "Machine Learning Intern", 
    company: "AI Innovators", 
    duration: "6 Months", 
    location: "On-site", 
    skill: "ML" 
  },
  { 
    id: 3, 
    title: "Data Analyst Intern", 
    company: "DataWorks", 
    duration: "4 Months", 
    location: "Remote", 
    skill: "Data Science" 
  },
  { 
    id: 4, 
    title: "Frontend Developer Intern", 
    company: "WebFlow Inc.", 
    duration: "3 Months", 
    location: "On-site", 
    skill: "Web Dev" 
  },
  { 
    id: 5, 
    title: "AI Research Intern", 
    company: "Future AI", 
    duration: "6 Months", 
    location: "Remote", 
    skill: "ML" 
  },
  { 
    id: 6, 
    title: "Business Intelligence Intern", 
    company: "DataWorks", 
    duration: "4 Months", 
    location: "On-site", 
    skill: "Data Science" 
  },
];


const skillCategories = ["All", "Web Dev", "ML", "Data Science"];

export default function InternshipsPage() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("All");
  const navigate = useNavigate();
  const location = useLocation();

  // --- MERGED LOGIC: State for the success snackbar ---
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // --- MERGED LOGIC: Check for the success message on component load ---
  useEffect(() => {
    if (location.state?.successMessage) {
      setSnackbarMessage(location.state.successMessage);
      setOpenSnackbar(true);
      // Clear the state from history so the message doesn't reappear
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);


  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (skill) => {
    setCurrentFilter(skill);
    handleMenuClose();
  };
  
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleAddInternship = () => navigate("/add-Internship");

  const filteredInternships = internships.filter((internship) => {
    if (currentFilter === "All") {
      return true;
    }
    return internship.skill === currentFilter;
  });

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* --- HEADER --- */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "#43A047",
            fontWeight: "bold",
            flexGrow: 1,
          }}
        >
          Internship Opportunities
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton
            aria-label="filter internships"
            onClick={handleMenuOpen}
            sx={{ border: "1px solid #ddd" }}
          >
            <FilterListIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
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

      {/* --- INTERNSHIP CARDS GRID --- */}
      <Grid container spacing={4} justifyContent="center">
        {filteredInternships.map((internship, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                background: "white",
                borderRadius: 3,
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                },
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <CardContent sx={{ textAlign: "center", flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, flexGrow: 1 }}>
                  {internship.title}
                </Typography>
                <Typography sx={{ mb: 1, color: "#555" }}>{internship.company}</Typography>
                <Typography sx={{ mb: 1, color: "#777" }}>
                  Duration: {internship.duration}
                </Typography>
                <Typography sx={{ mb: 2, color: "#777" }}>
                  Location: {internship.location}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#43A047", "&:hover": { backgroundColor: "#66BB6A" }, mt: "auto" }}
                  onClick={() => navigate(`/apply/${internship.id}`)}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* --- UPDATED SNACKBAR: Positioned at the top --- */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          variant="filled" 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

