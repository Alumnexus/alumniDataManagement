import express from 'express';
import mongoose from 'mongoose';
import Internship from './models/Internship.js';
import Event from './models/Event.js';
import Alumni from './models/Alumni.js';
import Job from './models/Job.js'
import 'dotenv/config';
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


const dburl = process.env.DATABASE_URL;

mongoose
  .connect(dburl)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });


app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/get/intern/data', async(req, res)=>{
  try{
    const internData = await Internship.find({});
    
    return res.status(200).json({
      message: "Hello i am haring",
      data: internData
    })
  }catch(err){
    console.log(err);
  }
})

app.get("/api/get/event", async (req, res) => {
  try {
    const events = await Event.find({});
    console.log(events);

    return res.status(200).json({
      message: "Your data is fetched",
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch events"
    });
  }
});

app.get("/get/job/data", async (req, res) => {
  try {
    const jobs = await Job.find({});
    console.log(jobs);

    return res.status(200).json({
      message: "Your data is fetched",
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch events"
    });
  }
});

app.post("/api/alumni/register", async (req, res) => {
  console.log("Hello i am hearing");
  try {
    const {
      username,
      email,
      degree,
      department,
      graduationYear,
      currentJob,
      title,
      company,
      linkedIn,
      isMentor,
      password
    } = req.body;

    // 1️⃣ Validate required fields
    if (!username || !email || !degree || !department || !graduationYear || !password) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled"
      });
    }

    // 2️⃣ Check if email exists
    const existingAlumni = await Alumni.findOne({ email });
    if (existingAlumni) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Save alumni
    const alumni = await Alumni.create({
      username,
      email,
      degree,
      department,
      graduationYear,
      currentJob,
      title,
      company,
      linkedIn,
      isMentor,
      password: hashedPassword
    });

    // 5️⃣ Generate JWT (AUTO LOGIN)
    const token = jwt.sign(
      { id: alumni._id, role: alumni.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 6️⃣ Send response
    return res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: {
        id: alumni._id,
        username: alumni.username,
        email: alumni.email,
        role: alumni.role
      }
    });

  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});



const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})