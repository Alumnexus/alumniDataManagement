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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ReCAPTCHA from "react-google-recaptcha";

const AdminRegistrationForm = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captchaVerified) {
      alert("Please verify the CAPTCHA.");
      return;
    }
    console.log("Admin Registration Data:", formData);
    // TODO: Add API integration
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
        Admin Registration
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

          <FormControl fullWidth>
            <InputLabel id="permission-label">Permission</InputLabel>
            <Select
              labelId="permission-label"
              name="permission"
              value={formData.permission}
              onChange={handleChange}
              label="Permission"
            >
              <MenuItem value="Faculty">Faculty</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="College/Department Name"
            name="collegeDeptName"
            value={formData.collegeDeptName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="College Code"
            name="collegeCode"
            value={formData.collegeCode}
            onChange={handleChange}
            fullWidth
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
          /* replace sitekey here */
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" /* it public sitekey */
            onChange={handleCaptchaChange}
          />

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

export default AdminRegistrationForm;