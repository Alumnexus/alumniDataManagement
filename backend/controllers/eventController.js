import Event from "../models/Event.js";

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    return res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch events"
    });
  }
};


export const createEvent = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Event file is required." });
    }

    const {
      title,
      description,
      date,
      location,
      maxAttendees,
      organization,
      category,
      visibility,
    } = req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      maxAttendees: maxAttendees ? parseInt(maxAttendees) : 0,
      organization,
      category,
      visibility,
      eventFileUrl: req.file.path,
    });

    await newEvent.save();

    res.status(201).json({
      success: true,
      message: "Event created successfully!",
      data: newEvent,
    });
  } catch (error) {
    console.error("Event Controller Error:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ error: messages.join(", ") });
    }

    res.status(500).json({ error: "Internal Server Error." });
  }
};