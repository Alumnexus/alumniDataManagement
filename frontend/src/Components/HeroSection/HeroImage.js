import React from "react";
import { Box } from "@mui/material";
import LogoPhoto from "./LogoPhoto.jpg"; // adjust path if needed

export default function HeroImage() {
  return (
    <Box
      component="img"
      src={LogoPhoto}
      alt="Logo"
      sx={{
        width: { xs: "90%", md: "500px" }, // bigger size
        borderRadius: 3,
        boxShadow: 5,
      }}
    />
  );
}
