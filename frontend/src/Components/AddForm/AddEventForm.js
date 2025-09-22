import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import dayjs from "dayjs";

export default function AddEventForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    maxAttendees: "",
    createdBy: "", // ideally, get current user ID
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title || !formData.date || !formData.createdBy) {
      alert("Title, Date, and Created By are required!");
      return;
    }

    // Convert maxAttendees to number
    const dataToSend = {
      ...formData,
      maxAttendees: formData.maxAttendees ? Number(formData.maxAttendees) : undefined,
      date: new Date(formData.date),
    };

    console.log("Form Submitted:", dataToSend);
    if (onSubmit) onSubmit(dataToSend); // send data to parent or API
  };

  return (
    <Box
      sx={{
        maxWidth: "600px",
        mx: "auto",
        mt: 4,
        p: 4,
        borderRadius: 3,
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, color: "#1976D2", textAlign: "center" }}>
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

          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#1976D2", textTransform: "none" }}
          >
            Add Event
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
