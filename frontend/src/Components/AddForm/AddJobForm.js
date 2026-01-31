import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Paper,
  IconButton,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WorkIcon from "@mui/icons-material/Work";
import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendAPI } from "../middleware.js";

const initialState = {
  title: "",
  company: "",
  location: "",
  salary: "",
  type: "",
  skill: "",
  availablePosts: "",
  description: "",
};

export default function AddJobForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Job title is required.";
    if (!formData.company.trim()) newErrors.company = "Company name is required.";
    if (!formData.location.trim()) newErrors.location = "Location is required.";
    if (!formData.type) newErrors.type = "Job type is required.";
    if (!formData.skill.trim()) newErrors.skill = "Skills are required.";
    if (!formData.availablePosts) newErrors.availablePosts = "Available posts required.";
    if (!formData.description.trim()) newErrors.description = "Job description is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const api = backendAPI();
      const response = await axios.post(`${api}/api/jobs`, formData);

      if (response.data.success) {
        navigate("/jobs", {
          state: { successMessage: "Job posted successfully!" },
        });
      }
    } catch (err) {
      console.error("Submission error", err);
      alert(err.response?.data?.error || "An error occurred while posting the job.");
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f5f7fa", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="md">
        <Paper elevation={6} sx={{ borderRadius: 3, overflow: "hidden" }}>
          {/* HEADER */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              py: 2.5,
              px: 3,
              background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
              color: "white",
            }}
          >
            <IconButton
              onClick={() => navigate("/jobs")}
              sx={{
                color: "white",
                backgroundColor: "rgba(255,255,255,0.15)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
              }}
            >
              <ArrowBackIcon />
            </IconButton>

            <BusinessCenterIcon sx={{ fontSize: 32 }} />
            <Typography variant="h5" fontWeight="bold">
              Post a New Job
            </Typography>
          </Box>

          {/* FORM */}
          <Box component="form" onSubmit={handleSubmit} sx={{ px: 4, py: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Job Title *"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Company Name *"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.company}
                  helperText={errors.company}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CorporateFareIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Location *"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.location}
                  helperText={errors.location}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Job Type *"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.type}
                  helperText={errors.type}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CategoryIcon />
                      </InputAdornment>
                    ),
                  }}
                >
                  {["Full-Time", "Part-Time", "Internship", "Contract"].map(
                    (option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    )
                  )}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Available Posts *"
                  name="availablePosts"
                  type="number"
                  value={formData.availablePosts}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.availablePosts}
                  helperText={errors.availablePosts}
                  InputProps={{
                    inputProps: { min: 1 },
                    startAdornment: (
                      <InputAdornment position="start">
                        <GroupIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Required Skills *"
                  name="skill"
                  value={formData.skill}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.skill}
                  helperText={errors.skill}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <WorkIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Job Description *"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  fullWidth
                  error={!!errors.description}
                  helperText={errors.description}
                />
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
              <Button variant="outlined" onClick={() => navigate("/jobs")}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Post Job
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
