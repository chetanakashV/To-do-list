import React, { useState } from 'react';
import './RegLog.css'
import { useNavigate } from 'react-router';
import Axios from 'axios'

function Login(props) {
    const navigate = useNavigate();
    const[page,setPage] = useState(true);
    const [Rname, setRName] = useState('');
    const [Remail,setREmail] = useState('');
    const [Rpassword,setRPassword] = useState('');
    const [Lemail,setLEmail] = useState('');
    const [Lpassword, setLPassword] = useState('');
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))

    const pageToggler = () => {
        setPage(!page);
    }

    const Register = () => {
        Axios.post('http://localhost:3001/register', {
            name: Rname, email: Remail, password: Rpassword
        }).then(response => {
            if(response.data.auth){
                alert('registration successful')
            }
            else{
                alert('user already registered')
            }
        });
    };

    const Login = () => {
            Axios.post('http://localhost:3001/login', {
                email: Lemail, password: Lpassword
            }).then((response) => {
                if(!response.data.auth){
                    alert("invalid credentials");
                    setIsAuth(false);
                }
                else{
                    setIsAuth(true);
                    localStorage.setItem("isAuth",true)
                    localStorage.setItem("email",Lemail)
                    navigate(`/tasks`)
                }
            })
    }

  

    return (
        <div>
            {/* Login Page */}
           {page && <div style = {{textAlign:"center"}}>
           <div >
            <label >Email:</label><br/>
            <input type = "email" required value = {Lemail} onChange = {e => setLEmail(e.target.value)}/><br/>
            <label >Password:</label><br/>
            <input type = "password" required  value = {Lpassword} onChange = {e => setLPassword(e.target.value)}/><br/><br/>
            <button  onClick={Login}> Login </button>
            
           </div>
           <br/>
            <button onClick={pageToggler} className = 'togglers'>New here? Click Here to Register Now!!</button>
            
            </div> }

          {/* RegisterPage */}
           {!page && <div style = {{textAlign:"center"}}>
           <form >
            <label>Name: </label><br/>
            <input type = 'text' value = {Rname} onChange = {e => setRName(e.target.value)} required/><br/>
            <label>Email: </label><br/>
            <input type = 'email' value = {Remail} onChange = {e => setREmail(e.target.value)} required/><br/>
            <label>Password: </label><br/>
            <input type = 'password' value = {Rpassword} onChange = {e => setRPassword(e.target.value)} required/><br/><br/>
            <button  onClick={Register}>Register</button><br/>
           </form><br/><br/>

           <button className='togglers' onClick={pageToggler}>Already Registered? Click Here to Login Now!!</button>
           </div>}
            
        </div>
    );
}

export default Login;