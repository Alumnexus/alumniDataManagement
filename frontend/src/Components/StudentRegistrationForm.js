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

const StudentRegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    degree: "",
    department: "",
    graduationYear: "",
    linkedIn: "",
    enrollmentNo: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student Registration Data:", formData);
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
        Student Registration
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
            label="LinkedIn"
            name="linkedIn"
            value={formData.linkedIn}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Enrollment No."
            name="enrollmentNo"
            value={formData.enrollmentNo}
            onChange={handleChange}
            fullWidth
            required
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

export default StudentRegistrationForm;
