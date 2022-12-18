import { useEffect } from "react";
import Navbar from "../Components/Navbar";

import { getToDo } from "../api/todo";

function ToDoList(){
    
    useEffect(() => {
        getToDo()
            .then(response => response.data)
            .then(data => console.log(data));
    }, []);
    
    return(
        <>
            <Navbar/>
            <h1>ToDo List</h1>
        </>
    )
};

export default ToDoList;