import Job from "../models/Job.js";

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    return res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs"
    });
  }
};


export const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salary,
      type,
      skill,
      availablePosts,
      description,
    } = req.body;

    if (!title || !company || !location || !type || !skill || !availablePosts || !description) {
      return res.status(400).json({
        success: false,
        error: "Please provide all required fields.",
      });
    }

    const newJob = new Job({
      title,
      company,
      location,
      salary,
      type,
      skill,
      availablePosts: parseInt(availablePosts),
      description,
    });

    await newJob.save();

    res.status(201).json({
      success: true,
      message: "Job posted successfully!",
      data: newJob,
    });
  } catch (error) {
    console.error("Job Controller Error:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error.",
    });
  }
};
