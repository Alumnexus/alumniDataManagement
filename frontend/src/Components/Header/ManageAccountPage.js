import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";

export default function ManageAccountPage() {
  const [user, setUser] = useState({ username: "", email: "", password: "", isMentor: false });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser({
        username: storedUser.username,
        email: storedUser.email,
        password: storedUser.password || "",
        isMentor: storedUser.isMentor || false,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const showMessage = (msg, sev = "success") => setSnackbar({ open: true, message: msg, severity: sev });
  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const handleSave = () => {
    // Update user in localStorage
    const updatedUser = { ...user };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // Update mentors in mentorship page
    let mentors = JSON.parse(localStorage.getItem("mentors")) || [];

    if (user.isMentor) {
      // Add or update mentor
      const exists = mentors.find((m) => m.email === user.email);
      if (!exists) {
        mentors.push({
          name: user.username,
          email: user.email,
          role: "Alumni Mentor",
          company: "N/A",
          experience: "N/A",
          expertise: [],
          avatar: `https://i.pravatar.cc/150?u=${user.email}`,
        });
      } else {
        exists.name = user.username; // update name if changed
      }
    } else {
      // Remove from mentors
      mentors = mentors.filter((m) => m.email !== user.email);
    }

    localStorage.setItem("mentors", JSON.stringify(mentors));

    showMessage("Account updated successfully!");
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Typography variant="h5" gutterBottom>Manage Account</Typography>
      <Stack spacing={2}>
        <TextField label="Username" name="username" value={user.username} onChange={handleChange} fullWidth />
        <TextField label="Email" name="email" value={user.email} disabled fullWidth />
        <TextField label="Password" name="password" type="password" value={user.password} onChange={handleChange} fullWidth />
        <FormControlLabel
          control={<Checkbox name="isMentor" checked={user.isMentor} onChange={handleChange} />}
          label="Available as Mentor"
        />
        <Button variant="contained" color="primary" onClick={handleSave}>Save Changes</Button>
      </Stack>
    </Box>
  );
}
