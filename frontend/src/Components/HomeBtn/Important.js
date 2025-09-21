import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { useNavigate, Routes, Route, } from "react-router-dom";
import EventIcon from "@mui/icons-material/Event";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PeopleIcon from "@mui/icons-material/People";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const featureData = [
  {
    icon: <EventIcon />,
    title: "Events",
    color: "#1976D2",
    bg: "linear-gradient(135deg, #BBDEFB, #E3F2FD)",
    route: "/events",
  },
  {
    icon: <WorkOutlineIcon />,
    title: "Internships",
    color: "#43A047",
    bg: "linear-gradient(135deg, #C8E6C9, #E8F5E9)",
    route: "/internships",
  },
  {
    icon: <BusinessCenterIcon />,
    title: "Job Portal",
    color: "#FF6F00",
    bg: "linear-gradient(135deg, #FFE0B2, #FFF3E0)",
    route: "/jobs",
  },
  {
    icon: <PeopleIcon />,
    title: "Mentorship",
    color: "#D32F2F",
    bg: "linear-gradient(135deg, #FFCDD2, #FFEBEE)",
    route: "/mentorship",
  },
  {
    icon: <PeopleAltIcon />,
    title: "Alumni Directory",
    color: "#6A1B9A",
    bg: "linear-gradient(135deg, #E1BEE7, #F3E5F5)",
    route: "/alumni-directory",
  },
];

export default function Features() {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        mt: 4,
        px: 2,
        gap: 3,
      }}
    >
      {featureData.map((feature) => (
        <Stack
          key={feature.title}
          spacing={1}
          alignItems="center"
          sx={{
            width: 180,
            height: 180,
            borderRadius: 3,
            cursor: "pointer",
            justifyContent: "center",
            background: feature.bg,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: `0 8px 20px ${feature.color}55`,
            },
          }}
          onClick={() => navigate(feature.route)} // Navigate on click
        >
          {React.cloneElement(feature.icon, {
            sx: { fontSize: 50, color: feature.color },
          })}
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            {feature.title}
          </Typography>
        </Stack>
      ))}
    </Box>
    </>
  );
}
