import React from "react";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";

export default function About() {
  return (
    <Box sx={{ minHeight: "100vh", py: 12, px: { xs: 3, lg: 20 }, bgcolor: "#f9fafb" }}>
      <Box sx={{ maxWidth: "1200px", mx: "auto", display: "flex", flexDirection: "column", gap: 12 }}>

        {/* WHY WE ARE */}
        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" color="primary" fontWeight="bold">
                Why We Are
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, color: "text.secondary", lineHeight: 1.7 }}>
                Many institutions struggle with scattered alumni data, outdated
                communication methods, and limited engagement opportunities.
                <Box component="span" display="block" mt={2}>
                  Alumnexus is created to solve these challenges by providing a
                  centralized platform where alumni, students, and institutions
                  can connect, collaborate, and grow together. Our solution ensures
                  secure data management, structured mentorship programs, and
                  seamless access to career and learning opportunities.
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="center">
                <Box
                  component="img"
                  src="/images/why-we-are.png"
                  alt="Why We Are"
                  sx={{ borderRadius: 2, boxShadow: 3, maxWidth: "100%" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* OUR VISION */}
        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <Box display="flex" justifyContent="center">
                <Box
                  component="img"
                  src="/images/our-vision.png"
                  alt="Our Vision"
                  sx={{ borderRadius: 2, boxShadow: 3, maxWidth: "100%" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Typography variant="h4" component="h2" color="primary" fontWeight="bold">
                Our Vision
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, color: "text.secondary", lineHeight: 1.7 }}>
                We envision Alumnexus as a digital ecosystem that fosters lifelong
                connections. By integrating alumni networking, mentorship,
                upskilling, and event management into one platform, we aim to
                build a sustainable and impactful community. Our vision is to
                empower alumni to give back, help students unlock career
                opportunities, and enable institutions to strengthen their
                reputation globally.
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* JOIN TODAY */}
        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3, textAlign: "center", bgcolor: "primary.main", color: "white" }}>
          <Typography variant="h4" fontWeight="bold">
            Join Today
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, fontSize: "1.125rem", lineHeight: 1.6 }}>
            Be part of a thriving alumni network that inspires, mentors, and
            uplifts. Together, we can unlock opportunities, share knowledge, and
            create a lasting impact for future generations.
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 4,
              px: 6,
              py: 1.5,
              fontWeight: "bold",
              bgcolor: "white",
              color: "primary.main",
              "&:hover": { bgcolor: "#f0f0f0" },
            }}
          >
            Get Started
          </Button>
        </Paper>

      </Box>
    </Box>
  );
}