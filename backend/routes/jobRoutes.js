import express from "express";
import { getJobs } from "../controllers/jobController.js";

const router = express.Router();

router.get("/get/job/data", getJobs);

export default router;
