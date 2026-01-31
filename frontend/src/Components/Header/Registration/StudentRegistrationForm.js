import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  IconButton,
  InputAdornment,
  CircularProgress,
  Snackbar, // Added
  Alert,    // Added
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { backendAPI } from "../../middleware";
import { useNavigate } from "react-router-dom";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/;

const StudentRegistrationForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // --- Alert State ---
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "error", "warning", "info", "success"
  });

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    enrollmentNumber: "",
    linkedIn: "",
    password: "",
    confirmPassword: "",
  });

  const handleAlertClose = () => setSnackbar({ ...snackbar, open: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: passwordRegex.test(value) ? "" : "Invalid password format",
      }));
    }
    if (name === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: value !== formData.password ? "Passwords do not match" : "",
      }));
    }
  };

  const handleCaptchaChange = (value) => setCaptchaVerified(!!value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaVerified) {
      setSnackbar({ open: true, message: "Please verify the CAPTCHA.", severity: "warning" });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setSnackbar({ open: true, message: "Passwords do not match.", severity: "error" });
      return;
    }

    setIsSubmitting(true);

    try {
      const api = backendAPI();
      const payload = {
        username: formData.username,
        email: formData.email,
        enrollmentNumber: formData.enrollmentNumber,
        linkedIn: formData.linkedIn,
        password: formData.password,
      };

      const res = await axios.post(`${api}/api/student/register`, payload);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setSnackbar({ open: true, message: "Registration successful! Welcome.", severity: "success" });

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Server error. Try again later.";
      setSnackbar({ open: true, message: msg, severity: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ border: "1px solid #ccc", p: 3, borderRadius: 2 }}>
      
      {/* MSG BOX (Alert) */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleAlertClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Typography variant="h5" gutterBottom>Student Registration</Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Stack spacing={2}>
          <TextField label="Username" name="username" value={formData.username} onChange={handleChange} required fullWidth />
          <TextField label="Email ID" name="email" type="email" value={formData.email} onChange={handleChange} required fullWidth />
          <TextField label="Enrollment Number" name="enrollmentNumber" value={formData.enrollmentNumber} onChange={handleChange} required fullWidth placeholder="22/11/TY/XXX" />
          <TextField label="LinkedIn" name="linkedIn" value={formData.linkedIn} onChange={handleChange} fullWidth />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
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
            required
            fullWidth
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
            disabled={isSubmitting || !!errors.password || !!errors.confirmPassword || !captchaVerified}
          >
            {isSubmitting ? <CircularProgress size={24} /> : "Sign Up"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default StudentRegistrationForm;