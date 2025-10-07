import React from "react";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import img2 from './future_img.jpg';
import img1 from './mission_img.jpg';
import img3 from './network_img.jpg';

export default function About() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: "4vmax",
        px: "3vmax",
        bgcolor: "grey.50",
      }}
    >
      <Box
        sx={{
          maxWidth: "90vw",
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "10vmin",
        }}
      >
        {/* --- SECTION 1: WHY WE ARE --- */}
        <Paper
          elevation={10}
          sx={{ p: "2vw", borderRadius: "4vmin", overflow: "hidden", display: "flex" ,flexDirection: { xs: "column", md: "row" }}}
        >
          <Grid container spacing={{ xs: "4vh", md: "4vw" }} alignItems="stretch">
            <Grid item xs={12} md={6}>
              <Typography variant="overline" color="primary.main" fontWeight="bold" fontSize="2.5vmax">
                OUR MISSION
              </Typography>
              <Typography variant="h3" component="h2" fontWeight="700" fontSize={{xs: "4vmax", md: "3.5vmax"}} sx={{ mt: 1 }}>
                Why We Exist
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 3,
                  color: "text.secondary",
                  lineHeight: 1.8,
                  textAlign: "center",
                  fontSize: {xs: "2vmax",md: "3vmin"},
                  maxWidth: {xs: "100%",sm: "100%",md:"40vw"},
                }}
              >
                Many institutions struggle with scattered alumni data and outdated
                communication.
                <Box component="span" display="block" mt={2}>
                  Alumnexus provides a centralized platform where alumni, students,
                  and institutions can connect, collaborate, and grow together,
                  ensuring secure data management and seamless access to
                  opportunities.
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={img1}
                alt="Community collaborating"
                sx={{
                  borderRadius: 3,
                  width: { xs: "100%", md: "40vw" },
                  height: "auto",
                  objectFit: "cover",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* --- SECTION 2: OUR VISION --- */}
        <Paper
          elevation={10}
          sx={{ p: "2vw", borderRadius: "4vmin", overflow: "hidden", display: "flex" ,flexDirection: { xs: "column", md: "row" }}}
        >
          <Grid container spacing={{ xs: "4vh", md: "4vw" }} alignItems="stretch">
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Typography variant="overline" color="primary.main" fontWeight="bold" fontSize="2.5vmax">
                THE FUTURE
              </Typography>
              <Typography variant="h3" component="h2" fontWeight="700" fontSize={{xs: "4vmax", md: "3.5vmax"}} sx={{ mt: 1 }}>
               Our Vision
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 3,
                  color: "text.secondary",
                  lineHeight: 1.8,
                  textAlign: "center",
                  fontSize: {xs: "2vmax",md: "3vmin"},
                  maxWidth: {xs: "100%",sm: "100%",md:"40vw"},
                }}
              >
                We envision a digital ecosystem that fosters lifelong connections.
                 By integrating networking, mentorship, and upskilling, we aim to
                  build a sustainable and impactful community, empowering alumni
                   to give back and students to unlock their potential.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <Box
                component="img"
                src={img2}
                alt="Community collaborating"
                sx={{
                  borderRadius: 3,
                  width: { xs: "100%", md: "40vw" },
                  height: "auto",
                  objectFit: "cover",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* --- SECTION 3: JOIN TODAY (no button here) --- */}
        <Paper
          elevation={10}
          sx={{ p: "2vw", borderRadius: "4vmin", overflow: "hidden", display: "flex" ,flexDirection: { xs: "column", md: "row" }}}
        >
          <Grid container spacing={{ xs: "4vh", md: "4vw" }} alignItems="stretch">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" fontWeight="700" fontSize={{xs: "4vmax", md: "3.5vmax"}} sx={{ mt: 1 }}>
                Join a Thriving Network
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 3,
                  color: "text.secondary",
                  lineHeight: 1.8,
                  textAlign: "center",
                  fontSize: {xs: "2vmax",md: "3vmin"},
                  maxWidth: {xs: "100%",sm: "100%",md:"40vw"},
                }}
              >
                Be part of a community that inspires, mentors,
                 and uplifts. Together, we can unlock opportunities
                  and create a lasting impact for future generations.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={img3}
                alt="Community collaborating"
                sx={{
                  borderRadius: 3,
                  width: { xs: "100%", md: "40vw" },
                  height: "auto",
                  objectFit: "cover",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              />
            </Grid>
          </Grid>
        </Paper>
        {/* ✅ FINAL CTA BUTTON OUTSIDE ALL SECTIONS */}
        <Box textAlign="center" mt={6}>
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: 6,
              py: 1.8,
              fontSize: "1.1rem",
              fontWeight: "bold",
              borderRadius: "50px",
              bgcolor: "primary.main",
              color: "white",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
              },
            }}
          >
            Get Started
          </Button>
        </Box>
      </Box>
    </Box>
  );
}