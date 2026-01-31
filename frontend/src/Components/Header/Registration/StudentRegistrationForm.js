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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { backendAPI } from "../../middleware";

// Regex for strong password
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/;

const StudentRegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    enrollmentNumber: "",
    linkedIn: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Password validation
    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: passwordRegex.test(value)
          ? ""
          : "Min 6 chars, 1 uppercase, 1 lowercase & 1 special character required",
      }));
    }

    if (name === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          value !== formData.password ? "Passwords do not match" : "",
      }));
    }
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

    if (!passwordRegex.test(formData.password)) {
      alert(
        "Password does not meet requirements: minimum 6 characters, 1 uppercase, 1 lowercase, 1 special character."
      );
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
        enrollmentNumber: formData.enrollmentNumber,
        linkedIn: formData.linkedIn,
        password: formData.password,
      };

      const res = await axios.post(`${api}/api/student/register`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Student registration successful!");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setFormData({
        username: "",
        email: "",
        enrollmentNumber: "",
        linkedIn: "",
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
        Student Registration
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

          <TextField
            label="Enrollment Number"
            name="enrollmentNumber"
            value={formData.enrollmentNumber}
            onChange={handleChange}
            required
            fullWidth
            placeholder="22/11/TY/XXX"
          />

          <TextField
            label="LinkedIn"
            name="linkedIn"
            value={formData.linkedIn}
            onChange={handleChange}
            fullWidth
          />

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
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
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
            required
            fullWidth
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
            disabled={
              isSubmitting ||
              !!errors.password ||
              !!errors.confirmPassword ||
              !captchaVerified
            }
          >
            {isSubmitting ? <CircularProgress size={24} /> : "Sign Up"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default StudentRegistrationForm;
