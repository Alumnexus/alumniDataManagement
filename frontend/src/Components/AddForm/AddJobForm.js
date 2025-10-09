import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Paper,
} from '@mui/material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from "react-router-dom";

export default function AddJobForm() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    location: '',
    salary: '',
    duration: '',
    availablePosts: '',
    jobDescription: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/jobs');
  };

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            backgroundColor: 'white',
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              py: 2.5,
              px: 3,
              background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
              color: 'white',
            }}
          >
            <BusinessCenterIcon sx={{ fontSize: 32 }} />
            <Typography variant="h5" fontWeight="bold">
              Post a New Job
            </Typography>
          </Box>

          {/* FORM */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ px: 4, py: 4, backgroundColor: 'white' }}
          >
            <Typography
              variant="subtitle1"
              sx={{ mb: 3, color: 'text.secondary' }}
            >
              Please fill in all the required details (*).
            </Typography>

            <Grid container spacing={3}>
              {/* Row 1 */}
              <Grid item xs={12} sm={6}>
                <TextField
                  name="jobTitle"
                  label="Job Title *"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="companyName"
                  label="Company Name *"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CorporateFareIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Row 2 */}
              <Grid item xs={12} sm={6}>
                <TextField
                  name="location"
                  label="Location"
                  placeholder="e.g., Remote, New York"
                  value={formData.location}
                  onChange={handleChange}
                  fullWidth
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
                  name="salary"
                  label="Salary"
                  placeholder="e.g., ₹10,00,000/year"
                  value={formData.salary}
                  onChange={handleChange}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Row 3 */}
              <Grid item xs={12} sm={6}>
                <TextField
                  name="duration"
                  label="Job Type / Duration"
                  placeholder="e.g., Full-Time, 6-Month Contract"
                  value={formData.duration}
                  onChange={handleChange}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ScheduleIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="availablePosts"
                  label="Number of Available Posts *"
                  type="number"
                  value={formData.availablePosts}
                  onChange={handleChange}
                  required
                  fullWidth
                  InputProps={{
                    inputProps: { min: 1 },
                    startAdornment: (
                      <InputAdornment position="start">
                        <GroupIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Row 4 - Single full width */}
              <Grid item xs={12}>
                <TextField
                  name="jobDescription"
                  label="Job Description *"
                  value={formData.jobDescription}
                  onChange={handleChange}
                  required
                  multiline
                  rows={5}
                  fullWidth
                />
              </Grid>
            </Grid>

            {/* BUTTONS */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
                mt: 4,
              }}
            >
              <Button
                variant="outlined"
                color="secondary"
                sx={{
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  background: 'linear-gradient(90deg, #1976d2, #1565c0)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #1565c0, #0d47a1)',
                  },
                }}
              >
                Post Job
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
