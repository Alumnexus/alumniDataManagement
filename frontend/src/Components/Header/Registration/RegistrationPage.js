import React, { useState } from "react";
import AlumniRegistrationForm from "./AlumniRegistrationForm";
import StudentRegistrationForm from "./StudentRegistrationForm";
import AdminRegistrationForm from "./AdminRegistrationForm";
import { Container, Paper, Typography, Button, Stack, Box } from "@mui/material";

const userTypes = [
  { label: "Alumni", component: <AlumniRegistrationForm /> },
  { label: "Student", component: <StudentRegistrationForm /> },
  { label: "Admin", component: <AdminRegistrationForm /> },
];

const RegistrationPage = () => {
  const [selectedUserType, setSelectedUserType] = useState(null);

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        paddingY: 4,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          padding: 4,
          borderRadius: 3,
          maxHeight: "80vh",
          overflowY: "auto",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Register as:
        </Typography>

        {/* User Type Buttons */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
          marginBottom={3}
          flexWrap="wrap"
        >
          {userTypes.map((type) => (
            <Button
              key={type.label}
              variant={selectedUserType === type.label ? "contained" : "outlined"}
              color="success"
              onClick={() => setSelectedUserType(type.label)}
            >
              {type.label}
            </Button>
          ))}
        </Stack>

        {/* Render the selected registration form */}
        <Box>
          {userTypes.find((type) => type.label === selectedUserType)?.component}
        </Box>
      </Paper>
    </Container>
  );
};

export default RegistrationPage;
