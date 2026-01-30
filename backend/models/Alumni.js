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

    enrollmentNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
      // Example: 22/14/HM/XXX
    },

    linkedIn: {
      type: String,
      trim: true
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
      default: false   // email / OTP verification
    }
  },
  { timestamps: true }
);

const Alumni = mongoose.model("Alumni", alumniSchema);
export default Alumni;
