import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  IconButton
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

export default function InternApplicationForm() {
  const navigate = useNavigate(); // ✅ define navigate here

  // State to hold form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    passingYear: '',
    course: '',
    internshipExperience: '',
    ugCgpa: '',
    resume: null
  });

  // Handle text, select, radio changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload
  const handleFileChange = (event) => {
    setFormData((prev) => ({ ...prev, resume: event.target.files[0] }));
  };

  // Handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const submissionData = new FormData();
    Object.keys(formData).forEach((key) => submissionData.append(key, formData[key]));
    console.log('Form Data Submitted:', formData);
    alert('Application submitted successfully! Check the console for the data.');
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear + 3 - i);
  const courses = ['B.Tech', 'BE', 'M.Tech', 'ME', 'BCA', 'MCA', 'BSc', 'MSc'];

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 4, mb: 4, p: 3, boxShadow: 3, borderRadius: 2,
          display: 'flex', flexDirection: 'column', gap: 2.5,
        }}
      >
        {/* 🔙 Back Arrow */}
        <IconButton
          onClick={() => navigate("/internships")}
          sx={{
            alignSelf: 'flex-start',
            color: 'primary.main',
            backgroundColor: 'rgba(0,0,0,0.05)',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.1)' },
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h4" component="h1" gutterBottom align="center">
          Internship Application
        </Typography>

        {/* Personal & Academic Details */}
        <TextField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required fullWidth />
        <TextField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required fullWidth />
        <TextField label="Phone Number" type="tel" name="phone" value={formData.phone} onChange={handleChange} required fullWidth />

        <FormControl fullWidth required>
          <InputLabel id="passing-year-select-label">Passing Year</InputLabel>
          <Select
            labelId="passing-year-select-label"
            name="passingYear"
            value={formData.passingYear}
            label="Passing Year"
            onChange={handleChange}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth required>
          <InputLabel id="course-select-label">Course</InputLabel>
          <Select
            labelId="course-select-label"
            name="course"
            value={formData.course}
            label="Course"
            onChange={handleChange}
          >
            {courses.map((course) => (
              <MenuItem key={course} value={course}>{course}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="UG CGPA (On a scale of 10)"
          name="ugCgpa"
          type="number"
          value={formData.ugCgpa}
          onChange={handleChange}
          required
          fullWidth
          InputProps={{ inputProps: { min: 0, max: 10, step: "0.01" } }}
        />

        {/* Experience Section */}
        <FormControl required>
          <FormLabel>Is this your first time applying for an internship?</FormLabel>
          <RadioGroup row name="internshipExperience" value={formData.internshipExperience} onChange={handleChange}>
            <FormControlLabel value="Yes" control={<Radio />} label="Yes, first time" />
            <FormControlLabel value="No" control={<Radio />} label="No, I have prior experience" />
          </RadioGroup>
        </FormControl>

        {/* Resume Upload */}
        <Box sx={{ border: '1px dashed grey', p: 2, borderRadius: 1 }}>
          <FormLabel sx={{ mb: 1, display: 'block' }}>Upload Your Resume</FormLabel>
          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
          >
            Choose File
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              required
            />
          </Button>
          {formData.resume && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected: {formData.resume.name}
            </Typography>
          )}
        </Box>

        <Button type="submit" variant="contained" color="primary" size="large" sx={{ marginTop: 2 }}>
          Submit Application
        </Button>
      </Box>
    </Container>
  );
}
