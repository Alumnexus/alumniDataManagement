import React, { useState, useEffect } from "react";
import { 
  Box, Typography, Grid, Card, CardContent, Avatar, Button, TextField 
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import axios from "axios";
import { backendAPI } from "../middleware.js";

export default function AlumniDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [alumniList, setAlumniList] = useState([]);

  // Fetch all alumni on component mount
  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const api = backendAPI();
        const res = await axios.get(`${api}/api/alumni`);
        if (res.data.success) {
          setAlumniList(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching alumni:", error);
      }
    };
    fetchAlumni();
  }, []);

  // Filter alumni based on search (matching your DB fields)
  const filteredAlumni = alumniList.filter((alumni) => {
    const query = searchQuery.toLowerCase();
    return (
      alumni.username?.toLowerCase().includes(query) ||
      alumni.department?.toLowerCase().includes(query) ||
      alumni.company?.toLowerCase().includes(query)
    );
  });

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6, backgroundColor: "#f9fafc", minHeight: "100vh" }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, flexWrap: "wrap", gap: 2 }}>
        <Typography variant="h3" sx={{ color: "#0D47A1", fontWeight: "bold" }}>
          Alumni Directory
        </Typography>

        <Button
          variant="contained"
          startIcon={<FavoriteIcon />}
          sx={{
            textTransform: "none", fontWeight: "bold", fontSize: "1.2rem",
            padding: "10px 24px", background: "linear-gradient(45deg, #FF6B6B, #FF3D00)",
            "&:hover": { transform: "scale(1.05)" },
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          }}
          onClick={() => window.location.href = "/donate"}
        >
          Donate
        </Button>
      </Box>

      {/* Search Bar */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search by name, department, or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ maxWidth: 600, backgroundColor: "#fff", borderRadius: 2 }}
        />
      </Box>

      {/* Alumni Grid */}
      <Grid container spacing={4} justifyContent="center">
        {filteredAlumni.length > 0 ? (
          filteredAlumni.map((alumni) => (
            <Grid item xs={12} sm={6} md={4} key={alumni._id}>
              <Card sx={{
                borderRadius: 3, textAlign: "center", transition: "0.3s",
                "&:hover": { transform: "translateY(-8px)", boxShadow: "0 8px 25px rgba(0,0,0,0.2)" }
              }}>
                <CardContent>
                  <Avatar
                    src={alumni.avatar}
                    sx={{ width: 80, height: 80, mx: "auto", mb: 2, border: "3px solid #0D47A1" }}
                  >
                    {alumni.username?.charAt(0)}
                  </Avatar>

                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {alumni.username}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#777", mb: 1 }}>
                    {alumni.department || "General"} • Class of {alumni.graduationYear || "N/A"}
                  </Typography>

                  <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2, color: "#555" }}>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <WorkOutlineIcon fontSize="small" />
                      <Typography variant="body2">{alumni.jobRole || "Alumni"}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <BusinessCenterIcon fontSize="small" />
                      <Typography variant="body2">{alumni.company || "N/A"}</Typography>
                    </Box>
                  </Box>

                  <Button
                    variant="contained"
                    startIcon={<LinkedInIcon />}
                    href={alumni.linkedIn}
                    target="_blank"
                    sx={{ backgroundColor: "#0A66C2", textTransform: "none" }}
                  >
                    Connect
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ color: "#777", mt: 4 }}>No results found.</Typography>
        )}
      </Grid>
    </Box>
  );
}