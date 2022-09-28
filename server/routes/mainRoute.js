import express from "express";
import { createTodo, getAll, getById } from "../controllers/todoController";
import { createTodoDetail, updateTodoDetail, deleteTodoDetail } from "../controllers/todoController";

const router = express.Router();

router.get("/todo", getAll);
router.get("/todo/:id", getById);
router.post("/todo", createTodo);
router.put("/todo/:id/create-detail", createTodoDetail);
router.put("/todo/:id/update-detail", updateTodoDetail);
router.put("/todo/:id/delete-detail", deleteTodoDetail);

export default router;
