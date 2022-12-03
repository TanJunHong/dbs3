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
    const res = await axios.post('', schedule)
}

console.log(schedule)
  return (
    <div>
        <Navbar/>
        <h1>Schedule a transaction</h1>
     <form>
     <input
          required
          type="int"
          placeholder="TransactionID"
          name="TransactionID"
          onChange={handleChange}
        />
             <input
          required
          type="int"
          placeholder="AccountID"
          name="AccountID"
          onChange={handleChange}
        />
                     <input
          required
          type="int"
          placeholder="ReceivingAccountID"
          name="ReceivingAccountID"
          onChange={handleChange}
        />
                     <input
          required
          type="int"
          placeholder="Date"
          name="Date"
          onChange={handleChange}
        />
                             <input
          required
          type="int"
          placeholder="TransactionAmount"
          name="TransactionAmount"
          onChange={handleChange}
        />
                             <input
          required
          type="int"
          placeholder="Comment"
          name="Comment"
          onChange={handleChange}
        />
     </form>
     <button onChange={handleSubmit}>Set Transaction</button>
    </div>
  )
}

export default AddSchedule