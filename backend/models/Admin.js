import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // Prevents duplicate registrations
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    permission: {
      type: String,
      required: true,
      enum: ["Faculty", "Admin"], // Restricts values to those in your dropdown
      default: "Faculty",
    },
    collegeDeptName: {
      type: String,
      trim: true,
      default: "",
    },
    collegeCode: {
      type: String,
      trim: true,
      default: "",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      // Note: Length validation is handled by your regex in frontend, 
      // but the hashed version will be longer.
    },
    role: {
      type: String,
      default: "admin", // Useful for frontend conditional rendering
    }
  },
  {
    timestamps: true, // Automatically creates 'createdAt' and 'updatedAt' fields
  }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;