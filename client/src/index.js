import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Login from './Pages/Login'
import Register from './Pages/Register'
import ToDoList from './Pages/ToDoList'
import Error from './Pages/Error';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<ToDoList/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="*" element={<Error/>} />
    </Routes>
  </Router>
);