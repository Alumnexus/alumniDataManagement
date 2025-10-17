// src/components/ReletedForm/EventRegisterForm.jsx
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";

export default function EventRegisterForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    course: "",
    organization: "",
    idType: "registration",
    idValue: "",
  });

  const [qrData, setQrData] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.whatsapp ||
      !formData.course ||
      !formData.organization ||
      !formData.idValue
    ) {
      alert("All fields are required!");
      return;
    }

    const whatsappRegex = /^[0-9]{10}$/;
    if (!whatsappRegex.test(formData.whatsapp)) {
      alert("WhatsApp number must be exactly 10 digits!");
      return;
    }

    if (formData.idType === "registration" && !/^[0-9]+$/.test(formData.idValue)) {
      alert("Registration number must be numeric!");
      return;
    }

    if (formData.idType === "enrollment" && !/^[A-Za-z0-9\\/\\/-]+$/.test(formData.idValue)) {
      alert("Enrollment number can only include letters, numbers, and the characters \\ / -");
      return;
    }

    const uniqueData = {
      registrationId: Date.now(),
      ...formData,
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
        width: "90%",
        maxWidth: 420,
        maxHeight: "85vh",
        overflowY: "auto",
        p: 4,
        backgroundColor: "#fff",
        borderRadius: 3,
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        mx: "auto",
        mt: 4,
        textAlign: "center",
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#1976D2",
          borderRadius: "10px",
        },
      }}
    >
      {!qrData ? (
        <>
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              color: "#1976D2",
              textAlign: "center",
              fontWeight: "bold",
            }}
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
                  if (value.length <= 10) {
                    setFormData((prev) => ({ ...prev, whatsapp: value }));
                  }
                }}
                required
                fullWidth
                helperText="Enter a valid 10-digit WhatsApp number"
              />
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
              <Box textAlign="left">
                <FormLabel component="legend">Select ID Type</FormLabel>
                <RadioGroup
                  row
                  name="idType"
                  value={formData.idType}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      idType: e.target.value,
                      idValue: "",
                    }));
                  }}
                >
                  <FormControlLabel
                    value="registration"
                    control={<Radio />}
                    label="Registration Number"
                  />
                  <FormControlLabel
                    value="enrollment"
                    control={<Radio />}
                    label="Enrollment Number"
                  />
                </RadioGroup>
              </Box>
              <TextField
                label={
                  formData.idType === "registration"
                    ? "Registration Number"
                    : "Enrollment Number"
                }
                name="idValue"
                type={formData.idType === "registration" ? "number" : "text"}
                value={formData.idValue}
                onChange={handleChange}
                required
                fullWidth
                helperText={
                  formData.idType === "registration"
                    ? "Enter numeric registration number"
                    : "Allowed: letters, numbers, \\ / -"
                }
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
        <Box>
          <Typography variant="h6" sx={{ color: "#1976D2", mb: 2 }}>
            Registration Successful!
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Scan this QR Code to verify your registration.
          </Typography>
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
