import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar, // Added
  Alert,    // Added
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendAPI } from "../../middleware.js";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/;

const AdminRegistrationForm = () => {
  const navigate = useNavigate();
  
  // --- Alert State ---
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "error", // can be "error", "warning", "info", "success"
  });

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    permission: "Faculty",
    collegeDeptName: "",
    collegeCode: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [errors, setErrors] = useState({});

  // --- Alert Close Handler ---
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setAlert({ ...alert, open: false });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: passwordRegex.test(value)   
          ? ""
          : "Password must be 6+ chars with 1 uppercase, 1 lowercase & 1 special character",
      }));
    }

    if (name === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: value !== formData.password ? "Passwords do not match" : "",
      }));
    }
  };

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaVerified) {
      setAlert({ open: true, message: "Please verify the CAPTCHA.", severity: "warning" });
      return;
    }

    try {
      const api = backendAPI();
      const res = await axios.post(`${api}/api/admin/register`, formData);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        
        // Show success alert
        setAlert({ open: true, message: "Admin Registration Successful!", severity: "success" });
        
        // Redirect after a short delay so they see the success message
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Registration failed. Please try again.";
      setAlert({ open: true, message: errorMsg, severity: "error" });
    }
  };

  return (
    <Box sx={{ border: "1px solid #ccc", p: 3, borderRadius: 2 }}>
      
      {/* --- ALERT BOX --- */}
      <Snackbar 
        open={alert.open} 
        autoHideDuration={5000} 
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Positioned at top center
      >
        <Alert onClose={handleAlertClose} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>

      <Typography variant="h5" gutterBottom>
        Admin Registration
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Stack spacing={2}>
          <TextField label="Username" name="username" value={formData.username} onChange={handleChange} fullWidth required />
          <TextField label="Email ID" type="email" name="email" value={formData.email} onChange={handleChange} fullWidth required />

          <FormControl fullWidth>
            <InputLabel>Permission</InputLabel>
            <Select name="permission" value={formData.permission} onChange={handleChange} label="Permission">
              <MenuItem value="Faculty">Faculty</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>

          <TextField label="College/Department Name" name="collegeDeptName" value={formData.collegeDeptName} onChange={handleChange} fullWidth />
          <TextField label="College Code" name="collegeCode" value={formData.collegeCode} onChange={handleChange} fullWidth />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.password}
            helperText={errors.password}
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

          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
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
            disabled={!!errors.password || !!errors.confirmPassword || !captchaVerified}
          >
            Sign Up
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default AdminRegistrationForm;