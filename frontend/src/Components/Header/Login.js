import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleGetOtp = () => {
    if (!formData.email) {
      alert("Please enter your email to get OTP");
      return;
    }

    console.log("OTP requested for:", formData.email);
    alert(`OTP sent to ${formData.email}`);
    setOtpSent(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    setFormData({ email: "", password: "", otp: "" });
    setShowPassword(false);
    setOtpSent(false);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Login
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: 2,
          }}
        >
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePassword}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* OTP Field & Button on same line */}
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              label="Enter OTP"
              variant="outlined"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              fullWidth
              disabled={!otpSent}
              required={otpSent}
            />
            <Button
              type="button"
              variant="outlined"
              onClick={handleGetOtp}
              sx={{
                textTransform: "none",
                borderColor: "mediumseagreen",
                color: "mediumseagreen",
                "&:hover": { borderColor: "seagreen", backgroundColor: "#f0fff0" },
              }}
            >
              Get OTP
            </Button>
          </Stack>

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "mediumseagreen",
              "&:hover": { backgroundColor: "seagreen" },
              padding: "10px",
              fontSize: "16px",
              borderRadius: "8px",
            }}
          >
            Login
          </Button>
        </Box>

        <Typography variant="body2" sx={{ marginTop: 2, fontSize: "14px" }}>
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{ color: "mediumseagreen", textDecoration: "none" }}
          >
            Register
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}