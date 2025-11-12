import express from "express";
import {
  newTask,
  getTasks,
  updatetask,
  getLabels,
  updatelabels,
  updateStatus,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/task", newTask);
router.get("/tasks", getTasks);
router.put("/task/:id", updatetask);
router.get("/labels", getLabels);
router.put("/task/:id/labels", updatelabels);
router.put("/task/:id/status", updateStatus);
router.delete("/task/:id", deleteTask);

export default router;
