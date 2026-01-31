import express from "express";
import { getEvents, createEvent } from "../controllers/eventController.js";
import multer from "multer";
import { storage } from "../Config/cloudinary.js";

const router = express.Router();
const upload = multer({ storage });

router.get("/api/get/event", getEvents);
router.post("/save/event/data", upload.single("eventFile"), createEvent);

export default router;
