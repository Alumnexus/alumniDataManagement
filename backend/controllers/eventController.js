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
