import React from 'react'
import { useState } from 'react'

const Login = () => {

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("")

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  console.log(inputs)

  return (
    <div>
      <form>
        <input required type="text" placeholder='username' name='username' onchange={handleChange}/>
        <input required type="password" placeholder='password' name='password' onchange={handleChange}/>
      </form>
      <button>Login</button>
      Login hello
      </div>
  )
}

export default Login