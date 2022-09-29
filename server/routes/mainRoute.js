import express from "express";
import { createTodo, getAll, getById } from "../controllers/todoController";
import { createTodoDetail, updateTodoDetail, deleteTodoDetail } from "../controllers/todoDetailController";
import { createTodoTask, updateTodoTask, deleteTodoTask, updateStatusTask } from "../controllers/todoTaskController";

const router = express.Router();

router.get("/todo", getAll);
router.get("/todo/:id", getById);
router.post("/todo", createTodo);
router.put("/todo/:id/create-detail", createTodoDetail);
router.put("/todo/:id/update-detail", updateTodoDetail);
router.put("/todo/:id/delete-detail", deleteTodoDetail);
router.put("/todo/:id/create-task", createTodoTask);
router.put("/todo/:id/update-status-task", updateStatusTask);
router.put("/todo/:id/update-task", updateTodoTask);
router.put("/todo/:id/delete-task", deleteTodoTask);

export default router;
