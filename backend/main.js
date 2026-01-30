import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Models
import Internship from "./models/Internship.js";
import Event from "./models/Event.js";
import Alumni from "./models/Alumni.js";
import Student from "./models/Student.js";
import Job from "./models/Job.js";

const app = express();

/* -------------------- MIDDLEWARE -------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

/* -------------------- DATABASE -------------------- */
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) =>
    console.error("❌ MongoDB connection failed:", err.message)
  );

/* -------------------- TEST ROUTE -------------------- */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* -------------------- INTERNSHIP -------------------- */
app.get("/get/intern/data", async (req, res) => {
  try {
    const internData = await Internship.find({});
    res.status(200).json({
      success: true,
      data: internData
    });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* -------------------- EVENTS -------------------- */
app.get("/api/get/event", async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch events"
    });
  }
});

/* -------------------- JOBS -------------------- */
app.get("/get/job/data", async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs"
    });
  }
});

/* ==================================================
   ALUMNI REGISTRATION
================================================== */
app.post("/api/alumni/register", async (req, res) => {
  try {
    const {
      username,
      email,
      enrollmentNumber,
      linkedIn,
      isMentor,
      password
    } = req.body;

    if (!username || !email || !enrollmentNumber || !password) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled"
      });
    }

    const existingAlumni = await Alumni.findOne({ email });
    if (existingAlumni) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const alumni = await Alumni.create({
      username,
      email,
      enrollmentNumber,
      linkedIn,
      isMentor,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: alumni._id, role: alumni.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "Alumni registered successfully",
      token,
      user: {
        id: alumni._id,
        username: alumni.username,
        email: alumni.email,
        isMentor: alumni.isMentor
      }
    });
  } catch (error) {
    console.error("Alumni register error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

/* ==================================================
   STUDENT REGISTRATION
================================================== */
app.post("/api/student/register", async (req, res) => {
  try {
    const {
      username,
      email,
      enrollmentNumber,
      linkedIn,
      password
    } = req.body;

    if (!username || !email || !enrollmentNumber || !password) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled"
      });
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      username,
      email,
      enrollmentNumber,
      linkedIn,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: student._id, role: student.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      token,
      user: {
        id: student._id,
        username: student.username,
        email: student.email,
        role: student.role
      }
    });
  } catch (error) {
    console.error("Student register error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

/* -------------------- SERVER -------------------- */
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
