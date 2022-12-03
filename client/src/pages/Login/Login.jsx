import {Button, Container, TextField} from "@material-ui/core";
import React, {useContext} from "react";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './login.css'
import {AuthContext} from "../../context/authContext";


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
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: inputs.username,
                password: inputs.password
            })
        });
      //await login(inputs)
        console.log(response);
      navigate("/home");
    } catch (err) {
      setError(err)
        console.log(err)
    }
  };

  return (
    <div>
      <h1>Login</h1>
        <Container component="main" maxWidth="xs">
        <form onSubmit={handleSubmit}>
            <TextField type="text" variant="outlined" margin="normal" required fullWidth id="username"
                       inputProps={{title: "username"}}
                       label="Username" name="username" autoComplete="username" autoFocus
                       onChange={handleChange}/>
            <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password"
                       inputProps={{title: "password"}}
                       type="password" id="password" autoComplete="current-password"
                       onChange={handleChange}/>
            <Button type="submit" fullWidth variant="contained" color="primary"
                    title="sign-in">
                Sign In
            </Button>
        </form>
        </Container>
      </div>
  )
}

export default Login