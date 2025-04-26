import TodoModel, {ITodo} from "../models/todo.model";

export const getAllTodos = async(): Promise<ITodo[]> => {
  return await TodoModel.find();
}

export const createTodo = async(title: string): Promise<ITodo> => {
  const todo = new TodoModel({ title });
  return await todo.save();
}