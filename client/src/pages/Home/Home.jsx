import React, { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import { useContext } from "react";

const Home = () => {

  const { currentUser } = useContext(AuthContext);
  console.log("curr " + currentUser);
  useEffect(() => {});
  return (
    <>
      {currentUser ? (
        <div>
          <h1>Welcome {currentUser.Username}</h1>
          <h2>AccountType: {currentUser.AccountType}</h2>
          <h2>AccountBalance: {currentUser.AccountBalance} </h2> 
        </div>
      ) : (
        <div>
          <Link to="/login">Back to Login</Link>
        </div>
      )}
    </>
  );
};

export default Home;
