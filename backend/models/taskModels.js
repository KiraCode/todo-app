import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, trin: true },
  description: { type: String, trim: true },
  due_date: { type: Date },
  status: { type: String, default: "Open" },
  labels: [{ type: String }],
  added_on: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
