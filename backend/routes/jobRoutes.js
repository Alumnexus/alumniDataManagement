import express from "express";
import { getJobs, createJob } from "../controllers/jobController.js";

const router = express.Router();

router.get("/get/job/data", getJobs);
router.post("/api/jobs", createJob);

export default router;
