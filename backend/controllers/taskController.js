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

const getTasks = async (req, res) => {
  try {
    const { page, sort_by, sort_type, status, limit = 10, labels } = req.query;
    let options = {};
    let query = {};

    // set sort option
    if (sort_by && ["added_on", "due_date"].includes(sort_by)) {
      const sortOptions = {};
      sortOptions[sort_by] = sort_type === "desc" ? -1 : 1;
      options.sort = sortOptions;
    }

    // set filter options
    if (status && status.length > 0) {
      const statusItems = JSON.parse(labels);
      query.status = { $in: statusItems };
    }

    // set labels options
    // http://localhost:500/api/v22/tasks?labels=["React"]
    if (labels && labels.length > 0) {
      const labelItems = JSON.parse(labels);
      query.labels = { $in: labelItems };
    }

    // pagination
    if (page) {
      options.limit = parseInt(limit);
      options.skip = (parent(page) - 1) * parseInt(limit);
    }

    // fetch tasks
    const tasks = await Task.find(query, null, options);

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error("Failed to fetch the data");
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, due_date } = req.body;

    if (!id) {
      return res
        .status(404)
        .json({ success: false, message: "Task Id is required" });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    if (title) task.title = title;
    if (due_date) task.due_date = due_date;
    if (!due_date) task.due_date = null;
    if (description) task.description = description;

    const updatedTask = await task.save();
    res.status(200).json({ success: true, task: updatedTask });
  } catch (error) {
    console.error("Failed to fetch the data");
    res.status(500).json({ success: false, message: error.message });
  }
};

const getLabels = async (req, res) => {
  try {
    const labels = await Task.distinct("labels");

    if (!labels.length) {
      return res
        .status(400)
        .json({ success: false, message: "No labels found" });
    }
    res.status(200).json({ success: true, labels: labels });
  } catch (error) {
    console.error("Failed to fetch the labels");
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateLabels = async (req, res) => {
  try {
    const { id } = req.params;
    const { labels } = req.body;
    if (!id || !labels || !Array.isArray(labels)) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid input data" });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ success: false, message: "No Task Found" });
    }

    task.labels = labels; //update labels with new array
    const updateTask = await task.save();

    res.status(200).json({ success: true, task: updateTask });
  } catch (error) {
    console.error("Failed to add label in Task");
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status) {
      return res.status(400).json({ success: false, message: "Invalid Input" });
    }

    if (!["Open", "In-Progress", "Completed"].includes(status)) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Status Value" });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ success: false, message: "No Task Found" });
    }

    task.status = status;
    const updateTask = await task.save();

    res.status(200).json({ success: true, task: updateTask });
  } catch (error) {
    console.error("Failed to change the status");
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "No id provided" });
    }
    await Task.findByIdAndDelete(id);
    res.status(200).json({
      success: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleting task", error);
    res.status(400).json({
      success: false,
      message: "Task deleted unsuccessfully",
    });
  }
};

export {
  newTask,
  getTasks,
  updateTask,
  getLabels,
  updateLabels,
  updateStatus,
  deleteTask,
};
