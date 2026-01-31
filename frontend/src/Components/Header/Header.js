import React, { useState, useEffect } from "react";
import logo from "../../logo.png";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import RegistrationPage from "./Registration/RegistrationPage";
import Login from "./Login";
import About from "./About/About";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation(); // Used to trigger re-render on route change

  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status whenever the route changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    // 1. Remove data from browser storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // 2. Update local state to trigger UI change
    setIsLoggedIn(false);

    // 3. Close the mobile menu if it's open
    handleClose();

    // 4. Redirect the user
    navigate("/");
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#0D47A1", justifyContent: "center" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 80,
          }}
        >
          {/* Left */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={logo}
              alt="Website Logo"
              style={{ height: 50, marginRight: 15 }}
            />
            <Typography
              variant="h5"
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

          {/* Right */}
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                onClick={handleMenu}
                sx={{ ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem component={Link} to="/" onClick={handleClose}>Home</MenuItem>
                <MenuItem component={Link} to="/about" onClick={handleClose}>About</MenuItem>
                
                {/* Mobile Conditional Login/Logout */}
                {!isLoggedIn ? (
                  <MenuItem component={Link} to="/login" onClick={handleClose}>Login</MenuItem>
                ) : (
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                )}
              </Menu>
            </>
          ) : (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                component={Link}
                to="/"
                startIcon={<HomeIcon />}
                variant="contained"
                sx={{
                  background: "linear-gradient(135deg, #00B0FF, #2979FF)",
                  color: "#fff",
                  fontWeight: "bold",
                  px: 3.5,
                  borderRadius: "999px",
                  textTransform: "none",
                }}
              >
                Home
              </Button>

              {/* Desktop Conditional Login/Logout */}
              {!isLoggedIn ? (
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  sx={{
                    background: "linear-gradient(135deg, #FF6F00, #FF8F00)",
                    color: "#fff",
                    fontWeight: "bold",
                    px: 3,
                    borderRadius: "999px",
                    textTransform: "none",
                    boxShadow: "0 4px 10px rgba(255,111,0,0.5)",
                    "&:hover": { transform: "translateY(-2px)" },
                  }}
                >
                  Login
                </Button>
              ) : (
                <Button
                  onClick={handleLogout}
                  variant="contained"
                  startIcon={<LogoutIcon />}
                  sx={{
                    background: "linear-gradient(135deg, #d32f2f, #f44336)",
                    color: "#fff",
                    fontWeight: "bold",
                    px: 3,
                    borderRadius: "999px",
                    textTransform: "none",
                    boxShadow: "0 4px 10px rgba(211, 47, 47, 0.4)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #b71c1c, #d32f2f)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Logout
                </Button>
              )}

              <Button
                component={Link}
                to="/about"
                variant="contained"
                sx={{
                  background: "linear-gradient(135deg, #2E7D32, #66BB6A)",
                  color: "#fff",
                  fontWeight: "bold",
                  px: 3,
                  borderRadius: "999px",
                  textTransform: "none",
                }}
              >
                About
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
    </>
  );
}