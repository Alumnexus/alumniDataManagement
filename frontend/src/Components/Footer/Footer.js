import React from "react";
import {Routes, Route, Link as RouterLink } from "react-router-dom";
import { Box, Typography, Container, Stack, Link, IconButton } from "@mui/material";
import { YouTube, LinkedIn, Instagram, GitHub } from "@mui/icons-material";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        backgroundColor: "#222222",
        color: "#ffffff",
        py: 5,
        mt: 5,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          spacing={4}
        >
          {/* About Section */}
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Alumnexus
            </Typography>
            <Typography
              variant="body2"
              sx={{ maxWidth: 300, mx: "auto" }} // centers the paragraph
            >
              Optimized to manage alumni and student data efficiently within the same institute, enabling better engagement, mentorship, and networking opportunities.
            </Typography>
          </Box>


          {/* Quick Links */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Link component={RouterLink} to="/" color="inherit" underline="hover">Home</Link>
              <Link component={RouterLink} to="/about" color="inherit" underline="hover">About</Link>
              <Link component={RouterLink} to="/login" color="inherit" underline="hover">Login</Link>
              <Link component={RouterLink} to="/register" color="inherit" underline="hover">Register</Link>
            </Stack>
          </Box>

          {/* Contact / Social */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Connect with us
            </Typography>
            <Stack direction="row" spacing={1} sx={{ justifyContent: "center" }}>
              <IconButton href="#" sx={{ color: "#ffffff" }}>
                <YouTube />
              </IconButton>
              <IconButton href="https://github.com/Alumnexus/alumniDataManagement" target="_blank" sx={{ color: "#ffffff" }}>
                <GitHub />
              </IconButton>
              <IconButton href="#" sx={{ color: "#ffffff" }}>
                <LinkedIn />
              </IconButton>
              <IconButton href="#" sx={{ color: "#ffffff" }}>
                <Instagram />
              </IconButton>
            </Stack>
            <Typography variant="body2" sx={{ mt: 1 }}>
              contact@alumninexus.com
            </Typography>
          </Box>
        </Stack>

        {/* Bottom Copyright */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body2">
            &copy; {currentYear} AlumniNexus. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
