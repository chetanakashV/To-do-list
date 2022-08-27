import React, { useState } from 'react';
import './RegLog.css'
import { renderMatches, useNavigate } from 'react-router';
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
            {/* Login Page */}<br/><br/><br/><br/><br/>
           {page && <div style = {{textAlign:"center"}}>
            <h3 > <b>LOGIN FORM </b></h3>
           <div >
            {/* <label >Email</label><br/> */}<br/>
            <input type = "email" required className='inp' placeholder='Email' value = {Lemail} onChange = {e => setLEmail(e.target.value)}/><br/>
            {/* <label >Password</label><br/> */}<br/>
            <input type = "password" required className='inp' placeholder='Password' value = {Lpassword} onChange = {e => setLPassword(e.target.value)}/><br/><br/>
            <button  onClick={Login} className="inp log " > Login </button>
            
           </div>
           <br/>
            <button onClick={pageToggler} className = 'togglers'>New here? Click Here to Register Now!!</button>
            
            </div> }

          {/* RegisterPage */}
           {!page && <div style = {{textAlign:"center"}}>
           <form  ><br/>
            <h3> <b>REGISTER FORM </b></h3>
            {/* <label>Name </label><br/> */}<br/>
            <input type = 'text' value = {Rname} placeholder = 'Name 'className ='inp' onChange = {e => setRName(e.target.value)} required/><br/>
            {/* <label>Email </label><br/> */}<br/>
            <input type = 'email' value = {Remail} placeholder ='Email' className ='inp' onChange = {e => setREmail(e.target.value)} required/><br/>
            {/* <label>Password </label><br/> */}<br/> 
            <input type = 'password' value = {Rpassword} placeholder ='Password' className ='inp' onChange = {e => setRPassword(e.target.value)} required/><br/><br/>
            <button  onClick={Register} className ='inp reg' >Register</button><br/><br/>
           </form><br/><br/>

           <button className='togglers' onClick={pageToggler} style ={{color: "green"}}>Already Registered? Click Here to Login Now!!</button>
           </div>}
            
        </div>
    );
}

export default Login;