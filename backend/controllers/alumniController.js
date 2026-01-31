import Alumni from "../models/Alumni.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerAlumni = async (req, res) => {
  try {
    const {
      username,
      email,
      degree,
      department,
      graduationYear,
      currentJob,
      title,
      company,
      linkedIn,
      isMentor,
      password
    } = req.body;

    if (!username || !email || !degree || !department || !graduationYear || !password) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled"
      });
    }

    const existingAlumni = await Alumni.findOne({ email });
    if (existingAlumni) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const alumni = await Alumni.create({
      username,
      email,
      degree,
      department,
      graduationYear,
      currentJob,
      title,
      company,
      linkedIn,
      isMentor,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: alumni._id, role: alumni.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: {
        id: alumni._id,
        username: alumni.username,
        email: alumni.email,
        role: alumni.role
      }
    });

  } catch (error) {  
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
