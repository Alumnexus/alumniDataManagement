import {
  Typography,
  Box,
} from "@mui/material";
export default function About() {
  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 6, sm: 8, md: 10 },
        bgcolor: "linear-gradient(135deg,#E3F2FD,#FFFFFF)",
        minHeight: "100vh",
      }}
    >
      {/* Title */}
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontWeight: "bold",
          mb: 1,
          color: "#0D47A1",
        }}
      >
        About the Problem
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        sx={{ mb: 6, color: "text.secondary", maxWidth: 700, mx: "auto" }}
      >
        Centralized alumni data and engagement platform for institutions
      </Typography>

      {/* Problem description in a card */}
      <Box
        sx={{
          maxWidth: 900,
          mx: "auto",
          mb: 6,
          p: 4,
          backgroundColor: "#ffffff",
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, color: "#0D47A1" }}>
          Problem Description
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
          Most educational institutions lack a reliable, centralized system to manage alumni data.
          After graduation, contact information, academic records, and career updates are scattered or lost.
          Communication often relies on informal groups or outdated mailing lists, making long-term engagement difficult.
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
          This absence of structure limits mentorship, internships, fundraising and outreach.
          In a digitally connected world, this creates a significant gap in growth.
        </Typography>
      </Box>

      {/* Three impact cards */}
      <Typography
        variant="h5"
        align="center"
        sx={{ mb: 3, color: "#0D47A1", fontWeight: "bold" }}
      >
        Why This Needs to Be Solved
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", md: "repeat(4,1fr)" },
          gap: 3,
          mb: 6,
          maxWidth: 1100,
          mx: "auto",
        }}
      >
        {[
          "Strengthen alumni engagement",
          "Provide mentorship and internships",
          "Enhance fundraising potential",
          "Boost credibility and community building",
        ].map((text, i) => (
          <Box
            key={i}
            sx={{
              background: "linear-gradient(135deg,#BBDEFB,#E3F2FD)",
              p: 3,
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
              {text}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Expected outcomes cards */}
      <Typography
        variant="h5"
        align="center"
        sx={{ mb: 3, color: "#0D47A1", fontWeight: "bold" }}
      >
        Expected Outcomes
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)" },
          gap: 3,
          maxWidth: 900,
          mx: "auto",
          mb: 6,
        }}
      >
        {[
          "Centralized alumni management platform",
          "Communication, networking & event features",
          "Secure tracking of careers, mentorships, donations",
          "Easy-to-use interface for admins & alumni",
        ].map((text, i) => (
          <Box
            key={i}
            sx={{
              backgroundColor: "#ffffff",
              p: 3,
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <Typography variant="body1">{text}</Typography>
          </Box>
        ))}
      </Box>

      {/* Stakeholders */}
      <Typography
        variant="h5"
        align="center"
        sx={{ mb: 3, color: "#0D47A1", fontWeight: "bold" }}
      >
        Stakeholders / Beneficiaries
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)" },
          gap: 3,
          maxWidth: 900,
          mx: "auto",
        }}
      >
        <Box
          sx={{
            p: 3,
            backgroundColor: "#ffffff",
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            Primary
          </Typography>
          <ul style={{ paddingLeft: "1rem" }}>
            <li>Alumni</li>
            <li>Current students (mentorship/internships)</li>
            <li>Faculty & administrators</li>
          </ul>
        </Box>
        <Box
          sx={{
            p: 3,
            backgroundColor: "#ffffff",
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            Secondary
          </Typography>
          <ul style={{ paddingLeft: "1rem" }}>
            <li>College / university management bodies</li>
            <li>Employers & recruiters</li>
          </ul>
        </Box>
      </Box>
    </Box>
  );
}
