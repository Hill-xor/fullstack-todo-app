import { Router } from "express";
import { getTodos, postTodo } from "../controllers/todo.controller";

const router = Router();

router.get("/", getTodos);
router.post("/", postTodo);

export default router;