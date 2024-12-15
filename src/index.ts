import express, { Request, Response } from "express";
import dotenv from "dotenv";
import router from "../routes/taskRoute";

const app = express();
dotenv.config()

app.use("/tasks", router)

// listening to port
const PORT = process.env.PORT;
app.listen(PORT, () => console.log("listening to port " + PORT))