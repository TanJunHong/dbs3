import {Button, Container, TextField} from "@material-ui/core";
import React, {useContext} from "react";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './delete.css'
import {AuthContext} from "../../context/authContext";

const Delete = () => {
    const [err, setError] = useState(null)
    const [inputs, setInputs] = useState({
      transaction_id: "",
      account_id: "",
    });
  
      const { login } = useContext(AuthContext);
   const navigate = useNavigate()
  
    const handleChange = (e) => {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
    
          const formData = new FormData();
          formData.append("transaction_id", inputs.transaction_id);
          formData.append("account_id", inputs.account_id);
    
        try {
            const response = await fetch('http://localhost:5000/delete_transactions', {
                method: 'POST',
                body: formData
            });
          //await login(inputs)
            const data = await response.json()
            console.log(data);
            if (data.status) {
                navigate("/home");
            }
        } catch (err) {
          setError(err)
            console.log(err)
        }
      };

    return (
        <div>
        <h1>Delete</h1>
          <Container component="main" maxWidth="xs">
          <form onSubmit={handleSubmit}>
              <TextField type="text" variant="outlined" margin="normal" required fullWidth id="transaction_id"
                         inputProps={{title: "transaction id"}}
                         label="transaction_id" name="transaction_id" autoComplete="transaction_id" autoFocus
                         onChange={handleChange}/>
              <TextField variant="outlined" margin="normal" required fullWidth name="account_id" label="account_id"
                         inputProps={{title: "account id"}}
                         type="account_id" id="account_id" autoComplete="current-password"
                         onChange={handleChange}/>
              <Button type="delete" fullWidth variant="contained" color="primary"
                      title="delete">
                  Delete
              </Button>
          </form>
          </Container>
        </div>
    )
  }
  
  export default Delete
