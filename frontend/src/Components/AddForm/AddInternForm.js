import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  InputAdornment,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TitleIcon from "@mui/icons-material/Title";
import { useNavigate } from "react-router-dom";

// Initial form state
const initialState = {
  title: "",
  company: "",
  description: "",
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
    if (!formData.description.trim()) newErrors.description = "Job description is required.";
    return newErrors;
  };

  const handleSubmit = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    console.log("Submitting Internship Data:", formData);
    
    // **KEY CHANGE**: Navigate with a success message in the state
    navigate("/internships", { 
      state: { successMessage: "Internship posted successfully!" } 
    });
  };

  const handleCancel = () => {
    setFormData(initialState);
    setErrors({});
    // Optionally navigate back if needed
    // navigate(-1); 
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
          p: 0,
          maxWidth: 700,
          width: "100%",
          borderRadius: 4,
          overflow: "hidden",
          bgcolor: "#fff",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0 16px 40px rgba(0,0,0,0.15)",
          },
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
            textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
          }}
        >
          <WorkIcon sx={{ fontSize: 32 }} />
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Post a New Internship
          </Typography>
        </Box>

        {/* Form Content */}
        <Box component="form" sx={{ p: 4 }} noValidate autoComplete="off">
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Fill out the details below. Fields marked with an asterisk (*) are required.
          </Typography>
          <Grid container spacing={3}>
            {/* All TextFields remain the same */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Internship Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                variant="outlined"
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
                variant="outlined"
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                placeholder="e.g., Remote, New York"
                value={formData.location}
                onChange={handleChange}
                variant="outlined"
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
                placeholder="e.g., $1000/month"
                value={formData.stipend}
                onChange={handleChange}
                variant="outlined"
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
                placeholder="e.g., 3 Months"
                value={formData.duration}
                onChange={handleChange}
                variant="outlined"
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
                variant="outlined"
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>
          </Grid>

          {/* Buttons */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
            <Button
              onClick={handleCancel}
              variant="outlined"
              color="secondary"
              sx={{ textTransform: "none", fontWeight: "bold", px: 3, py: 1.2, borderRadius: 2 }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{ textTransform: "none", fontWeight: "bold", px: 4, py: 1.2, borderRadius: 2, bgcolor: "#1976d2", "&:hover": { bgcolor: "#115293" }}}
            >
              Post Internship
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
