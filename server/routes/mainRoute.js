import express from 'express';
import { createTodo, getAll, getById } from '../controllers/todoController';

const router = express.Router();

router.get('/todo', getAll);
router.get('/todo/:id', getById);
router.post('/todo', createTodo);

export default router;