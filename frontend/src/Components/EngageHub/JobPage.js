import React from "react";
import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";

const jobs = [
  {
    title: "Frontend Developer",
    company: "TechCorp Solutions",
    location: "Remote",
    salary: "₹6,00,000 - ₹8,00,000 / year",
    type: "Full-Time",
  },
  {
    title: "Backend Engineer",
    company: "CodeMasters Inc.",
    location: "Bangalore, India",
    salary: "₹7,50,000 - ₹10,00,000 / year",
    type: "Full-Time",
  },
  {
    title: "Data Scientist",
    company: "DataWorks",
    location: "Remote",
    salary: "₹8,00,000 - ₹12,00,000 / year",
    type: "Contract",
  },
  {
    title: "UI/UX Designer",
    company: "Creative Minds",
    location: "Delhi, India",
    salary: "₹5,00,000 - ₹7,00,000 / year",
    type: "Full-Time",
  },
];

export default function JobPortalPage() {
  return (
    <Box
      sx={{
        px: { xs: 2, md: 6 },
        py: 6,
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* Page Title */}
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          color: "#FF6F00",
          mb: 4,
          fontWeight: "bold",
        }}
      >
        Job Opportunities
      </Typography>

      {/* Job Cards */}
      <Grid container spacing={4} justifyContent="center">
        {jobs.map((job, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                background: "white",
                borderRadius: 3,
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#333", mb: 1 }}
                >
                  {job.title}
                </Typography>
                <Typography sx={{ mb: 1, color: "#555" }}>{job.company}</Typography>
                <Typography sx={{ mb: 1, color: "#777" }}>
                  Location: {job.location}
                </Typography>
                <Typography sx={{ mb: 1, color: "#777" }}>
                  Salary: {job.salary}
                </Typography>
                <Typography
                  sx={{
                    mb: 2,
                    color: job.type === "Full-Time" ? "#43A047" : "#FF6F00",
                    fontWeight: "bold",
                  }}
                >
                  {job.type}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#FF6F00",
                    "&:hover": { backgroundColor: "#FF8F00" },
                  }}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
