import React, { useState, useEffect } from "react";
import logo from "../../logo.png";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import RegistrationPage from "./Registration/RegistrationPage";
import Login from "./Login";
import About from "./About/About";
import ManageAccountPage from "./ManageAccountPage";
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
      name: storedUser?.username || "User",
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
                <MenuItem component={Link} to="/" onClick={handleClose}>Home</MenuItem>
                <MenuItem component={Link} to="/about" onClick={handleClose}>About</MenuItem>
                {!isLoggedIn ? (
                  <MenuItem component={Link} to="/login" onClick={handleClose}>Login</MenuItem>
                ) : (
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                )}
              </Menu>
            </>
          ) : (
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              {/* Home – UNCHANGED */}
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

              {/* About – UNCHANGED */}
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
                  {/* Avatar Button */}
                  <IconButton onClick={handleAvatarOpen}>
                    <Avatar sx={{ bgcolor: "#FF8F00", fontWeight: "bold" }}>
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </Avatar>
                  </IconButton>

                  {/* FIXED AVATAR MENU */}
                  <Menu
                    anchorEl={avatarAnchor}
                    open={Boolean(avatarAnchor)}
                    onClose={handleAvatarClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    MenuListProps={{ sx: { p: 0 } }}
                    PaperProps={{
                      sx: {
                        minWidth: 300,
                        borderRadius: 3,
                        overflow: "hidden",
                      },
                    }}
                  >
                    {/* Centered Avatar Section */}
                    <Box
                      sx={{
                        background: "linear-gradient(135deg, #42A5F5, #1E88E5)",
                        color: "#fff",
                        py: 4,
                        textAlign: "center",
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "#FFD54F",
                          width: 80,
                          height: 80,
                          fontSize: 36,
                          fontWeight: "bold",
                          mx: "auto",
                          mb: 1,
                        }}
                      >
                        {user.name?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography fontWeight="bold">{user.name}</Typography>
                      <Typography variant="body2">{user.email}</Typography>
                    </Box>

                    <Divider />

                    <MenuItem onClick={() => { handleAvatarClose(); navigate("/manage-account"); }}>
                      Manage Account
                    </MenuItem>

                    <MenuItem onClick={handleLogout} sx={{ color: "#D32F2F" }}>
                      <LogoutIcon sx={{ mr: 1 }} /> Logout
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/manage-account" element={<ManageAccountPage />} />
      </Routes>
    </>
  );
}
