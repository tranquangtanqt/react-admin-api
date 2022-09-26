import express from 'express';
import { createTodo, getAll, getById, createTodoDetail, updateTodoDetail } from '../controllers/todoController';

const router = express.Router();

router.get('/todo', getAll);
router.get('/todo/:id', getById);
router.post('/todo', createTodo);
router.put('/todo/:id/create-detail', createTodoDetail);
router.put('/todo/:id/update-detail', updateTodoDetail);

export default router;