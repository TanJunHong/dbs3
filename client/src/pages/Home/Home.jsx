import React, { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import { useContext } from "react";

const Home = () => {

  const { currentUser } = useContext(AuthContext);
  useEffect(() => {});
  return (
    <>
      {currentUser ? (
        <div>
          <h1>Welcome {currentUser.Username}</h1>
          {
            currentUser.Accounts.map((user) => {
                return (
                    <div key={user.AccountID}>
                      <h2>AccountType: {user.AccountType}</h2>
                      <h2>AccountBalance: {user.AccountBalance} </h2>
                    </div>
                );
            }
            )
          }

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
