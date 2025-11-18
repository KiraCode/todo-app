import express from "express";
import { newTask } from "../controllers/taskController.js";

const router = express.Router();

router.post("/task", newTask);

export default router;
