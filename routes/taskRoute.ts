import { Router, Request, Response } from "express";
import { getAllTasks } from "../controllers/taskController";
const router = Router();

router.get("/list", (req: Request, res: Response) => {
    getAllTasks(req, res)
})

export default router;