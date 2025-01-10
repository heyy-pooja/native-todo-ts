import express from 'express'
import { addTodo, deleteTodo, getTodo, updateTodo } from '../controller/todo.controller'

const router = express.Router()
router
    .get("/", getTodo)
    .post("/add", addTodo)
    .put("/update/:id", updateTodo)
    .delete("/delete/:id", deleteTodo)

export default router;