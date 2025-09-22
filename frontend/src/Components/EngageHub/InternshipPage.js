import React from "react";
import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";

const internships = [
  {
    title: "Software Development Intern",
    company: "TechCorp Solutions",
    duration: "3 Months",
    location: "Remote",
  },
  {
    title: "Marketing Intern",
    company: "Creative Minds",
    duration: "6 Months",
    location: "On-site",
  },
  {
    title: "Data Analyst Intern",
    company: "DataWorks",
    duration: "4 Months",
    location: "Remote",
  },
  {
    title: "Product Management Intern",
    company: "InnovateX",
    duration: "3 Months",
    location: "On-site",
  },
];

export default function InternshipsPage() {
  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h3" sx={{ textAlign: "center", color: "#43A047", mb: 4 }}>
        Internship Opportunities
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {internships.map((internship, index) => (
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
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {internship.title}
                </Typography>
                <Typography sx={{ mb: 1, color: "#555" }}>{internship.company}</Typography>
                <Typography sx={{ mb: 1, color: "#777" }}>
                  Duration: {internship.duration}
                </Typography>
                <Typography sx={{ mb: 2, color: "#777" }}>Location: {internship.location}</Typography>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#43A047", "&:hover": { backgroundColor: "#66BB6A" } }}
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
