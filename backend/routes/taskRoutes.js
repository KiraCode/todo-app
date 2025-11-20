import express from "express";
import { getTasks, newTask, updateTask } from "../controllers/taskController.js";

const router = express.Router();

router.post("/task", newTask);
router.get("/tasks", getTasks);
router.put("/task/:id", updateTask)

export default router;
