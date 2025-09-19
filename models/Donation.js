// backend/models/Donation.js
const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  alumniId: {   // Who donated
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Alumni', 
    required: true 
},

  amount: {  // Donation amount
    type: Number, 
    required: true 
}, 

  message: { // Optional message from alumni
    type: String 
}, 

  purpose: { // E.g., "Scholarship Fund", "Event Sponsorship"
    type: String, 
    required: true 
}, 

  transactionId: { // Reference from payment gateway
    type: String, 
    unique: true, 
    required: true 
},

  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },

  donatedAt: { 
    type: Date, 
    default: Date.now 
}
}, 
{ timestamps: true }
);

module.exports = mongoose.model('Donation', donationSchema);
