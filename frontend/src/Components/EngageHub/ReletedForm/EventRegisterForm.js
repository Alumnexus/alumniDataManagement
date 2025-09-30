// src/components/ReletedForm/EventRegisterForm.jsx
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import { QRCodeCanvas } from "qrcode.react"; // ✅ Correct import

export default function EventRegisterForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });

  const [qrData, setQrData] = useState(""); // store generated QR data

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  // Validation for empty fields
  if (!formData.name || !formData.email || !formData.whatsapp) {
    alert("All fields are required!");
    return;
  }

  // WhatsApp number must be exactly 10 digits
  const whatsappRegex = /^[0-9]{10}$/;
  if (!whatsappRegex.test(formData.whatsapp)) {
    alert("WhatsApp number must be exactly 10 digits!");
    return;
  }

  // Generate unique QR code data
  const uniqueData = {
    registrationId: Date.now(),
    name: formData.name,
    email: formData.email,
    whatsapp: formData.whatsapp,
  };

  setQrData(JSON.stringify(uniqueData));
  console.log("Generated QR Data:", uniqueData);
};


  const handleDownloadQR = () => {
    const canvas = document.querySelector("canvas");
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `${formData.name}_QRCode.png`;
    link.click();
  };

  return (
    <Box
      sx={{
        width: 400,
        p: 4,
        backgroundColor: "#fff",
        borderRadius: 3,
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        mx: "auto",
        textAlign: "center",
      }}
    >
      {!qrData ? (
        <>
          <Typography
            variant="h5"
            sx={{ mb: 3, color: "#1976D2", textAlign: "center", fontWeight: "bold" }}
          >
            Event Registration
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
              />


            <TextField
              label="WhatsApp Number"
              name="whatsapp"
              type="number"
              value={formData.whatsapp}
              onChange={(e) => {
                const value = e.target.value;
                // Allow only up to 10 digits
                if (value.length <= 10) {
                  setFormData((prev) => ({ ...prev, whatsapp: value }));
                }
              }}
              required
              fullWidth
              helperText="Enter a valid 10-digit WhatsApp number"
            />

              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#1976D2", textTransform: "none" }}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                sx={{ textTransform: "none" }}
                onClick={onClose}
              >
                Cancel
              </Button>
            </Stack>
          </form>
        </>
      ) : (
        // QR Code Section
        <Box>
          <Typography variant="h6" sx={{ color: "#1976D2", mb: 2 }}>
            Registration Successful!
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Scan this QR Code to verify your registration.
          </Typography>

          {/* Display QR Code */}
          <QRCodeCanvas value={qrData} size={200} includeMargin={true} />

          <Stack spacing={2} sx={{ mt: 3 }}>
            <Button
              variant="outlined"
              sx={{ textTransform: "none" }}
              onClick={handleDownloadQR}
            >
              Download QR Code
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#1976D2", textTransform: "none" }}
              onClick={onClose}
            >
              Close
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
}