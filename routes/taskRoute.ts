import { Router, Request, Response } from "express";
import {
    createNewTask,
    deleteTask,
    getAllTasks,
    getSingletask,
    updateTask,
} from "../controllers/taskController";
const router = Router();

router.get("/list", getAllTasks);

router.get("/detail/:id", getSingletask);

router.post("/create", createNewTask);

router.delete("/delete/:id", deleteTask);

router.put("/update/:id", updateTask);

export default router;
