import express from "express";
import { getInternships, createInternship } from "../controllers/internshipController.js";

const router = express.Router();

router.get("/get/intern/data", getInternships);
router.post("/api/internships", createInternship);

export default router;
