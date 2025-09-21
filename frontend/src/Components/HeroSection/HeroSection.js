import React from "react";
import { Box } from "@mui/material";
import HeroImage from "./HeroImage";
import HeroText from "./HeroText";


export default function HeroSection() {
  return (
    <Box
      sx={{
        marginTop: 10,
        display: "flex",
        flexDirection: { xs: "column", md: "row-reverse" }, // image on right
        alignItems: "center",
        justifyContent: "center",
        textAlign: { xs: "center", md: "left" },
        gap: 5,
        padding: { xs: 3, md: 6 },
      }}
    >
      <HeroImage />
      <HeroText />
    </Box>
  );
}
