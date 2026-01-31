import express from "express";
import { getInternships } from "../controllers/internshipController.js";

const router = express.Router();

router.get("/get/intern/data", getInternships);

export default router;
