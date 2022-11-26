import express from "express";

import { 
    getAll, 
    createTodo, 
    getById, 
    updateTitle, 
    updateOrderNumber, 
    deleteTodo 
} from "../controllers/todoController";

import { 
    createTodoDetail, 
    updateTodoDetail, 
    updateTodoDetailOrderNumber, 
    deleteTodoDetail,
} from "../controllers/todoDetailController";

import { 
    createTodoTask,
    updateTodoTaskStatus,
    updateTodoTaskContent,
    updateTodoTaskOrderNumber,
    deleteTodoTask
} from "../controllers/todoTaskController";

const router = express.Router();

router.get("/todo", getAll);
router.post("/todo", createTodo);
router.get("/todo/:id", getById);
router.put("/todo/update-title", updateTitle);
router.put("/todo/update-order-number", updateOrderNumber);
router.put("/todo/delete", deleteTodo);

router.put("/todo/:id/create-detail", createTodoDetail);
router.put("/todo/:id/update-detail", updateTodoDetail);
router.put("/todo/:id/update-detail-order-number", updateTodoDetailOrderNumber);
router.put("/todo/:id/delete-detail", deleteTodoDetail);

router.put("/todo/:id/create-task", createTodoTask);
router.put("/todo/:id/update-task-status", updateTodoTaskStatus);
router.put("/todo/:id/update-task-content", updateTodoTaskContent);
router.put("/todo/:id/update-task-order-number", updateTodoTaskOrderNumber);
router.put("/todo/:id/delete-task", deleteTodoTask);

export default router;
