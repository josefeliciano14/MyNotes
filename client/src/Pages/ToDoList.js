import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { getToDo, postToDo } from "../api/todo";
import ToDo from "../Components/ToDo";

import './ToDoList.css';

function ToDoList(){
    
    const [list, setList] = useState([]);

    const [formShown, setFormShown] = useState(false);

    const [addItemForm, setAddItemForm] = useState({"title": "", "description": ""});

    useEffect(() => {
        getToDo()
            .then(response => response.data)
            .then(data => {
                let items = [];
                
                data.map((item) => {
                    items.push(<ToDo key={item.tid} tid={item.tid} title={item.title} description={item.description} removeItem={removeItem}/>)
                });

                setList(items);
            });
    }, []);

    function removeItem(tid){
        setList((prevList) => {
            return [prevList.filter(li => li.tid != tid)];
        });
    }

    function handleOpen(){
        setFormShown(true);
    }

    function handleClose(){
        setFormShown(false);
    }

    function handleAddItemChange(e){
        if(e.target.name === "title"){
            setAddItemForm({...addItemForm, "title": e.target.value});
        }
        else{
            setAddItemForm({...addItemForm, "description": e.target.value});
        }
    }

    async function handleAddItemSubmit(e){
        e.preventDefault();

        let tid;

        await postToDo(addItemForm)
                .then(response => response.data)
                .then(data => {
                    tid = data.insertId;
                });
        
        setList([...list, <ToDo key={tid} tid={tid} title={addItemForm.title} description={addItemForm.description} removeItem={removeItem}></ToDo>])
    }
    
    return(
        <>
            <Navbar/>

            <Modal show={formShown} onHide={handleClose} centered>
                <div className="item-modal">
                    <div className="modal-title">
                        <span>Add Item</span>
                    </div>
                    
                    <form>
                        <div className="form-entry">
                            <label className="form-label">Title</label>
                            <input className="form-input" type="text" name="title" onChange={handleAddItemChange}></input>
                        </div>
                        <div className="form-entry">
                            <label className="form-label">Description</label>
                            <textarea className="form-input" name="description" rows="3" onChange={handleAddItemChange}></textarea>
                        </div>

                        <div className="item-modal-footer">
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleAddItemSubmit} type="submit">
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>

            <main>
                <Button bg="primary" className="add-item-button" onClick={handleOpen}><FontAwesomeIcon icon={faPlus}/> Add Item</Button>

                <div className="todo-list">
                    {list}
                </div>
            </main>
        </>
    )
};

export default ToDoList;