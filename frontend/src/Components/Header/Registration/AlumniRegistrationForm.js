import React, { useState } from "react";
import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Stack,
  IconButton,
  InputAdornment,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { backendAPI } from "../../middleware";

/* 🔽 Dropdown Options */
const degreeOptions = [
  "B.Tech",
  "B.E",
  "B.Sc",
  "BCA",
  "M.Tech",
  "M.E",
  "M.Sc",
  "MCA",
  "MBA",
  "PhD",
];

const departmentOptions = [
  "Computer Science",
  "Information Technology",
  "Electronics",
  "Electrical",
  "Mechanical",
  "Civil",
  "Chemical",
  "Biotechnology",
  "Mathematics",
  "Physics",
  "Management",
];

const AlumniRegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    degree: "",
    department: "",
    graduationYear: "",
    currentJob: "",
    title: "",
    company: "",
    linkedIn: "",
    isMentor: false,
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaVerified) {
      alert("Please verify the CAPTCHA.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const api = backendAPI();

      const payload = {
        username: formData.username,
        email: formData.email,
        degree: formData.degree,
        department: formData.department,
        graduationYear: formData.graduationYear,
        currentJob: formData.currentJob,
        title: formData.title,
        company: formData.company,
        linkedIn: formData.linkedIn,
        isMentor: formData.isMentor,
        password: formData.password,
      };

      const res = await axios.post(`${api}/api/alumni/register`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Registration successful! Please verify your email.");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setFormData({
        username: "",
        email: "",
        degree: "",
        department: "",
        graduationYear: "",
        currentJob: "",
        title: "",
        company: "",
        linkedIn: "",
        isMentor: false,
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Registration failed");
      } else {
        alert("Server not reachable. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ border: "1px solid #ccc", p: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Alumni Registration
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Stack spacing={2}>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="Email ID"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
          />

          {/* DEGREE DROPDOWN */}
          <TextField
            select
            label="Degree"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            required
            fullWidth
          >
            {degreeOptions.map((degree) => (
              <MenuItem key={degree} value={degree}>
                {degree}
              </MenuItem>
            ))}
          </TextField>

          {/* DEPARTMENT DROPDOWN */}
          <TextField
            select
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            fullWidth
          >
            {departmentOptions.map((dept) => (
              <MenuItem key={dept} value={dept}>
                {dept}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Graduation Year"
            name="graduationYear"
            value={formData.graduationYear}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="Current Job"
            name="currentJob"
            value={formData.currentJob}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="LinkedIn"
            name="linkedIn"
            value={formData.linkedIn}
            onChange={handleChange}
            fullWidth
          />

          <FormControlLabel
            control={
              <Checkbox
                name="isMentor"
                checked={formData.isMentor}
                onChange={handleChange}
              />
            }
            label="Available as Mentor"
          />

          {/* PASSWORD */}
          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* CONFIRM PASSWORD */}
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={handleCaptchaChange}
          />

          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : "Sign Up"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default AlumniRegistrationForm;
