import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const RecruiterRegistrationForm = () => {
  const [formData, setFormData] = useState({
    userId: "",
    email: "",
    position: "",
    company: "",
    location: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Recruiter Registration Data:", formData);
    // TODO: Add API integration here
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
        Recruiter Registration
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Stack spacing={2}>
          <TextField
            label="User ID"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Position"
            name="position"
            value={formData.position}
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
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
          />

          {/* Password Fields with toggle */}
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
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Buttons */}
          <Stack direction="row" spacing={2}>
            <Button variant="outlined">Get OTP</Button>
            <Button type="submit" variant="contained" color="success">
              Sign Up
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default RecruiterRegistrationForm;
