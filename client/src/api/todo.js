import API from './index.js'

export const getToDo  = () => API.get('/todo/');
export const postToDo = (todo) => API.post('/todo/', todo);