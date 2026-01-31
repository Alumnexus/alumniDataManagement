import React, { useState, useEffect } from "react";
import { 
  Box, Typography, Grid, Card, CardContent, Avatar, Button 
} from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SchoolIcon from "@mui/icons-material/School";
import axios from "axios";
import { backendAPI } from "../middleware.js";
import AlertMessage from "../Utils/AlertMessage";

export default function MentorshipPage() {
  const [mentors, setMentors] = useState([]); // Changed to plural to match map
  const [notification, setNotification] = useState({ message: "", type: "info" });

  const findMentor = async () => {
    try {
      const api = backendAPI();
      const res = await axios.get(`${api}/api/mentors`);
      if (res.data.success) {
        setMentors(res.data.data);
      }
    } catch (error) {
      console.log(error);
      setNotification({
        message: error.response?.data?.message || "Failed to load mentors.",
        type: "error",
      });
    }
  };

  useEffect(() => {
    findMentor();
  }, []);

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6, backgroundColor: "#f9fafc", minHeight: "100vh" }}>
      <AlertMessage
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "info" })}
      />

      <Typography variant="h3" sx={{ textAlign: "center", color: "#1976D2", mb: 4, fontWeight: "bold" }}>
        Mentorship Program
      </Typography>
      
      <Typography variant="h6" sx={{ textAlign: "center", color: "#555", mb: 6, maxWidth: "700px", mx: "auto" }}>
        Connect with experienced alumni mentors to get career guidance and industry insights.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {mentors.map((mentor, index) => (
          <Grid item xs={12} sm={6} md={4} key={mentor._id || index}>
            <Card sx={{
                background: "#fff", borderRadius: 3, boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                textAlign: "center", transition: "0.3s", "&:hover": { transform: "translateY(-8px)", boxShadow: "0 8px 25px rgba(0,0,0,0.2)" }
              }}>
              <CardContent>
                <Avatar
                  src={mentor.avatar || ""} // Fallback if no image
                  sx={{ width: 80, height: 80, mx: "auto", mb: 2, border: "3px solid #1976D2" }}
                />
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
                  {mentor.username}
                </Typography>
                <Typography sx={{ color: "#555" }}>{mentor.jobRole || "Alumni"}</Typography>
                <Typography sx={{ color: "#777", mb: 1 }}>{mentor.company || "Company N/A"}</Typography>

                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2, color: "#555" }}>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <WorkOutlineIcon fontSize="small" />
                    <Typography variant="body2">{mentor.experience || 0} Yrs</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <SchoolIcon fontSize="small" />
                    <Typography variant="body2">{(mentor.skills && mentor.skills.length) || 0} Skills</Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  {mentor.skills?.slice(0, 3).map((skill, i) => (
                    <Typography key={i} component="span" sx={{
                        display: "inline-block", backgroundColor: "#E3F2FD", color: "#1976D2",
                        px: 1.5, py: 0.5, borderRadius: "20px", fontSize: "0.8rem", m: 0.5
                      }}>
                      {skill}
                    </Typography>
                  ))}
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  component="a" // 1. Set component to anchor tag
                  href={mentor.linkedIn || "#"} // 2. Use the LinkedIn URL from DB
                  target="_blank" // 3. Open in a new tab
                  rel="noopener noreferrer" // 4. Security best practice for external links
                  disabled={!mentor.linkedIn} // 5. Disable if no link exists
                  sx={{
                    backgroundColor: "#1976D2",
                    "&:hover": { backgroundColor: "#1565C0" },
                    fontWeight: "bold",
                    textTransform: "none", // Keeps it looking like a modern button
                  }}
                >
                  {mentor.linkedIn ? "Connect on LinkedIn" : "No Profile Available"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}