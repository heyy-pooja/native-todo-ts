import { Error } from "mongoose";
import { Request, Response } from 'express';
import { upload } from "../utils/upload";
const asyncHandler = require("express-async-handler")
import Todo from "../model/Todo";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config()


cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY as string,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string,
});
export const getTodo = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await Todo.find()
        res.json({ message: "Todo fetch success", result })
    } catch (error) {
        res.status(500).json({ message: "Todo Fetch failed", error: error instanceof Error ? error.message : error })
    }
})
export const addTodo = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: "Multer error", err })
        }
        if (!req.file) {
            return res.status(400).json({ message: "Image is required" })
        }
        try {
            const { task, priority, complete } = req.body
            const result = await cloudinary.uploader.upload(req.file.path)

            const newTodo = await Todo.create({
                task,
                priority,
                complete,
                hero: result.secure_url,
            });

            return res.status(201).json({ message: "Todo added successfully", todo: newTodo });
        } catch (error) {
            return res.status(500).json({ message: "Server error", error: (error as Error).message });
        }
    })

})
export const updateTodo = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    upload(req, res, async (err) => {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID Reuired" })
        }

        let photo
        if (req.file) {
            const { secure_url } = await cloudinary.uploader.upload(req.file.path)
            photo = secure_url
        }
        console.log(req.body, "REQ.BODY")
        console.log(req.files, "REQ.FILEsss")
        console.log(req.file, "REQ.FILE")
        console.log(photo, "PHOTO")

        await Todo.findByIdAndUpdate(id, { ...req.body, hero: photo })
        res.status(200).json({ message: "Todo upd-ate success" });
    })

})

export const deleteTodo = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        await Todo.findByIdAndDelete(id)
        res.status(200).json({ message: "Todo Delete success" });
    } catch (error) {
        res.status(400).json({ message: "Todo Delete error", error: error instanceof Error ? error.message : error });
    }
})