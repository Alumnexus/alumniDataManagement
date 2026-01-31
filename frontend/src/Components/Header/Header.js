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
  Avatar,
  Divider,
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
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [avatarAnchor, setAvatarAnchor] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    _id: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    setIsLoggedIn(!!token);
    setUser({
      name: storedUser?.name || "User",
      email: storedUser?.email || "",
      _id: storedUser?._id || null,
    });
  }, [location]);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleAvatarOpen = (event) => setAvatarAnchor(event.currentTarget);
  const handleAvatarClose = () => setAvatarAnchor(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    handleAvatarClose();
    navigate("/");
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#0D47A1" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", height: 80 }}>
          {/* LEFT */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={logo} alt="Logo" style={{ height: 50, marginRight: 15 }} />
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{ textDecoration: "none", color: "#fff", fontWeight: "bold" }}
            >
              Alumnexus
            </Typography>
          </Box>

          {/* RIGHT */}
          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={handleMenu}>
                <MenuIcon />
              </IconButton>

              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem component={Link} to="/" onClick={handleClose}>
                  Home
                </MenuItem>
                <MenuItem component={Link} to="/about" onClick={handleClose}>
                  About
                </MenuItem>

                {!isLoggedIn ? (
                  <MenuItem component={Link} to="/login" onClick={handleClose}>
                    Login
                  </MenuItem>
                ) : (
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                )}
              </Menu>
            </>
          ) : (
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              {/* Home */}
              <Button
                component={Link}
                to="/"
                startIcon={<HomeIcon />}
                variant="contained"
                sx={{
                  background: "linear-gradient(135deg, #00B0FF, #2979FF)",
                  borderRadius: "999px",
                  px: 3,
                  textTransform: "none",
                }}
              >
                Home
              </Button>

              {/* About */}
              <Button
                component={Link}
                to="/about"
                variant="contained"
                sx={{
                  background: "linear-gradient(135deg, #2E7D32, #66BB6A)",
                  borderRadius: "999px",
                  px: 3,
                  textTransform: "none",
                }}
              >
                About
              </Button>

              {/* Login OR Avatar */}
              {!isLoggedIn ? (
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  sx={{
                    background: "linear-gradient(135deg, #FF6F00, #FF8F00)",
                    borderRadius: "999px",
                    px: 3,
                    textTransform: "none",
                  }}
                >
                  Login
                </Button>
              ) : (
                <>
                  {/* CLICKABLE AVATAR */}
                  <IconButton onClick={handleAvatarOpen}>
                    <Avatar sx={{ bgcolor: "#FF8F00", fontWeight: "bold" }}>
                      {user._id?.charAt(0).toUpperCase() || "U"}
                    </Avatar>
                  </IconButton>

                  {/* AVATAR MENU */}
                  <Menu
                    anchorEl={avatarAnchor}
                    open={Boolean(avatarAnchor)}
                    onClose={handleAvatarClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    {/* Large Clear Avatar */}
                    <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: "#FF8F00",
                          width: 70,
                          height: 70,
                          fontSize: 36,
                          fontWeight: "bold",
                        }}
                      >
                        {user._id?.charAt(0).toUpperCase() || "U"}
                      </Avatar>
                    </Box>

                    {/* User ID Display */}
                    <Box textAlign="center" sx={{ px: 2, pb: 1 }}>
                      <Typography fontWeight="bold">User ID: {user._id || "N/A"}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Email: {user.email}
                      </Typography>
                    </Box>

                    <Divider />

                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon sx={{ mr: 1 }} />
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* ROUTES */}
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
    </>
  );
}
