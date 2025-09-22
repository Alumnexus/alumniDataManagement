import React from "react";
import { Box, Typography } from "@mui/material";

export default function HeroText() {
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 2, color: "#0D47A1", fontSize: 30 }}
      >
        Centralized Alumni Data & Engagement Hub
      </Typography>
      <Typography variant="h6" sx={{ color: "#424242", mb: 1 }}>
        Connecting Graduates, Institutions, and Opportunities.
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, color: "#616161" }}>
        Our platform enables alumni to stay connected with their alma mater,
        explore career opportunities, participate in events, and share
        experiences. Strengthen your professional network and grow together
        as a community.
      </Typography>
    </Box>
  );
}
