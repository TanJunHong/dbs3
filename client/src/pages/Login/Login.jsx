import React from 'react'
import { useState } from 'react'
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import './login.css'


const Login = () => {
  const [err, setError] = useState(null)
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const { login } = useContext(AuthContext);
 const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(inputs)
      navigate("/home");
    } catch (err) {
      setError(err)
        console.log(err)
    }
  };
  

  console.log(inputs)

  return (
    <div className='login'>
      <h1>Login</h1>
      <form classNmae='form'>
        <input required type="text" placeholder='username' name='username' onChange={handleChange}/>
        <input required type="password" placeholder='password' name='password' onChange={handleChange}/>
      </form>
      <button onSubmit={handleSubmit}>Login</button> 
      {inputs ? <p>{err}</p> : <p> Logged In</p>}
      </div>
  )
}

export default Login