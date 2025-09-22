import React from "react";
import logo from "../logo.png";
import {Routes, Route, Link } from "react-router-dom";
import RegistrationPage from "./RegistrationPage";
import Login from "./Login";
import About from "./About";
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









export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

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
                <MenuItem
                  component={Link}
                  to="/login"
                  onClick={handleClose}
                >
                  Login
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/about"
                  onClick={handleClose}
                >
                  About
                </MenuItem>
              </Menu>
            </>
          ) : (
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
