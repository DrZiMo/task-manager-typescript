import { Router, Request, Response } from "express";
import {
    createNewTask,
    deleteTask,
    getAllTasks,
    getSingletask,
    updateTask,
} from "../controllers/taskController";
const router = Router();

router.get("/list", (req: Request, res: Response) => {
    getAllTasks(req, res);
});

router.get("/detail/:id", (req: Request, res: Response) => {
    getSingletask(req, res);
});

router.post("/create", (req: Request, res: Response) => {
    createNewTask(req, res);
});

router.delete("/delete/:id", (req: Request, res: Response) => {
    deleteTask(req, res);
});

router.put("/update/:id", (req: Request, res: Response) => {
    updateTask(req, res);
});

export default router;
