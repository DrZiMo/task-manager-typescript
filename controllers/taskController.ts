import { Request, Response } from "express";

interface Task {
    id: number;
    name: string;
    description: string;
    dueDate: string;
    status: string;
}

let idCounter: number = 1;
let tasks: Task[] = [
    {
        id: 1,
        name: "Complete Assingment",
        description: "Finish the backend API for the task management system",
        dueDate: "2024-12-15",
        status: "pending"
    }
]

// get all tasks
export const getAllTasks = (req: Request, res: Response): Response => {
    if (tasks.length === 0) {
        return res.status(404).json({
            isSuccess: false,
            message: "There is no task!"
        })
    }

    return res.status(200).json({
        isSuccess: true,
        tasks
    })
}

// get single task
export const getSingletask = (req: Request, res: Response): Response => {
    const taskId = req.params.id;

    const targetTask = tasks.find(t => t.id === parseInt(taskId));

    if (!targetTask) {
        return res.status(400).json({
            isSucccess: false,
            message: `The task with id:${taskId} is not found!`
        });
    }

    return res.status(200).json({
        isSucccess: true,
        message: `Task with id:${taskId} is found!`,
        task: targetTask
    });
};

// create a new task
export const createNewTask = (req: Request, res: Response): Response => {
    const { name, description, dueDate, status }: Task = req.body;

    if (!name || !description || !dueDate || !status) {
        return res.status(400).json({
            isSucccess: false,
            message: "Please fill all the items!"
        });
    }

    // Validate the status
    const validStatus: string[] = ["completed", "pending", "in-progress"];

    if (!validStatus.includes(status)) {
        return res.status(400).json({
            isSucccess: false,
            message: "Please enter a valid status!"
        });
    }

    idCounter += 1;
    const newTask: Task = {
        id: idCounter,
        name,
        description,
        dueDate,
        status,
    };

    tasks.push(newTask);

    return res.status(200).json({
        isSucccess: true,
        message: "A new task was added",
        task: newTask
    });
};

// delete a task