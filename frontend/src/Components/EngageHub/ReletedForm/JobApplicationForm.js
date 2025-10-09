import React, { useState } from 'react';
import {
  Container, Box, Typography, TextField, Button,
  FormControl, FormLabel
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function JobApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    yearsOfExperience: '',
    previousJobTitle: '',
    previousCompany: '',
    portfolioUrl: '',
    coverLetter: '',
    resume: null,
  });
  
  // --- Handlers for Form Inputs ---
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };
  
  const handleFileChange = (event) => {
    setFormData(prevState => ({ ...prevState, resume: event.target.files[0] }));
  };

  // --- Form Submission ---
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Job Application Submitted:', formData);
    alert('Job application submitted successfully! Check the console.');
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{
          mt: 4, mb: 4, p: 3, boxShadow: 3, borderRadius: 2,
          display: 'flex', flexDirection: 'column', gap: 2.5,
      }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Job Application
        </Typography>

        {/* --- Personal & Contact Info --- */}
        <TextField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required fullWidth />
        <TextField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required fullWidth />
        <TextField label="Phone Number" type="tel" name="phone" value={formData.phone} onChange={handleChange} required fullWidth />

        {/* --- Professional Experience --- */}
        <TextField label="Years of Experience" name="yearsOfExperience" type="number" value={formData.yearsOfExperience} onChange={handleChange} required fullWidth InputProps={{ inputProps: { min: 0 } }} />
        <TextField label="Current or Previous Job Title" name="previousJobTitle" value={formData.previousJobTitle} onChange={handleChange} fullWidth />
        <TextField label="Current or Previous Company" name="previousCompany" value={formData.previousCompany} onChange={handleChange} fullWidth />
        <TextField label="Portfolio or LinkedIn URL" name="portfolioUrl" type="url" value={formData.portfolioUrl} onChange={handleChange} fullWidth />

        {/* --- Cover Letter --- */}
        <TextField
            label="Cover Letter" name="coverLetter" value={formData.coverLetter} onChange={handleChange}
            multiline rows={4} required fullWidth
        />

        {/* --- Resume Upload --- */}
        <FormControl required>
            <FormLabel sx={{ mb: 1, display: 'block' }}>Upload Resume</FormLabel>
            <Box>
                <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />}>
                    Choose File
                    <input type="file" hidden onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                </Button>
                {formData.resume && <Typography variant="body2" sx={{ display: 'inline', ml: 2 }}>{formData.resume.name}</Typography>}
            </Box>
        </FormControl>
        
        <Button type="submit" variant="contained" color="primary" size="large" sx={{ marginTop: 2 }}>
          Submit Application
        </Button>
      </Box>
    </Container>
  );
}