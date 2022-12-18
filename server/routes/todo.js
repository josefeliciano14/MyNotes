import express from 'express';

import {getToDo, postToDo} from '../controllers/todo.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getToDo);
router.post('/', auth, postToDo);

export default router;