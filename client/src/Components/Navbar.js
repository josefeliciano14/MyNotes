import {useState,useEffect} from 'react'
import { Link, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import decode from 'jwt-decode';

import './Navbar.css';

function Navbar(){

    const [user, setUser] = useState("");

    const nav = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem('auth');
        
        if(token){
            setUser(decode(token).username);
        }
    }, []);
    
    function logout(){
        localStorage.clear("auth");
    
        setUser("");
    
        nav("/");
    }

    return(
        <nav>
            <Link to='/'><span className='logo'>ToDo</span></Link>
            <div className='emptyspace'></div>
            <i className="fa-solid fa-bars"></i>
            <ul className='nav-links'>
            <li>
                { user
                    ? <div>{user} <FontAwesomeIcon icon={faCaretDown}/></div>
                    : <Link to='/login'>Login</Link> 
                }
            </li>
            </ul>
        </nav>
    )
}

export default Navbar;