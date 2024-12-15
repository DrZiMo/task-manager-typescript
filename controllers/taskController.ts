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
        status: "pending",
    },
];

// get all tasks
export const getAllTasks = (req: Request, res: Response) => {
    if (tasks.length === 0) {
        res.status(404).json({
            isSuccess: false,
            message: "There is no task!",
        });

        return
    }

    res.status(200).json({
        isSuccess: true,
        tasks,
    });

    return
};

// get single task
export const getSingletask = (req: Request, res: Response) => {
    const taskId = req.params.id;

    const targetTask = tasks.find((t) => t.id === parseInt(taskId));

    if (!targetTask) {
        res.status(400).json({
            isSucccess: false,
            message: `The task with id:${taskId} is not found!`,
        });

        return
    }

    res.status(200).json({
        isSucccess: true,
        message: `Task with id:${taskId} is found!`,
        task: targetTask,
    });

    return
};

// create a new task
export const createNewTask = (req: Request, res: Response) => {
    const { name, description, dueDate, status }: Task = req.body;

    if (!name || !description || !dueDate || !status) {
        res.status(400).json({
            isSucccess: false,
            message: "Please fill all the items!",
        });

        return
    }

    // Validate the status
    const validStatus: string[] = ["completed", "pending", "in-progress"];

    if (!validStatus.includes(status)) {
        res.status(400).json({
            isSucccess: false,
            message: "Please enter a valid status!",
        });

        return
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

    res.status(200).json({
        isSucccess: true,
        message: "A new task was added",
        task: newTask,
    });

    return
};

// delete a task
export const deleteTask = (req: Request, res: Response) => {
    const taskId = parseInt(req.params.id); // Convert `id` from params to a number

    // Check if a task with the given id exists
    const isTaskIdExist = tasks.some((task) => task.id === taskId);

    if (!isTaskIdExist) {
        res.status(404).json({
            isSuccess: false,
            message: `The task with id:${taskId} does not exist!`,
        });

        return
    }

    // Filter out the task to delete it
    tasks = tasks.filter((task) => task.id !== taskId);

    res.status(200).json({
        isSuccess: true,
        message: `The task with id:${taskId} has been deleted successfully!`,
    });

    return
};

// updating existing task
export const updateTask = (req: Request, res: Response) => {
    const taskId = parseInt(req.params.id); // Parse task ID from request params
    const updates: Partial<Task> = req.body; // Allow partial updates of the `Task` type

    // Find the task to be updated
    const targetTask = tasks.find((task) => task.id === taskId);

    if (!targetTask) {
        res.status(404).json({
            isSuccess: false,
            message: `The task with id:${taskId} is not found!`,
        });

        return
    }

    // Validate the status if it exists in the update
    const validStatus = ["completed", "pending", "in-progress"];
    if (updates.status && !validStatus.includes(updates.status)) {
        res.status(400).json({
            isSuccess: false,
            message: "Please enter a valid status!",
        });

        return
    }

    // Update the task with the provided data
    tasks = tasks.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
    );

    res.status(200).json({
        isSuccess: true,
        message: `The task with the id:${taskId} has been updated successfully!`,
        updatedTask: { ...targetTask, ...updates },
    });

    return
};
