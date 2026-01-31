import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    trim: true,  
  },
  maxAttendees: {
    type: Number,
    default: 0,
  },
  // createdBy: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
  organization: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    enum: [
      'All Events',
      'Workshop',
      'Fest',
      'Webinar',
      'Orientation',
      'Other',
    ],
    required: true,
  },
  visibility: {
    type: String,
    enum: [
      'Open to All',
      'Open to all within Organization',
      'Only within Same Course',
    ],
    required: true,
  },
  eventFileUrl: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    index: { expires: 0 }, // TTL index
  },
}, {
  timestamps: true,
});

export default mongoose.model('Event', eventSchema);
