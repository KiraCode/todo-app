import moment from "moment-timezone";
import Task from "../models/taskModels.js";

const newTask = async (req, res) => {
  try {
    // extract data from request body
    const { title, description, due_date, labels } = req.body;

    // validate incoming data
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and Description are required" });
    }

    let isDueDate;
    if (due_date) {
      isDueDate = moment.tz(due_date, "Asia/Kolkata").toDate();
    }

    // create a new task
    const newTask = await Task.create({
      title,
      description,
      due_date: isDueDate,
      labels,
    });

    res.status(201).json({
      success: true,
      message: "Task created Successfully",
      task: newTask,
    });
  } catch (error) {
    console.error("Error while creating a task", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
