import { Request, Response } from "express";
// const mongoose = require("mongoose")
import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'

import todoRoutes from "./routes/todo.route"
import { Callback } from "mongoose";

require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(cors({ origin: true, credentials: true }))
app.use('/api/v1/todos', todoRoutes);

app.use("*", (req: Request, res: Response) => {
    res.status(404).json({ message: "Route Not Found" })
})
app.use((err: Error, req: Request, res: Response, next: Callback) => {
    res.status(500).json({ message: "Server Error", error: err?.message })
})
mongoose.connect(process.env.MONGO_URL as string)

mongoose.connection.once("open", () => {
    console.log("Mongo Connected")
    app.listen(process.env.PORT, () => {
        console.log(`Server Running on Port ${process.env.PORT}`)
    })
})