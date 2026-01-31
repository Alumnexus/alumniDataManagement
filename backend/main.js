import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import multer from "multer";
import { storage } from "./Config/cloudinary.js";
import Alumni from "./models/Alumni.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "./models/Admin.js";
import Student from "./models/Student.js";

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
// app.use(alumniRoutes);

app.post("/api/alumni/register", async (req, res) => {
  try {
    const { username, email, enrollmentNumber, linkedIn, isMentor, password } = req.body;

    // 1. Check if user already exists
    const existingAlumni = await Alumni.findOne({ 
      $or: [{ email }, { enrollmentNumber }] 
    });
    
    if (existingAlumni) {
      return res.status(400).json({ 
        message: "Email or Enrollment Number already registered." 
      });
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create new Alumni
    const newAlumni = new Alumni({
      username,
      email,
      enrollmentNumber,
      linkedIn,
      isMentor,
      password: hashedPassword,
    });

    await newAlumni.save();

    // 4. Generate JWT Token (Login the user immediately)
    const token = jwt.sign(
      { id: newAlumni._id }, 
      process.env.JWT_SECRET || "your_jwt_secret_key", 
      { expiresIn: "1d" }
    );

    // 5. Send response (excluding password)
    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: newAlumni._id,
        username: newAlumni.username,
        email: newAlumni.email,
        isMentor: newAlumni.isMentor,
        role: "alumni"
      }
    });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

app.post("/api/admin/register", async (req, res) => {
  try {
    const { username, email, permission, collegeDeptName, collegeCode, password } = req.body;

    // 1. Check if Admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin with this email already exists." });
    }

    // 2. Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create Admin
    const newAdmin = new Admin({
      username,
      email,
      permission,
      collegeDeptName,
      collegeCode,
      password: hashedPassword,
    });

    await newAdmin.save();

    // 4. Generate JWT Token for immediate login
    const token = jwt.sign(
      { id: newAdmin._id, role: "admin" },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1d" }
    );

    // 5. Send Response
    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      token,
      user: {
        id: newAdmin._id,
        username: newAdmin.username,
        email: newAdmin.email,
        permission: newAdmin.permission,
        role: "admin"
      }
    });
  } catch (error) {
    console.error("Admin Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/student/register", async (req, res) => {
  try {
    const { username, email, enrollmentNumber, linkedIn, password } = req.body;

    // 1. Check if student already exists
    const existingStudent = await Student.findOne({ 
      $or: [{ email }, { enrollmentNumber }] 
    });
    
    if (existingStudent) {
      return res.status(400).json({ message: "Email or Enrollment Number already registered." });
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create Student
    const newStudent = new Student({
      username,
      email,
      enrollmentNumber,
      linkedIn,
      password: hashedPassword,
    });

    await newStudent.save();

    // 4. Generate JWT Token (Logs the user in automatically)
    const token = jwt.sign(
      { id: newStudent._id, role: "student" },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1d" }
    );

    res.status(201).json({
      success: true,
      message: "Student registered successfully!",
      token,
      user: {
        id: newStudent._id,
        username: newStudent.username,
        email: newStudent.email,
        role: "student"
      }
    });

  } catch (error) {
    console.error("Student Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;
    // 1. Identify which collection to search based on role
    if (role === "student") user = await Student.findOne({ email });
    else if (role === "admin") user = await Admin.findOne({ email });
    else if (role === "alumni") user = await Alumni.findOne({ email });

    // 2. Check if user exists
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid Email or Role" });
    }

    // 3. Compare Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid Password" });
    }

    // 4. Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: role },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1d" }
    );

    // 5. Send response
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
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