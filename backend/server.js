// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();

// ========== Middleware ==========
app.use(express.json()); // Parse JSON bodies
app.use(cors());         // Allow frontend to access backend

// ========== MongoDB Connection ==========
let dburl = process.env.MONGO_URI;

main()
.then(()=>{
    console.log("✅ MongoDB Connected Successfully");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(dburl);
};

// ========== Test Route ==========
app.get('/', (req, res) => {
  res.send("Server are connected");
});

// ========== Start Server ==========
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
