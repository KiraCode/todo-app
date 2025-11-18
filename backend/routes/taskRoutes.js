import express from "express";
import { getTasks, newTask } from "../controllers/taskController.js";

const router = express.Router();

router.post("/task", newTask);
router.get("/tasks", getTasks);

export default router;
