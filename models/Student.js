// backend/models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  rollNumber: { 
    type: String, 
    required: true, 
    unique: true 
  },

  course: { 
    type: String, 
    required: true 
  },

  yearOfStudy: { 
    type: Number, 
    required: true 
  },

  skills: [
    { 
      type: String 
    }
  ],

  interests: [
    { 
      type: String 
    }
  ],

  appliedInternships: [
    { type: mongoose.Schema.Types.ObjectId, 
      ref: 'Internship' 
    }
  ],

  mentorshipRequests: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Alumni' 
    }
  ],

}, 
{ timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
