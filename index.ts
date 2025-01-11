// import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import express, { NextFunction, Request, Response } from 'express'
import mongoose from "mongoose";
import todoRoutes from './routes/todo.route'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const mongoUrl = process.env.MONGO_URL
if (!mongoUrl) {
    throw new Error("MONGO_URL is not defined in environment variables.")
}

mongoose
    .connect(mongoUrl)
    .then(() => console.log("MONGO_CONNECTED"))
    .catch((err) => console.error("Failed to connect to MongoDB:", err.message))

app.use("/api/todos", todoRoutes)
app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "Resource Not Found" });
})
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.message);
    res.status(500).json({ message: "Internal Server Error", error: err.message })
})
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`SERVER RUNNING on port${port}`)
})