// backend/models/Alumni.js
const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  graduationYear: { 
    type: Number, 
    required: true 
  },  

  course: { 
    type: String, 
    required: true 
  },

  currentJobTitle: { 
    type: String 
  },

  company: { 
    type: String 
  },

  location: { 
    type: String 
  },

  linkedInProfile: { 
    type: String 
  },

  mentorshipOffered: { 
    type: Boolean, 
    default: false 
  },
  
  donations: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Donation' 
  }],
  
}, 
{ timestamps: true }
);

module.exports = mongoose.model('Alumni', alumniSchema);
