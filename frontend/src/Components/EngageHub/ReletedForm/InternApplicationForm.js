import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  InputAdornment,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// In a real app, you would fetch this data from an API.
// For now, we'll redefine it here to find the selected internship.
// **IMPORTANT**: Added a unique `id` to each internship.
const internships = [
  { id: 1, title: "Software Development Intern", company: "TechCorp Solutions", duration: "3 Months", location: "Remote", skill: "Web Dev" },
  { id: 2, title: "Machine Learning Intern", company: "AI Innovators", duration: "6 Months", location: "On-site", skill: "ML" },
  { id: 3, title: "Data Analyst Intern", company: "DataWorks", duration: "4 Months", location: "Remote", skill: "Data Science" },
  { id: 4, title: "Frontend Developer Intern", company: "WebFlow Inc.", duration: "3 Months", location: "On-site", skill: "Web Dev" },
  { id: 5, title: "AI Research Intern", company: "Future AI", duration: "6 Months", location: "Remote", skill: "ML" },
  { id: 6, title: "Business Intelligence Intern", company: "DataWorks", duration: "4 Months", location: "On-site", skill: "Data Science" },
];

export default function InternApplicationForm() {
  const { internshipId } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  const [internship, setInternship] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Find the internship using the ID from the URL parameters
    const selectedInternship = internships.find(i => i.id.toString() === internshipId);
    if (selectedInternship) {
      setInternship(selectedInternship);
    } else {
      // Optional: Handle case where internship is not found
      navigate('/404'); // Redirect to a not-found page
    }
  }, [internshipId, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setResume(e.target.files[0]);
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Full name is required.";
    if (!formData.email) tempErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is not valid.";
    if (!resume) tempErrors.resume = "A resume is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        console.log("Form Data:", formData);
        console.log("Resume:", resume);
        setOpenSnackbar(true);
        // Navigate back after a short delay
        setTimeout(() => {
          navigate('/internships', { state: { successMessage: `Your application for ${internship.title} was submitted!` } });
        }, 2000);
      }, 2000);
    }
  };
  
  if (!internship) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', p: { xs: 2, md: 4 } }}>
      <Paper 
        component="form"
        onSubmit={handleSubmit}
        sx={{ 
          maxWidth: 700, 
          mx: 'auto', 
          p: { xs: 2, sm: 4 }, 
          borderRadius: 4,
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#43A047', mb: 1 }}>
          Apply for {internship.title}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          at {internship.company}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField fullWidth required label="Full Name" name="name" value={formData.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} InputProps={{startAdornment: (<InputAdornment position="start"><PersonIcon /></InputAdornment>)}} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth required label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} InputProps={{startAdornment: (<InputAdornment position="start"><EmailIcon /></InputAdornment>)}} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} InputProps={{startAdornment: (<InputAdornment position="start"><PhoneIcon /></InputAdornment>)}} />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept=".pdf,.doc,.docx"
            />
            <Button
              variant="outlined"
              onClick={() => fileInputRef.current.click()}
              startIcon={<CloudUploadIcon />}
              fullWidth
              sx={{ py: 1.5, textTransform: 'none' }}
            >
              Upload Resume*
            </Button>
            {resume && <Typography sx={{ mt: 1, textAlign: 'center' }}>{resume.name}</Typography>}
            {errors.resume && <Typography color="error" variant="caption" sx={{ mt: 1, textAlign: 'center', display: 'block' }}>{errors.resume}</Typography>}
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, position: 'relative' }}>
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            disabled={loading}
            sx={{ 
              py: 1.5, 
              fontWeight: 'bold', 
              backgroundColor: "#43A047", 
              "&:hover": { backgroundColor: "#388E3C" } 
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Application'}
          </Button>
        </Box>
      </Paper>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
          Application Submitted Successfully! Redirecting...
        </Alert>
      </Snackbar>
    </Box>
  );
}
