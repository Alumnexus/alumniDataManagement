import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useNavigate } from "react-router-dom";
import { backendAPI } from "../middleware";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
  
const skillCategories = ["All", "Web Development", "AI/ML", "Design", "Cloud & DevOps", "Mobile Development", "Cybersecurity"];

export default function JobPage() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("All");
  const [jobs, setJobs] = useState([]);
  const location = useLocation();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleFilterSelect = (skill) => {
    setCurrentFilter(skill);
    handleMenuClose();
  };

  const findinternData = async() =>{
    try{ 
      const api = backendAPI();
      const res = await axios.get(`${api}/get/job/data`)
      setJobs(res.data.data)
    }catch(err){
      console.log("Some error is happend", err);
    }
  }

  useEffect(() => {
    findinternData()
  }, [location.state]);
  
  // **FIXED**: This handler now correctly passes the job data to the next page.
  const handleApplyClick = (job) => {
    navigate(`/apply/job/${job.id}`, { state: { job } });
  };

  const handleAddBtn =()=>{
    navigate('/add/a/new/job');
  }

  const filteredJobs = jobs.filter((job) => {
    if (currentFilter === "All") return true;
    return job.skill === currentFilter;
  });

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* === HEADER === */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4, flexWrap: "wrap", gap: 2 }}>
        <Typography variant="h3" sx={{ color: "#FF6F00", fontWeight: "bold", flexGrow: 1 }}>
          Job Opportunities
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton aria-label="filter jobs" onClick={handleMenuOpen} sx={{ border: "1px solid #ddd" }}>
            <FilterListIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            {skillCategories.map((skill) => (
              <MenuItem key={skill} selected={skill === currentFilter} onClick={() => handleFilterSelect(skill)}>
                {skill}
              </MenuItem>
            ))}
          </Menu>
          <Button 
           variant="contained" 
           startIcon={<AddIcon />} 
           sx={{ 
             backgroundColor: "#FF6F00", 
             "&:hover": { backgroundColor: "#FF8F00" }, 
             textTransform: "none", 
             fontWeight: "bold", 
             py: 1, 
             px: 2 
             }} 
            onClick={() => handleAddBtn()}>
            Add Job
          </Button>
        </Stack>
      </Box>

      {/* === JOB CARDS GRID === */}
      <Grid container spacing={4} justifyContent="center">
        {filteredJobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <Card sx={{ background: "white", borderRadius: 3, boxShadow: "0 4px 15px rgba(0,0,0,0.1)", transition: "transform 0.3s, box-shadow 0.3s", "&:hover": { transform: "scale(1.05)", boxShadow: "0 8px 25px rgba(0,0,0,0.2)" }, height: "100%", display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333", mb: 1 }}>{job.title}</Typography>
                <Typography sx={{ mb: 1, color: "#555" }}>{job.company}</Typography>
                <Typography sx={{ mb: 1, color: "#777" }}>Location: {job.location}</Typography>
                <Typography sx={{ mb: 1, color: "#777" }}>Salary: {job.salary}</Typography>
                <Typography sx={{ mb: 2, color: job.type === "Full-Time" ? "#43A047" : "#FF6F00", fontWeight: "bold" }}>
                  {job.type} — {job.skill}
                </Typography>
                <Button variant="contained" sx={{ backgroundColor: "#FF6F00", "&:hover": { backgroundColor: "#FF8F00" } }}
                  onClick={() => handleApplyClick(job)}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {filteredJobs.length === 0 && (
          <Typography sx={{ textAlign: "center", width: "100%", mt: 4, color: "#777" }}>
            No jobs found for this category.
          </Typography>
        )}
      </Grid>
    </Box>
  );
}