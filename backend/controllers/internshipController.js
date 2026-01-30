import Internship from "../models/Internship.js";

export const getInternships = async (req, res) => {
  try {
    const internData = await Internship.find({});
    return res.status(200).json({
      message: "Internship data fetched",
      data: internData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};