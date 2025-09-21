// backend/models/Recruiter.js
const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  companyName: { 
    type: String, 
    required: true 
  },

  designation: { 
    type: String 
  },

  contactNumber: { 
    type: String 
  },

  website: { 
    type: String 
  },

  jobsPosted: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Internship' 
    }
  ],
}, 
{ timestamps: true }
);

module.exports = mongoose.model('Recruiter', recruiterSchema);
