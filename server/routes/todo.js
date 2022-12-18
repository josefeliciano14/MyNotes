import express from 'express';

import {getToDo, postToDo, deleteToDo, editToDo} from '../controllers/todo.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getToDo);
router.post('/', auth, postToDo);
router.put('/', auth, editToDo);
router.delete('/:tid', auth, deleteToDo);

export default router;