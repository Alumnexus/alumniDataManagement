import express from 'express';
import mongoose from 'mongoose';
import Internship from './models/Internship.js';
import Event from './models/Event.js';
import Job from './models/Job.js'
import 'dotenv/config';
import cors from "cors";

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

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})