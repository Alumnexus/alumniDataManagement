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
  FormLabel
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Import the icon

export default function InternApplicationForm() {
  // State to hold and manage the form's data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    passingYear: '',
    course: '',
    internshipExperience: '',
    ugCgpa: '',
    resume: null // New state for the resume file
  });

  // Handler for text inputs, selects, and radios
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  // A separate handler specifically for the file input
  const handleFileChange = (event) => {
    setFormData(prevState => ({
      ...prevState,
      resume: event.target.files[0] // Get the first file
    }));
  };

  // The function that runs when the form is submitted
  const handleSubmit = (event) => {
    event.preventDefault();
    // IMPORTANT: For file uploads, you typically use the FormData API
    // to send the data to your server.
    const submissionData = new FormData();
    Object.keys(formData).forEach(key => {
        submissionData.append(key, formData[key]);
    });
    
    // You would now send `submissionData` to your API endpoint.
    // For this example, we'll just log the original state to the console.
    console.log('Form Data Submitted:', formData);
    // You can also inspect the FormData object:
    // for (let [key, value] of submissionData.entries()) { 
    //   console.log(key, value);
    // }
    alert('Application submitted successfully! Check the console for the data.');
  };

  // --- Omitted for brevity: years and courses arrays are the same ---
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
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Internship Application
        </Typography>

        {/* --- Personal & Academic Details --- */}
        <TextField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required fullWidth />
        <TextField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required fullWidth />
        <TextField label="Phone Number" type="tel" name="phone" value={formData.phone} onChange={handleChange} required fullWidth />
        <FormControl fullWidth required>
          <InputLabel id="passing-year-select-label">Passing Year</InputLabel>
          <Select labelId="passing-year-select-label" name="passingYear" value={formData.passingYear} label="Passing Year" onChange={handleChange}>
            {years.map((year) => <MenuItem key={year} value={year}>{year}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl fullWidth required>
          <InputLabel id="course-select-label">Course</InputLabel>
          <Select labelId="course-select-label" name="course" value={formData.course} label="Course" onChange={handleChange}>
            {courses.map((course) => <MenuItem key={course} value={course}>{course}</MenuItem>)}
          </Select>
        </FormControl>
        <TextField label="UG CGPA (On a scale of 10)" name="ugCgpa" type="number" value={formData.ugCgpa} onChange={handleChange} required fullWidth InputProps={{ inputProps: { min: 0, max: 10, step: "0.01" } }} />

        {/* --- Experience Section --- */}
        <FormControl required>
            <FormLabel id="internship-experience-radio-group-label">Is this your first time applying for an internship?</FormLabel>
            <RadioGroup row name="internshipExperience" value={formData.internshipExperience} onChange={handleChange}>
                <FormControlLabel value="Yes" control={<Radio />} label="Yes, first time" />
                <FormControlLabel value="No" control={<Radio />} label="No, I have prior experience" />
            </RadioGroup>
        </FormControl>

        {/* NEW: Resume Upload Field */}
        <Box sx={{ border: '1px dashed grey', p: 2, borderRadius: 1 }}>
            <FormLabel sx={{ mb: 1, display: 'block' }}>Upload Your Resume</FormLabel>
            <Button
                component="label" // Makes the button act as a label for the hidden input
                variant="outlined"
                startIcon={<CloudUploadIcon />}
            >
                Choose File
                <input
                    type="file"
                    hidden
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx" // Specify accepted file types
                    required
                />
            </Button>
            {/* Display the selected file name */}
            {formData.resume && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected: {formData.resume.name}
                </Typography>
            )}
        </Box>
        
        {/* --- Submit Button --- */}
        <Button type="submit" variant="contained" color="primary" size="large" sx={{ marginTop: 2 }}>
          Submit Application
        </Button>
      </Box>
    </Container>
  );
}