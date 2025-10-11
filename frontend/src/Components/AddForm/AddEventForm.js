import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  IconButton,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AddEventForm({ onSubmit }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    maxAttendees: "",
    createdBy: "",
    course: "", // ✅ Added
    organization: "", // ✅ Added
    category: "",
    visibility: "",
    eventFile: null,
  });

  const [preview, setPreview] = useState(null);

  const categories = [
    "All Events",
    "Workshop",
    "Fest",
    "Webinar",
    "Orientation",
    "Other",
  ];

  const visibilityOptions = [
    "Open to All",
    "Open to all within Organization",
    "Only within Same Course",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!allowedTypes.includes(file.type)) {
        alert("Only JPG, PNG, or PDF files are allowed!");
        e.target.value = "";
        return;
      }

      setFormData((prev) => ({ ...prev, eventFile: file }));

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    }
  };

  const handleRemoveFile = () => {
    setFormData((prev) => ({ ...prev, eventFile: null }));
    setPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.date ||
      !formData.createdBy ||
      !formData.course ||
      !formData.organization ||
      !formData.eventFile ||
      !formData.category ||
      !formData.visibility
    ) {
      alert("All required fields must be filled out!");
      return;
    }

    const dataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      dataToSend.append(key, value)
    );

    console.log("Form Submitted:", Object.fromEntries(dataToSend));
    if (onSubmit) onSubmit(dataToSend);
  };

  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: "650px",
        mx: "auto",
        mt: 4,
        p: 4,
        borderRadius: 3,
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        maxHeight: "90vh",
        overflowY: "auto", // ✅ makes form scrollable
      }}
    >
      {/* 🔙 Back Arrow Button */}
      <IconButton
        onClick={() => navigate("/events")}
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          color: "#1976D2",
          backgroundColor: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          "&:hover": { backgroundColor: "rgba(25,118,210,0.1)" },
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Typography
        variant="h4"
        sx={{ mb: 3, color: "#1976D2", textAlign: "center" }}
      >
        Add New Event
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />
          <TextField
            label="Date & Time"
            name="date"
            type="datetime-local"
            value={formData.date}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Maximum Attendees"
            name="maxAttendees"
            type="number"
            value={formData.maxAttendees}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Created By (User ID)"
            name="createdBy"
            value={formData.createdBy}
            onChange={handleChange}
            required
            fullWidth
          />

          {/* ✅ Added New Fields */}
          <TextField
            label="Course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="Organization Name"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            required
            fullWidth
          />

          {/* ✅ Category Dropdown */}
          <TextField
            select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            fullWidth
          >
            {categories.map((cat, index) => (
              <MenuItem key={index} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          {/* ✅ Visibility Dropdown */}
          <TextField
            select
            label="Visibility"
            name="visibility"
            value={formData.visibility}
            onChange={handleChange}
            required
            fullWidth
          >
            {visibilityOptions.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          {/* File Upload */}
          <Box>
            <Typography sx={{ mb: 1, fontWeight: 500 }}>
              Event Application (PDF or Image) *
            </Typography>
            <Box
              sx={{
                border: "2px dashed #1976D2",
                borderRadius: 3,
                p: 3,
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(25, 118, 210, 0.05)",
                  borderColor: "#115293",
                },
                position: "relative",
              }}
              onClick={() => document.getElementById("eventFileInput").click()}
            >
              <CloudUploadIcon sx={{ fontSize: 40, color: "#1976D2", mb: 1 }} />
              <Typography variant="body1" color="textSecondary">
                {formData.eventFile
                  ? `Selected: ${formData.eventFile.name}`
                  : "Click or Drag & Drop to upload"}
              </Typography>

              <input
                type="file"
                id="eventFileInput"
                accept=".pdf, image/png, image/jpeg"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

              {formData.eventFile && (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "#fff",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              )}
            </Box>

            {preview && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Image Preview:
                </Typography>
                <img
                  src={preview}
                  alt="Event Preview"
                  style={{
                    width: "100%",
                    maxHeight: "220px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                />
              </Box>
            )}
          </Box>

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#1976D2",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#115293" },
            }}
          >
            Add Event
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
