import express from "express";
import {
  alumniRegister,
  adminRegister,
  studentRegister,
  loginUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/alumni/register", alumniRegister);
router.post("/admin/register", adminRegister);
router.post("/student/register", studentRegister);
router.post("/login", loginUser);

export default router;
