import express from 'express';

import {getToDo} from '../controllers/todo.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getToDo);

export default router;