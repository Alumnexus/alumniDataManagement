const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  designation: { 
    type: String, 
    required: true 
  },

  department: { 
    type: String 
  },

  contactNumber: { 
    type: String 
  },
  
  permissions: [  // e.g., ['manage_users', 'manage_events']
    { 
      type: String 
    }
  ],
}, 
{ timestamps: true }
);

module.exports = mongoose.model('Admin', adminSchema);
