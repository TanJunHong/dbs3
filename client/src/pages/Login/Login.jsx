import React from 'react'
import { useState } from 'react'

const Login = () => {

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      await login(inputs)
      navigate("/logout");
    } catch (err) {
        console.log(err)
    }
  };
  }

  console.log(inputs)

  return (
    <div>
      <form>
        <input required type="text" placeholder='username' name='username' onChange={handleChange}/>
        <input required type="password" placeholder='password' name='password' onChange={handleChange}/>
      </form>
      <button onSubmit={handleSubmit}>Login</button> 
      {inputs ? <p>{err}</p> : <p> Logged In</p>}
      </div>
  )
}

export default Login