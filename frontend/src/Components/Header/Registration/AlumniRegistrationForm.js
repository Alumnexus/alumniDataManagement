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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { backendAPI } from "../../middleware";
import { CircularProgress } from "@mui/material";

const AlumniRegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // 1️⃣ Basic validation
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

    // 2️⃣ Prepare payload (exclude confirmPassword)
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
      password: formData.password
    };

    // 3️⃣ API call
    const res = await axios.post(`${api}/api/alumni/register`, payload, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    // 4️⃣ Success handling
    alert("Registration successful! Please verify your email.");

    console.log("Server Response:", res.data);
    localStorage.setItem("token", res.data.token);

    // Save user info (optional)
    localStorage.setItem("user", JSON.stringify(res.data.user));

    // Optional: reset form
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
      confirmPassword: ""
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error.response) {
      alert(error.response.data.message || "Registration failed");
    } else {
      alert("Server not reachable. Please try again later.");
    }
  }finally {
      setIsSubmitting(false); // Stop loading
    }
};


  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        padding: 3,
        borderRadius: 2,
        overflow: "auto",
      }}
    >
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
            fullWidth
            required
          />
          <TextField
            label="Email ID"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Degree"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Graduation Year"
            name="graduationYear"
            value={formData.graduationYear}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Current Job"
            name="currentJob"
            value={formData.currentJob}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Title (of job)"
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
            label="Is Mentor?"
          />
          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* CAPTCHA */}
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={handleCaptchaChange}
          />

          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained" color="success">
              Sign Up
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default AlumniRegistrationForm;