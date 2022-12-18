import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import './Login.css';

function Register(){
    const [formData, setFormData] = useState({username: '', password: ''});

    const [errorMessage, setErrorMessage] = useState("");

    const nav = useNavigate();

    function register(e){
        e.preventDefault();

        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }

        fetch("http://localhost:5000/users/signup", requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data?.token){
                    localStorage.setItem("auth", data.token);

                    nav("/");

                    return;
                }

                if(data?.message){
                    setErrorMessage(data?.message);
                }
            });
    }

    function handleChange(e){
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    
    return(
        <main>
            <h1>Register</h1>

            <form className="login-register-form">
                <input type='text' name='username' placeholder='Username' onChange={handleChange}/>
                <input type="password" name='password' placeholder='Password' onChange={handleChange}/>
                <button onClick={register}>Register</button>
                <span className="error-message">{errorMessage}</span>
            </form>

            <Link to="/login">Already have an account? Login here</Link>
        </main>
    )
}

export default Register;