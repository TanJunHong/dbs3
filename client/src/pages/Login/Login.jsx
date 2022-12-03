import { Button, Container, TextField } from "@material-ui/core";
import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { AuthContext } from "../../context/authContext";

const Login = () => {
  const [err, setError] = useState(null);
  const [schedule, setSchedule] = useState({
    TransactionID: "",
    AccountID: "",
    ReceivingAccountID: "",
    Date: "",
    TransactionAmount: "",
    Comment: "",
  });

  const { currentUser } = useContext(AuthContext);


  const handleChange = (e) => {
    setSchedule((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {};

  return (
    <>
      <div>
        <h1>Login</h1>
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
      </div>
    </>
  );
};

export default Login;
