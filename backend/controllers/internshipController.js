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

export const createInternship = async (req, res) => {
  try {
    const {
      title,
      company,
      description,
      skills,
      location,
      stipend,
      duration,
    } = req.body;

    if (!title || !company || !description || !skills) {
      return res.status(400).json({
        success: false,
        error: "All required fields must be filled.",
      });
    }

    const newInternship = new Internship({
      title,
      company,
      description,
      skills,
      location,
      stipend,
      duration,
    });

    await newInternship.save();

    res.status(201).json({
      success: true,
      message: "Internship posted successfully!",
      data: newInternship,
    });
  } catch (error) {
    console.error("Internship Controller Error:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error.",
    });
  }
};
