import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import userRoutes from './routes/users.js'
import todoRoutes from './routes/todo.js'

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true, }))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true, }))

app.use(cors());
app.use('/users', userRoutes);
app.use('/todo', todoRoutes);

app.listen(5000);