// backend/models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },

  description: { 
    type: String 
  },

  date: { 
    type: Date, 
    required: true 
  },

  location: { 
    type: String 
  },

  maxAttendees: { 
    type: Number 
  },

  attendees: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    }
  ],

  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  expiresAt: {
    type: Date,
    default: function () {
      return new Date(this.date.getTime() + 7 * 24 * 60 * 60 * 1000); // TTL: 7 days after event
    },
    required: true,
  },
  
}, { timestamps: true });

// TTL index to auto-delete expired events
eventSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Event', eventSchema);
