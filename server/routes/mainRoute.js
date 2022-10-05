import express from "express";
import { createTodo, getAll, getById, deleteTodo, updateTodoTitle, updateTodoOrderNumber } from "../controllers/todoController";
import { createTodoDetail, updateTodoDetail, updateTodoDetailOrderNumber, deleteTodoDetail } from "../controllers/todoDetailController";
import { createTodoTask, updateTodoTaskContent, deleteTodoTask, updateStatusTask } from "../controllers/todoTaskController";

const router = express.Router();

router.get("/todo", getAll);
router.get("/todo/:id", getById);
router.post("/todo", createTodo);
router.put("/todo/delete", deleteTodo);
router.put("/todo/update-title", updateTodoTitle);
router.put("/todo/update-order-number", updateTodoOrderNumber);
router.put("/todo/:id/create-detail", createTodoDetail);
router.put("/todo/:id/update-detail", updateTodoDetail);
router.put("/todo/:id/update-detail-order-number", updateTodoDetailOrderNumber);
router.put("/todo/:id/delete-detail", deleteTodoDetail);
router.put("/todo/:id/create-task", createTodoTask);
router.put("/todo/:id/update-status-task", updateStatusTask);
router.put("/todo/:id/update-task-content", updateTodoTaskContent);
router.put("/todo/:id/delete-task", deleteTodoTask);

export default router;
