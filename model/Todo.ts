import mongoose, { Schema } from "mongoose";
import { Todo } from "../type/Todo.interface";


const todoSchema: Schema = new mongoose.Schema<Todo>({
    task: { type: String, required: true },
    desc: { type: String },
    priority: { type: Number, },
    complete: { type: Boolean, },
    hero: { type: String },

})

const Todo = mongoose.model<Todo>("todo", todoSchema)

export default Todo