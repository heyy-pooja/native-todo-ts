import { Document } from 'mongoose'

export interface Todo extends Document {
    task: string;
    desc: string;
    priority: number;
    complete: boolean;
    hero: string;
}