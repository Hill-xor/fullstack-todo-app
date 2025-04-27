import { Request, Response, RequestHandler } from "express";
import * as todoService from "../services/todo.service";

// export const getTodos = async (_req: Request, res: Response) => {
export const getTodos: RequestHandler = async (_req, res) => {
  const todos = await todoService.getAllTodos();
  res.status(200).json({ message: todos});
}

// export const postTodo: RequestHandler = async (req, res) => {
export const postTodo = async (req: Request, res: Response): Promise<void> => {
  const { title } = req.body;
  if (!title){
  res.status(400).json({ message: "Title is required!"});
  return;
}
  
const todo = await todoService.createTodo(title);
  res.status(201).json({message: todo});
}