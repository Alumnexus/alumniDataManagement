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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    // TODO: Add login API call here

    // Clear inputs after submission
    setFormData({
      email: "",
      password: "",
    });
    setShowPassword(false); // Reset password field to hidden
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
<<<<<<< HEAD
            flexDirection: "column",
            gap: 2,
            marginTop: 2,
          }}
        >
          {/* Email Input */}
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
=======
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f0f2f5"
        }}>
            <div style={{
                backgroundColor: "#fff",
                padding: "40px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                width: "350px",
                textAlign: "center"
            }}>
                <h2 style={{ marginBottom: "20px" }}>Login</h2>
                <div style={{ marginBottom: "15px" }}>
                    <input
                        type="email"
                        placeholder="Email"
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            boxSizing: "border-box"
                        }}
                    />
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <input
                        type="password"
                        placeholder="Password"
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            boxSizing: "border-box"
                        }}
                    />
                </div>
                <button
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "mediumseagreen",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "16px"
                    }}
                >
                    Sign in
                </button>
                <p style={{ marginTop: "20px", fontSize: "14px" }}>
                    Don't have an account?{" "}
                    <Link to="/register" style={{ color: "mediumseagreen", textDecoration: "none" }}>
                        Register
                    </Link>
                </p>
            </div>
        </div>
        
    );
}
>>>>>>> 1681c1328e7bbb68d98012f7d959985b8c748908

          {/* Password Input with Eye Icon */}
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

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "mediumseagreen",
              "&:hover": {
                backgroundColor: "seagreen",
              },
              padding: "10px",
              fontSize: "16px",
              borderRadius: "8px",
            }}
          >
            Login
          </Button>
        </Box>

        {/* Register Link */}
        <Typography
          variant="body2"
          sx={{ marginTop: 2, fontSize: "14px" }}
        >
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