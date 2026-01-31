import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    enrollmentNumber: {
      type: String,
      required: true,
      unique: true
    },

    linkedIn: {
      type: String
    },

    password: {
      type: String,
      required: true
    },

    // role: {
    //   type: String,
    //   default: "student"
    // },

    // skills: [
    //   {
    //     type: String
    //   }
    // ],

    // interests: [
    //   {
    //     type: String
    //   }
    // ],

    // appliedInternships: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Internship"
    //   }
    ],

    mentorshipRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Alumni"
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
