// // backend/models/Alumni.js
// const mongoose = require('mongoose');

// const alumniSchema = new mongoose.Schema({
//   graduationYear: { 
//     type: Number, 
//     required: true 
//   },  

//   course: { 
//     type: String, 
//     required: true 
//   },

//   currentJobTitle: { 
//     type: String 
//   },

//   company: { 
//     type: String 
//   },

//   location: { 
//     type: String 
//   },

//   linkedInProfile: { 
//     type: String 
//   },

//   mentorshipOffered: { 
//     type: Boolean, 
//     default: false 
//   },
  
//   donations: [{ 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'Donation' 
//   }],
  
// }, 
// { timestamps: true }
// );

// module.exports = mongoose.model('Alumni', alumniSchema);


import mongoose from "mongoose";

const alumniSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    degree: {
      type: String,
      required: true
    },

    department: {
      type: String,
      required: true
    },

    graduationYear: {
      type: Number,
      required: true
    },

    currentJob: {
      type: String
    },

    title: {
      type: String
    },

    company: {
      type: String
    },

    linkedIn: {
      type: String
    },

    isMentor: {
      type: Boolean,
      default: false
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false   // 🔐 hide password in queries
    },

    role: {
      type: String,
      enum: ["alumni", "admin"],
      default: "alumni"
    },

    isVerified: {
      type: Boolean,
      default: false   // for OTP / email verification
    }
  },
  { timestamps: true }
);

const Alumni = mongoose.model("Alumni", alumniSchema);
export default Alumni;
