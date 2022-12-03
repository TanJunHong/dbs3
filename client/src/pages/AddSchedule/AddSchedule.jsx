import {Button, Container, TextField} from "@material-ui/core";
import axios from 'axios';
import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'


const AddSchedule = () => {
    const [schedule, setSchedule] = useState({
        TransactionID: "",
        AccountID: "",
        ReceivingAccountID: "",
        Date: "",
        TransactionAmount: "",
        Comment: ""
      });
   
const handleChange = (e) => {
    setSchedule((prev) => ({ ...prev, [e.target.name]: e.target.value }));
}

const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("TransactionID", schedule.TransactionID);
    formData.append("AccountID", schedule.AccountID);
    formData.append("ReceivingAccountID", schedule.ReceivingAccountID);
    formData.append("Date", schedule.Date);
    formData.append("TransactionAmount", schedule.TransactionAmount);
    formData.append("Comment", schedule.Comment);
    const res = await axios.post('http://localhost:5000/insert_transactions', formData)
}

  return (
    <div>
        <Navbar/>
        <h1>Schedule a transaction</h1>
        <Container component="main" maxWidth="xs">
     <form>
         <TextField type="int" variant="outlined" margin="normal" required fullWidth id="TransactionID"
                    inputProps={{title: "TransactionID"}}
                    label="Transaction ID" name="TransactionID" autoComplete="TransactionID" autoFocus
                    onChange={handleChange}/>
         <TextField type="int" variant="outlined" margin="normal" required fullWidth id="AccountID"
                    inputProps={{title: "AccountID"}}
                    label="Account ID" name="AccountID" autoComplete="AccountID" autoFocus
                    onChange={handleChange}/>
         <TextField type="int" variant="outlined" margin="normal" required fullWidth id="ReceivingAccountID"
                    inputProps={{title: "ReceivingAccountID"}}
                    label="Receiving Account ID" name="ReceivingAccountID" autoComplete="ReceivingAccountID" autoFocus
                    onChange={handleChange}/>
         <TextField type="date" variant="outlined" margin="normal" required fullWidth id="Date"
                    inputProps={{title: "Date"}}
                    label="Date" name="Date" autoComplete="Date" autoFocus
                    onChange={handleChange}/>
         <TextField type="number" variant="outlined" margin="normal" required fullWidth id="TransactionAmount"
                    inputProps={{title: "TransactionAmount"}}
                    label="Transaction Amount" name="TransactionAmount" autoComplete="TransactionAmount" autoFocus
                    onChange={handleChange}/>
         <TextField type="text" variant="outlined" margin="normal" required fullWidth id="Comment"
                    inputProps={{title: "Comment"}}
                    label="Comment" name="Comment" autoComplete="Comment" autoFocus
                    onChange={handleChange}/>
         <Button type="submit" fullWidth variant="contained" color="primary" onClick={handleSubmit}
                 title="Set Transaction">
             Set Transaction
         </Button>
     </form>


        </Container>
    </div>
  )
}

export default AddSchedule