import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons'

import { deleteToDo } from '../api/todo'

import './ToDo.css'

function ToDo({tid, title, description, removeItem, editItem}){
    
    function handleEdit(){
        editItem({"tid": tid, "title": title, "description": description});
    }
    
    //Delete
    function handleDelete(){
        deleteToDo(tid);

        removeItem(tid);
    }
    
    return(
        <div className='todo'>
            <div className='todo-header'>
                <div className='todo-title'>
                    <span>{title}</span>
                </div>

                <div className='todo-button edit-button' onClick={handleEdit}>
                    <FontAwesomeIcon icon={faPencil}/>
                </div>

                <div className='todo-button delete-button' onClick={handleDelete}>
                    <FontAwesomeIcon icon={faX}/>
                </div>
            </div>

            {description &&
                <div className='todo-description'>
                    <span>{description}</span>
                </div>
            }
        </div>
    )
}

export default ToDo;