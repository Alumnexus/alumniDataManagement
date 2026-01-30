import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import multer from "multer";
import { storage } from "./Config/cloudinary.js";
import Internship from "./models/Internship.js";
import Job from "./models/Job.js"

// Import Models
import Event from "./models/Event.js"; // Ensure this file uses 'export default'

// Routes
import internshipRoutes from "./routes/internshipRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import alumniRoutes from "./routes/alumniRoutes.js";

const app = express();
const upload = multer({ storage: storage });

/* ================= Middleware ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

/* ================= Routes ================= */
app.get("/", (req, res) => {
  res.send("Alumni Management API is running...");
});

// Existing routes
app.use(internshipRoutes);
app.use(eventRoutes);
app.use(jobRoutes);
app.use(alumniRoutes);

/**
 * Route: POST /save/event/data
 * Logic: Merged directly into main entry point
 */
app.post("/save/event/data", upload.single("eventFile"), async (req, res) => {
  try {
    // 1. Check if Cloudinary upload succeeded
    if (!req.file) {
      return res.status(400).json({ error: "Event file is required." });
    }

    const {
      title,
      description,
      date,
      location,
      maxAttendees,
      organization,
      category,
      visibility,
    } = req.body;

    // 2. Create the instance using keys that match your Model exactly
    const newEvent = new Event({
      title,
      description,
      date,
      location,
      maxAttendees: maxAttendees ? parseInt(maxAttendees) : 0,
      organization,
      category,     // Must match one of the enum values in your model
      visibility,   // Must match one of the enum values in your model
      eventFileUrl: req.file.path, // ✅ Matches your schema key
    });

    // 3. Save to MongoDB
    await newEvent.save();

    res.status(201).json({
      success: true,
      message: "Event created successfully!",
      data: newEvent,
    });
  } catch (error) {
    console.error("Backend Error:", error);

    // If there's a validation error (like category enum mismatch)
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ error: messages.join(", ") });
    }

    res.status(500).json({ error: "Internal Server Error." });
  }
});

app.post("/api/internships", async (req, res) => {
  try {
    // 1. Destructure data from req.body
    const { 
      title, 
      company, 
      description, 
      skills, 
      location, 
      stipend, 
      duration 
    } = req.body;

    // 2. Server-side Validation
    if (!title || !company || !description || !skills) {
      return res.status(400).json({ 
        success: false, 
        error: "All required fields (Title, Company, Skills, Description) must be filled." 
      });
    }

    // 3. Create and Save to MongoDB
    // Using the Internship model imported at the top of your file
    const newInternship = new Internship({
      title,
      company,
      description,
      skills,
      location,
      stipend,
      duration,
    });

    await newInternship.save();

    // 4. Send success response
    res.status(201).json({
      success: true,
      message: "Internship posted successfully!",
      data: newInternship,
    });
  } catch (error) {
    console.error("Internship Backend Error:", error);
    
    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, error: error.message });
    }

    res.status(500).json({ 
      success: false, 
      error: "Internal Server Error. Could not save internship." 
    });
  }
});

app.post("/api/jobs", async (req, res) => {
  try {
    const { 
      title, 
      company, 
      location, 
      salary, 
      type, 
      skill, 
      availablePosts, 
      description 
    } = req.body;

    // Server-side validation
    if (!title || !company || !location || !type || !skill || !availablePosts || !description) {
      return res.status(400).json({ 
        success: false, 
        error: "Please provide all required fields." 
      });
    }

    const newJob = new Job({
      title,
      company,
      location,
      salary,
      type,
      skill,
      availablePosts: parseInt(availablePosts),
      description,
    });

    await newJob.save();

    res.status(201).json({
      success: true,
      message: "Job posted successfully!",
      data: newJob,
    });
  } catch (error) {
    console.error("Job Save Error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Internal Server Error. Could not save job." 
    });
  }
});

/* ================= Database & Server ================= */
const PORT = process.env.PORT || 5000; // Match your frontend's expected port

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err.message));