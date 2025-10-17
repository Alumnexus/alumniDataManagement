import express, { json } from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import Event from './models/Event.js'; // Correctly import the Event model
import { v2 as cloudinary } from 'cloudinary';
import { storage } from './cloudConfig.js'; // Import storage configuration

// Load environment variables
config();

const app = express();

// ========== Middleware ==========
app.use(cors());
app.use(json());

// ========== MongoDB Connection ==========
const dburl = process.env.MONGO_URL;

async function connectDB() {
  try {
    await connect(dburl);
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  }
}
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,       // Correct key is 'cloud_name'
  api_key: process.env.CLOUD_API_KEY,      // Correct key is 'api_key'
  api_secret: process.env.CLOUD_API_SECRET, // Correct key is 'api_secret'
});
// Multer setup using the imported storage configuration
const upload = multer({ storage });

// ========== Routes ==========
app.get('/', (req, res) => {
  res.send("Server is connected 🚀");
});

// Route to get all events from the database
app.get('/api/events', async (req, res) => {
  try {
    const allEvents = await Event.find({}); // Fetches all documents
    res.status(200).json(allEvents);
  } catch (err) {
    console.error('❌ Error fetching events:', err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Route to save new event data
app.post('/save/event/data', upload.single('eventFile'), async (req, res) => {
  try {
    const {
      title, description, date, location, maxAttendees, createdBy,
      course, organization, category, visibility,
    } = req.body;

    // Use the 'Event' model to create a new instance
    const event = new Event({
      title, description, date, location, maxAttendees, createdBy,
      course, organization, category, visibility,
      eventFileUrl: req.file?.path || '', 
    });

    await event.save();
    res.status(201).json({ message: '✅ Event saved successfully', event });
  } catch (err) {
    console.error('❌ Error saving event:', err);
    res.status(500).json({ error: 'Failed to save event' });
  }
});

// ========== Start Server ==========
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

