import { Router } from 'express';

const router = Router();
const todos = [{ id: 1, title: 'learn esm', done: false }];

router.get('/', (req, res) => {
  res.json(todos);
});

router.post('/', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: 'title is required' });

  const todo = { id: Date.now(), title, done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

export default router;
