import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

// Routes
import authRoutes from "./routes/authRoutes.js";
import internshipRoutes from "./routes/internshipRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

/* ================= ROUTES ================= */
app.get("/", (req, res) => {
  res.send("Alumni Management API is running...");
});

app.use("/api", authRoutes);
app.use(internshipRoutes);
app.use(eventRoutes);
app.use(jobRoutes);

/* ================= DATABASE & SERVER ================= */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
