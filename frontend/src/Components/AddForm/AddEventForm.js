// ... previous imports
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  IconButton,
  MenuItem,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import AlertMessage from "../Utils/AlertMessage";

export default function AddEventForm({ onSubmit }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    maxAttendees: "",
    createdBy: "",
    course: "",
    organization: "",
    category: "",
    visibility: "",
    eventFile: null,
  });

  const [notification, setNotification] = useState({
    message: "",
    type: "info",
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const categories = ["Workshop", "Fest", "Webinar", "Orientation", "Other"];
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
        setNotification({
          message: "Only JPG, PNG, or PDF files are allowed!",
          type: "error",
        });
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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
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
      setNotification({
        message: "All required fields must be filled out!",
        type: "warning",
      });
      return;
    }

    setLoading(true);

    const dataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        dataToSend.append(key, value);
      }
    });

    try {
      await axios.post("http://localhost:5000/save/event/data", dataToSend);
      navigate("/events", {
        state: {
          message: "Event created successfully!",
          type: "success",
        },
      });
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "An error occurred. Please try again.";
      setNotification({
        message: errorMessage,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Loading Form...
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <AlertMessage
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "info" })}
      />
      <Box
        sx={{
          position: "relative",
          maxWidth: "650px",
          mx: "auto",
          mt: 4,
          mb: 4,
          p: 4,
          borderRadius: 3,
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <IconButton
          onClick={() => navigate("/events")}
          sx={{ position: "absolute", top: 16, left: 16, color: "#1976D2" }}
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
            {/* TextFields */}
            <TextField label="Title" name="title" value={formData.title} onChange={handleChange} required fullWidth />
            <TextField label="Description" name="description" value={formData.description} onChange={handleChange} multiline rows={3} fullWidth />
            <TextField label="Date & Time" name="date" type="datetime-local" value={formData.date} onChange={handleChange} required InputLabelProps={{ shrink: true }} fullWidth />
            <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth />
            <TextField label="Maximum Attendees" name="maxAttendees" type="number" value={formData.maxAttendees} onChange={handleChange} fullWidth />
            <TextField label="Created By (User ID)" name="createdBy" value={formData.createdBy} onChange={handleChange} required fullWidth />
            <TextField label="Course" name="course" value={formData.course} onChange={handleChange} required fullWidth />
            <TextField label="Organization Name" name="organization" value={formData.organization} onChange={handleChange} required fullWidth />
            <TextField select label="Category" name="category" value={formData.category} onChange={handleChange} required fullWidth>
              {categories.map((cat, index) => (<MenuItem key={index} value={cat}>{cat}</MenuItem>))}
            </TextField>
            <TextField select label="Visibility" name="visibility" value={formData.visibility} onChange={handleChange} required fullWidth>
              {visibilityOptions.map((option, index) => (<MenuItem key={index} value={option}>{option}</MenuItem>))}
            </TextField>

            {/* File Upload */}
            <Box>
              <Typography sx={{ mb: 1, fontWeight: 500 }}>Event Application (PDF or Image) *</Typography>
              <Box
                sx={{ border: "2px dashed #1976D2", borderRadius: 3, p: 3, textAlign: "center", cursor: "pointer", position: "relative" }}
                onClick={() => fileInputRef.current.click()}
              >
                <CloudUploadIcon sx={{ fontSize: 40, color: "#1976D2", mb: 1 }} />
                <Typography variant="body1" color="textSecondary">
                  {formData.eventFile ? `Selected: ${formData.eventFile.name}` : "Click to upload"}
                </Typography>
                <input
                  type="file"
                  ref={fileInputRef}
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
                    sx={{ position: "absolute", top: 8, right: 8 }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                )}
              </Box>
              {preview && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>Image Preview:</Typography>
                  <img src={preview} alt="Event Preview" style={{ width: "100%", maxHeight: "220px", borderRadius: "10px", objectFit: "cover" }} />
                </Box>
              )}
            </Box>

            {/* Submit Button */}
                        <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ backgroundColor: "#1976D2" }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Add Event"}
            </Button>
          </Stack>
        </form>
      </Box>

      {/* ✅ Full-screen loading overlay */}
      <Backdrop
        open={loading}
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(3px)",
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
