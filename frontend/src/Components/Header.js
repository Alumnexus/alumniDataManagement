import React from "react";
import logo from "../logo.png";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import RegistrationPage from "./RegistrationPage";
import Login from "./Login";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

function About() {
  return (
    <Box sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h3" sx={{ color: "#0D47A1" }}>
        About Page
      </Typography>
    </Box>
  );
}

export default function Header() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#0D47A1", height: 80, justifyContent: "center" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
          }}
        >
          {/* Left side */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={logo} alt="Website Logo" style={{ height: 50, marginRight: 15 }} />
            <Typography
              variant="h4"
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Alumnexus
            </Typography>
          </Box>

          {/* Right side buttons */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{
                backgroundColor: "#FF6F00",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#FF8F00" },
              }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/about"
              variant="contained"
              sx={{
                backgroundColor: "#43A047",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#66BB6A" },
              }}
            >
              About
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Routes> */}
    </BrowserRouter>
  );
}
