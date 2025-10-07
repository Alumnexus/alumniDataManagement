import React from "react";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function About() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 8, md: 12 },
        px: { xs: 2, lg: 12 },
        bgcolor: "grey.50",
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: { xs: 6, md: 10 },
        }}
      >
        {/* --- SECTION 1: WHY WE ARE --- */}
        <Paper
          elevation={4}
          sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, overflow: "hidden" }}
        >
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="overline" color="primary.main" fontWeight="bold">
                OUR MISSION
              </Typography>
              <Typography variant="h3" component="h2" fontWeight="700" sx={{ mt: 1 }}>
                Why We Exist
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 3,
                  color: "text.secondary",
                  lineHeight: 1.8,
                  maxWidth: "500px",
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
                // ✅ Path set to your new image for this section
                src="public/images/Why_We_Are.jpg"
                alt="Community collaborating"
                sx={{
                  borderRadius: 3,
                  width: "100%",
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
          elevation={4}
          sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, overflow: "hidden" }}
        >
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <Box
                component="img"
                // ✅ Path set to your new image for this section
                src="public/images/Why_We_Are.jpg"
                alt="A person looking towards the future"
                sx={{
                  borderRadius: 3,
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Typography variant="overline" color="primary.main" fontWeight="bold">
                THE FUTURE
              </Typography>
              <Typography variant="h3" component="h2" fontWeight="700" sx={{ mt: 1 }}>
                Our Vision
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 3,
                  color: "text.secondary",
                  lineHeight: 1.8,
                  maxWidth: "500px",
                }}
              >
                We envision a digital ecosystem that fosters lifelong connections.
                By integrating networking, mentorship, and upskilling, we aim to
                build a sustainable and impactful community, empowering alumni to
                give back and students to unlock their potential.
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* --- SECTION 3: JOIN TODAY (no button here) --- */}
        <Box
          sx={{
            p: { xs: 4, md: 8 },
            borderRadius: 4,
            textAlign: "center",
            color: "white",
            position: "relative",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(/images/about-join.jpg)`,
            boxShadow: "0 8px 24px rgba(25, 118, 210, 0.4)",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: 4,
            },
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography variant="h3" fontWeight="bold">
              Join a Thriving Network
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 2,
                fontSize: "1.125rem",
                lineHeight: 1.7,
                maxWidth: "700px",
                mx: "auto",
                opacity: 0.9,
              }}
            >
              Be part of a community that inspires, mentors, and uplifts. Together,
              we can unlock opportunities and create a lasting impact for future
              generations.
            </Typography>
          </Box>
        </Box>

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