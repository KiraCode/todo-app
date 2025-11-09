import express from "express";
import { newTask, getTasks, updatetask } from "../controllers/taskController.js";

const router = express.Router();

router.post("/task", newTask);
router.get("/tasks", getTasks);
router.put("/task/:id", updatetask);

export default router;
