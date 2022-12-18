import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { getToDo, postToDo, editToDo } from "../api/todo";
import ToDo from "../Components/ToDo";

import './ToDoList.css';

function ToDoList(){
    
    const [list, setList] = useState([]);

    const [addFormShown, setAddFormShown] = useState(false);
    const [editFormShown, setEditFormShown] = useState(false);

    const [addItemForm, setAddItemForm] = useState({"title": "", "description": ""});
    const [editItemForm, setEditItemForm] = useState({"tid": -1, "title": "", "description": ""});

    useEffect(() => {
        getToDo()
            .then(response => response.data)
            .then(data => {
                let items = [];
                
                data.map((item) => {
                    items.push(<ToDo key={item.tid} tid={item.tid} title={item.title} description={item.description} removeItem={removeItem} editItem={openEditItemForm}/>)
                });

                setList(items);
            });
    }, []);

    //Create 
    function openAddItemForm(){
        setAddItemForm({"title": "", "description": ""});
        
        setAddFormShown(true);
    }

    function closeAddItemForm(){
        setAddFormShown(false);
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
        
        setList([...list, <ToDo key={tid} tid={tid} title={addItemForm.title} description={addItemForm.description} removeItem={removeItem} editItem={openEditItemForm}></ToDo>])

        closeAddItemForm();
    }

    //Remove 
    function removeItem(tid){
        setList((prevList) => {
            return [prevList.filter(item => item.props.tid != tid)];
        });
    }

    //Update
    function handleEditItemChange(e){
        if(e.target.name === "title"){
            setEditItemForm({...editItemForm, "title": e.target.value});
        }
        else{
            setEditItemForm({...editItemForm, "description": e.target.value});
        }
    }

    function openEditItemForm(data){
        setEditItemForm(data);
        
        setEditFormShown(true);
    }

    function closeEditItemForm(){
        setEditFormShown(false);
    }

    function handleEditItemSubmit(e){
        e.preventDefault();

        editToDo(editItemForm);

        console.log(editItemForm);
        
        setList((prevList) => {
            return prevList.map((item) => {
                if(item.props.tid == editItemForm.tid){
                    return <ToDo key={item.tid + editItemForm.title} tid={editItemForm.tid} title={editItemForm.title} description={editItemForm.description} removeItem={removeItem} editItem={openEditItemForm}/>;
                }
                
                return item;
            })
        });

        closeEditItemForm();
    }
    
    return(
        <>
            <Navbar/>

            <Modal show={addFormShown} onHide={closeAddItemForm} centered>
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
                            <Button variant="secondary" onClick={closeAddItemForm}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleAddItemSubmit} type="submit">
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>

            <Modal show={editFormShown} onHide={closeEditItemForm} centered>
                <div className="item-modal">
                    <div className="modal-title">
                        <span>Edit Item</span>
                    </div>
                    
                    <form>
                        <div className="form-entry">
                            <label className="form-label">Title</label>
                            <input className="form-input" type="text" name="title" onChange={handleEditItemChange} defaultValue={editItemForm.title}></input>
                        </div>
                        <div className="form-entry">
                            <label className="form-label">Description</label>
                            <textarea className="form-input" name="description" rows="3" onChange={handleEditItemChange} defaultValue={editItemForm.description}></textarea>
                        </div>

                        <div className="item-modal-footer">
                            <Button variant="secondary" onClick={closeEditItemForm}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleEditItemSubmit} type="submit">
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>

            <main>
                <Button bg="primary" className="add-item-button" onClick={openAddItemForm}><FontAwesomeIcon icon={faPlus}/> Add Item</Button>

                <div className="todo-list">
                    {list}
                </div>
            </main>
        </>
    )
};

export default ToDoList;