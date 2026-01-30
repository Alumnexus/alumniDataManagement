import React from "react";
import logo from "../../logo.png";
import {Routes, Route, Link } from "react-router-dom";
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
  to="/"
  startIcon={<HomeIcon />}
  variant="contained"
  sx={{
    background: "linear-gradient(135deg, #00B0FF, #2979FF)",
    color: "#fff",
    fontWeight: "bold",
    px: 3.5,
    py: 1,
    borderRadius: "999px",
    textTransform: "none",
    letterSpacing: "0.5px",
    boxShadow: "0 0 12px rgba(41,121,255,0.6)",
    animation: "pulse 2s infinite",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "linear-gradient(135deg, #1565C0, #1E88E5)",
      boxShadow: "0 0 20px rgba(21,101,192,0.9)",
      transform: "translateY(-3px) scale(1.05)",
      animation: "none",
    },
    "@keyframes pulse": {
      "0%": { boxShadow: "0 0 0 0 rgba(41,121,255,0.6)" },
      "70%": { boxShadow: "0 0 0 12px rgba(41,121,255,0)" },
      "100%": { boxShadow: "0 0 0 0 rgba(41,121,255,0)" },
    },
  }}
>
  Home
</Button>


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
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 16px rgba(255,111,0,0.7)",
    },
  }}
>
  Login
</Button>

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
    boxShadow: "0 4px 10px rgba(46,125,50,0.4)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 16px rgba(46,125,50,0.6)",
    },
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