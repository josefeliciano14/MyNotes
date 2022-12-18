import { useState } from "react";
import { Link } from "react-router-dom";

function Register(){
    const [formData, setFormData] = useState({username: '', password: ''});

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

                    return;
                }

                if(data?.message){
                    console.log(data?.message);
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
            </form>

            <Link to="/register">Don't have an account? Register Here</Link>
        </main>
    )
}

export default Register;