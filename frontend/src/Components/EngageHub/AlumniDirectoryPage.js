import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  TextField,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SchoolIcon from "@mui/icons-material/School";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

// Sample Alumni Data
const alumniList = [
  {
    name: "Amit Sharma",
    graduationYear: 2020,
    department: "Computer Science",
    currentJob: "Software Engineer",
    company: "Google",
    linkedIn: "https://linkedin.com/in/amit-sharma",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Verma",
    graduationYear: 2019,
    department: "Electrical Engineering",
    currentJob: "Data Scientist",
    company: "Microsoft",
    linkedIn: "https://linkedin.com/in/priya-verma",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Ravi Kumar",
    graduationYear: 2018,
    department: "Mechanical Engineering",
    currentJob: "Product Manager",
    company: "Amazon",
    linkedIn: "https://linkedin.com/in/ravi-kumar",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
  },
  {
    name: "Neha Gupta",
    graduationYear: 2021,
    department: "Information Technology",
    currentJob: "Cybersecurity Analyst",
    company: "IBM",
    linkedIn: "https://linkedin.com/in/neha-gupta",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
  },
];

export default function AlumniDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter alumni based on search
  const filteredAlumni = alumniList.filter(
    (alumni) =>
      alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        px: { xs: 2, md: 6 },
        py: 6,
        backgroundColor: "#f9fafc",
        minHeight: "100vh",
      }}
    >
      {/* Page Title */}
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          color: "#0D47A1",
          mb: 4,
          fontWeight: "bold",
        }}
      >
        Alumni Directory
      </Typography>

      {/* Search Bar */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
        <TextField
          variant="outlined"
          placeholder="Search alumni by name, department, or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: "100%",
            maxWidth: 500,
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        />
      </Box>

      {/* Alumni Grid */}
      <Grid container spacing={4} justifyContent="center">
        {filteredAlumni.length > 0 ? (
          filteredAlumni.map((alumni, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  background: "#fff",
                  borderRadius: 3,
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  textAlign: "center",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <CardContent>
                  {/* Profile Picture */}
                  <Avatar
                    src={alumni.avatar}
                    alt={alumni.name}
                    sx={{
                      width: 80,
                      height: 80,
                      mx: "auto",
                      mb: 2,
                      border: "3px solid #0D47A1",
                    }}
                  />

                  {/* Alumni Info */}
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    {alumni.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#777", mb: 1 }}
                  >
                    {alumni.department} • Class of {alumni.graduationYear}
                  </Typography>

                  {/* Job Details */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 2,
                      color: "#555",
                      mb: 2,
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <WorkOutlineIcon fontSize="small" />
                      <Typography variant="body2">{alumni.currentJob}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <BusinessCenterIcon fontSize="small" />
                      <Typography variant="body2">{alumni.company}</Typography>
                    </Box>
                  </Box>

                  {/* LinkedIn Button */}
                  <Button
                    variant="contained"
                    startIcon={<LinkedInIcon />}
                    href={alumni.linkedIn}
                    target="_blank"
                    sx={{
                      backgroundColor: "#0A66C2",
                      "&:hover": { backgroundColor: "#004182" },
                      textTransform: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Connect on LinkedIn
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", color: "#777", mt: 4 }}
          >
            No alumni found matching your search.
          </Typography>
        )}
      </Grid>
    </Box>
  );
}
