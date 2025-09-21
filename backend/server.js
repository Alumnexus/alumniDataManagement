// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();

// ========== Middleware ==========
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // React (Vite) frontend URL
  credentials: true
}));

// ========== MongoDB Connection ==========
const dburl = process.env.MONGO_URI;

async function connectDB() {
  try {
    await mongoose.connect(dburl);
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  }
}

connectDB();

// ========== Test Route ==========
app.get('/', (req, res) => {
  res.send("Server is connected 🚀");
});

// ========== Start Server ==========
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
