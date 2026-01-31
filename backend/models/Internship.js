// backend/models/Internship.js
// const mongoose = require('mongoose');
import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },

  description: { 
    type: String, 
    required: true 
  },

  skills: {
    type: String,
    required: true
  },

  company: { 
    type: String, 
    required: true 
  },  

  location: { 
    type: String
  },

  stipend: { 
    type: String 
  },

  duration: { 
    type: String 
  },

  // postedBy: { 
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref: 'Recruiter', 
  //   required: true 
  // },

  // applicants: [
  //   { 
  //     type: mongoose.Schema.Types.ObjectId, 
  //     ref: 'Student' 
  //   }
  // ],

  expiresAt: {
    type: Date,
    default: function () {
      return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // TTL: 30 days
    },
    required: true,
  },
}, 
{ timestamps: true }
);

// TTL index to auto-delete expired internships
internshipSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Internship = mongoose.model('Internship', internshipSchema);

export default Internship