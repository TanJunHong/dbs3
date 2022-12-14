import {Button, Container, TextField} from "@material-ui/core";
import React, {useContext} from "react";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './delete.css'
import Navbar from "../../components/Navbar/Navbar";
import {AuthContext} from "../../context/authContext";
import axios from "axios";

const Delete = () => {
    const [err, setError] = useState(null)
    const [inputs, setInputs] = useState({
      transaction_id: 0,
      account_id: 0,
    });
  
      const { login } = useContext(AuthContext);
   const navigate = useNavigate()

   const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  
    const handleChange = (e) => {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append("transaction_id", inputs.transaction_id);
        formData.append("account_id", inputs.account_id);
        console.log(inputs)
        const res = await axios.post("http://localhost:5000/delete_transaction", formData);

        if ("Status" in res.data) {
            if (res.data["Status"]) {
                console.log(JSON.stringify(res.data));
                alert("Successfully Deleted!");
                navigate("/");
            } else {
                alert("Invalid Transaction ID/Account ID");
            }
        } else if ("Not Future Transaction" in res.data) {
            alert("Transaction has already completed.")
        }
      };

    return (
        <>
            <Navbar/>
        <h1>Delete Transaction</h1>
          <Container component="main" maxWidth="xs">
          <form onSubmit={handleSubmit}>
              <TextField type="text" variant="outlined" margin="normal" required fullWidth id="transaction_id"
                         inputProps={{title: "transaction id"}}
                         label="Transaction ID" name="transaction_id" autoComplete="transaction_id" autoFocus
                         onChange={handleChange}/>
              <TextField variant="outlined" margin="normal" required fullWidth name="account_id" label="Account ID"
                         inputProps={{title: "account id"}}
                         type="Account ID" id="account_id" autoComplete="current-password"
                         onChange={handleChange}/>
              <Button type="delete" fullWidth variant="contained" color="primary"
                      title="delete">
                  Delete
              </Button>
          </form>
          </Container>
        </>
    )
  }
  
  export default Delete
