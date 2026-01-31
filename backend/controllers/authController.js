import Alumni from "../models/Alumni.js";
import Admin from "../models/Admin.js";
import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* ================= ALUMNI REGISTER ================= */
export const alumniRegister = async (req, res) => {
  try {
    const { username, email, enrollmentNumber, linkedIn, isMentor, password } = req.body;

    const existing = await Alumni.findOne({
      $or: [{ email }, { enrollmentNumber }],
    });

    if (existing) {
      return res.status(400).json({ message: "Email or Enrollment already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const alumni = await Alumni.create({
      username,
      email,
      enrollmentNumber,
      linkedIn,
      isMentor,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: alumni._id, role: "alumni" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: alumni._id,
        username: alumni.username,
        email: alumni.email,
        role: "alumni",
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during registration" });
  }
};

/* ================= ADMIN REGISTER ================= */
export const adminRegister = async (req, res) => {
  try {
    const { username, email, permission, collegeDeptName, collegeCode, password } = req.body;

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      username,
      email,
      permission,
      collegeDeptName,
      collegeCode,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Admin registered successfully",
      token,
      user: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: "admin",
        permission: admin.permission,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ================= STUDENT REGISTER ================= */
export const studentRegister = async (req, res) => {
  try {
    const { username, email, enrollmentNumber, linkedIn, password } = req.body;

    const existing = await Student.findOne({
      $or: [{ email }, { enrollmentNumber }],
    });

    if (existing) {
      return res.status(400).json({ message: "Email or Enrollment already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      username,
      email,
      enrollmentNumber,
      linkedIn,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: student._id, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Student registered successfully",
      token,
      user: {
        id: student._id,
        username: student.username,
        email: student.email,
        role: "student",
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* ================= LOGIN ================= */
export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;
  console.log("Login attempt for:", email, "Role:", role);

  try {
    let user;

    // Use else if to ensure only one query runs
    // Update your query logic like this:
    if (role === "student") {
      user = await Student.findOne({ email }).select("+password");
    } else if (role === "admin") {
      user = await Admin.findOne({ email }).select("+password");
    } else if (role === "alumni") {
      user = await Alumni.findOne({ email }).select("+password");
    }

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid Email or Role" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid Password" });
    }

    // Ensure JWT_SECRET exists in your .env
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing in .env file");
      return res.status(500).json({ success: false, message: "Server configuration error" });
    }

    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true, // Crucial for your frontend logic
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role,
      },
    });
  } catch (error) {
    // This will print the ACTUAL error to your terminal (e.g., "jwt is not defined")
    console.error("Login Controller Error:", error); 
    res.status(500).json({ success: false, message: "Server Error" });
  }
};