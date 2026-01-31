import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { backendAPI } from "../middleware.js";
import AlertMessage from "../Utils/AlertMessage"; // Ensure this path is correct

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  
  // New state for custom notifications
  const [notification, setNotification] = useState({ message: "", type: "info" });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const api = backendAPI();
      const res = await axios.post(`${api}/api/login`, formData);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // Logic to redirect back or to home
        const redirectTo = location.state?.from || "/";
        const extraState = location.state?.openRegister 
          ? { openRegister: true, message: "Login Successful! You can now register.", type: "success" } 
          : { message: "Login Successful!", type: "success" };

        navigate(redirectTo, { state: extraState });
      }
    } catch (error) {
      // Set error notification instead of alert
      setNotification({
        message: error.response?.data?.message || "Login failed. Please check credentials.",
        type: "error",
      });
    }
  };

  return (
    <>
      {/* Custom Alert Message Box */}
      <AlertMessage
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "info" })}
      />

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
            <FormControl fullWidth required>
              <InputLabel>Login As</InputLabel>
              <Select
                name="role"
                value={formData.role}
                label="Login As"
                onChange={handleChange}
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="alumni">Alumni</MenuItem>
              </Select>
            </FormControl>

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
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "mediumseagreen",
                "&:hover": { backgroundColor: "seagreen" },
                padding: "10px",
                fontSize: "16px",
                borderRadius: "8px",
                textTransform: "none"
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
    </>
  );
}