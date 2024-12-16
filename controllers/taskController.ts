import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

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
export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await prisma.tasks.findMany()

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
    } catch (error) {
        console.log("Error :" + error)
    }
};

// get single task
export const getSingletask = async (req: Request, res: Response) => {
    const taskId = parseInt(req.params.id);

    const task = await prisma.tasks.findUnique({
        where: {
            id: taskId, // Replace `id` with your variable
        },
    })

    if (!task) {
        res.status(400).json({
            isSucccess: false,
            message: `The task with id:${taskId} is not found!`,
        });

        return
    }

    res.status(200).json({
        isSucccess: true,
        message: `Task with id:${taskId} is found!`,
        task: task,
    });

    return
};

// create a new task
export const createNewTask = async (req: Request, res: Response) => {
    try {
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

        const task = await prisma.tasks.create({
            data: {
                name,
                description,
                dueDate,
                status
            }
        })

        res.status(200).json({
            isSucccess: true,
            message: "A new task was added",
            task
        });

        return
    } catch (error) {
        console.log("Error: " + error)
        res.status(500).json({
            message: "server error"
        })
    }
};

// delete a task
export const deleteTask = async (req: Request, res: Response) => {
    const taskId = parseInt(req.params.id); // Convert `id` from params to a number

    // Check if a task with the given id exists
    const deletedTask = await prisma.tasks.delete({
        where: {
            id: taskId
        }
    })

    if (!deletedTask) {
        res.status(404).json({
            isSuccess: false,
            message: `The task with id:${taskId} does not exist!`,
        });

        return
    }

    res.status(200).json({
        isSuccess: true,
        message: `The task with id:${taskId} has been deleted successfully!`,
    });

    return
};

// updating existing task
export const updateTask = async (req: Request, res: Response) => {
    try {
        const taskId = parseInt(req.params.id); // Parse task ID from request params
        const updates: Partial<{ name: string; description: string; dueDate: string; status: string }> = req.body; // Allow partial updates

        // Validate the status if it exists in the update
        const validStatus = ["completed", "pending", "in-progress"];
        if (updates.status && !validStatus.includes(updates.status)) {
            res.status(400).json({
                isSuccess: false,
                message: "Please enter a valid status (completed, pending, in-progress)!",
            });

            return
        }

        // Update the task in the database
        const updatedTask = await prisma.tasks.update({
            where: {
                id: taskId,
            },
            data: updates, // Use the partial update object from the request body
        });

        // Respond with success
        res.status(200).json({
            isSuccess: true,
            message: `The task with id:${taskId} has been updated successfully!`,
            updatedTask,
        });

        return
    } catch (error: any) {
        // Handle Prisma "Record to update not found" error
        res.status(404).json({
            isSuccess: false,
            message: `The task with id:${req.params.id} was not found!`,
        });

        // Handle other errors
        res.status(500).json({
            isSuccess: false,
            message: "An error occurred while updating the task.",
            error: error.message,
        });

        return
    }
};

