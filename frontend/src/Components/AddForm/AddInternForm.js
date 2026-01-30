import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TitleIcon from "@mui/icons-material/Title";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const initialState = {
  title: "",
  company: "",
  description: "",
  skills: "",
  location: "",
  stipend: "",
  duration: "",
};

export default function AddInternForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Internship title is required.";
    if (!formData.company.trim()) newErrors.company = "Company name is required.";
    if (!formData.skills.trim()) newErrors.skills = "Skills are required.";
    if (!formData.description.trim()) newErrors.description = "Job description is required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    console.log("Submitting Internship Data:", formData);

    // Backend call will go here later
    // axios.post("/api/internships", formData)

    navigate("/internships", {
      state: { successMessage: "Internship posted successfully!" },
    });
  };

  const handleCancel = () => {
    setFormData(initialState);
    setErrors({});
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#f4f6f8",
        p: 3,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          maxWidth: 700,
          width: "100%",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
            color: "#fff",
            p: 3,
          }}
        >
          <IconButton
            onClick={() => navigate("/internships")}
            sx={{
              color: "white",
              backgroundColor: "rgba(255,255,255,0.15)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          <WorkIcon sx={{ fontSize: 32 }} />
          <Typography variant="h5" fontWeight="bold">
            Post a New Internship
          </Typography>
        </Box>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }} noValidate>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Fields marked with * are required.
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Internship Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={!!errors.title}
                helperText={errors.title}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TitleIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Company Name"
                name="company"
                value={formData.company}
                onChange={handleChange}
                error={!!errors.company}
                helperText={errors.company}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Required Skills"
                name="skills"
                placeholder="e.g., React, Node.js, MongoDB"
                value={formData.skills}
                onChange={handleChange}
                error={!!errors.skills}
                helperText={errors.skills}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Stipend"
                name="stipend"
                value={formData.stipend}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ScheduleIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                label="Job Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>
          </Grid>

          {/* Actions */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Post Internship
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
