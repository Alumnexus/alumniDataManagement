import express from "express";
import { registerAlumni } from "../controllers/alumniController.js";

const router = express.Router();

router.post("/api/alumni/register", registerAlumni);

export default router;
