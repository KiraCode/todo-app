import express from "express";
import {
  getLabels,
  getTasks,
  newTask,
  updateTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/task", newTask);
router.get("/tasks", getTasks);
router.put("/task/:id", updateTask);
router.get("/labels", getLabels);

export default router;
