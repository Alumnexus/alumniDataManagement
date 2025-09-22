import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

const mentors = [
  {
    name: "Amit Sharma",
    role: "Software Engineer",
    company: "Google",
    expertise: ["Frontend Development", "React", "JavaScript"],
    experience: "5 years",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Priya Verma",
    role: "Data Scientist",
    company: "Microsoft",
    expertise: ["Machine Learning", "AI", "Python"],
    experience: "7 years",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "Ravi Kumar",
    role: "Product Manager",
    company: "Amazon",
    expertise: ["Product Management", "Leadership", "Strategy"],
    experience: "8 years",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
  },
  {
    name: "Neha Gupta",
    role: "Cybersecurity Expert",
    company: "IBM",
    expertise: ["Cybersecurity", "Networking", "Ethical Hacking"],
    experience: "6 years",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
  },
];

export default function MentorshipPage() {
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
          color: "#1976D2",
          mb: 4,
          fontWeight: "bold",
        }}
      >
        Mentorship Program
      </Typography>
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          color: "#555",
          mb: 6,
          maxWidth: "700px",
          mx: "auto",
        }}
      >
        Connect with experienced alumni mentors to get career guidance, skill
        development, and industry insights.
      </Typography>

      {/* Mentors Grid */}
      <Grid container spacing={4} justifyContent="center">
        {mentors.map((mentor, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                background: "#fff",
                borderRadius: 3,
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                textAlign: "center",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                },
              }}
            >
              <CardContent>
                {/* Avatar */}
                <Avatar
                  src={mentor.avatar}
                  alt={mentor.name}
                  sx={{
                    width: 80,
                    height: 80,
                    mx: "auto",
                    mb: 2,
                    border: "3px solid #1976D2",
                  }}
                />
                {/* Mentor Name */}
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  {mentor.name}
                </Typography>
                <Typography sx={{ color: "#555" }}>{mentor.role}</Typography>
                <Typography sx={{ color: "#777", mb: 1 }}>
                  {mentor.company}
                </Typography>

                {/* Experience */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    mb: 2,
                    color: "#555",
                  }}
                >
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <WorkOutlineIcon fontSize="small" />
                    <Typography variant="body2">{mentor.experience}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <SchoolIcon fontSize="small" />
                    <Typography variant="body2">
                      {mentor.expertise.length} Skills
                    </Typography>
                  </Box>
                </Box>

                {/* Expertise Tags */}
                <Box sx={{ mb: 2 }}>
                  {mentor.expertise.map((skill, i) => (
                    <Typography
                      key={i}
                      component="span"
                      sx={{
                        display: "inline-block",
                        backgroundColor: "#E3F2FD",
                        color: "#1976D2",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: "20px",
                        fontSize: "0.8rem",
                        mx: 0.5,
                      }}
                    >
                      {skill}
                    </Typography>
                  ))}
                </Box>

                {/* Connect Button */}
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#1976D2",
                    "&:hover": { backgroundColor: "#1565C0" },
                    fontWeight: "bold",
                  }}
                >
                  Connect
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
