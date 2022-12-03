import {Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Login from "../Login/Login";

const Home = () => {

  const { currentUser } = useContext(AuthContext);
  useEffect(() => {});
  return (
    <>
      {currentUser ? (
        <div>
          <h1>Welcome {currentUser.Username}</h1>
          <Container component="main" maxWidth="xs">
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Account Type</TableCell>
                  <TableCell align="right">Account Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  currentUser.Accounts.map((user) => {
                        return (
                            <TableRow
                                key={user.AccountID}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell align="right">{user.AccountType}</TableCell>
                              <TableCell align="right">{user.AccountBalance}</TableCell>
                            </TableRow>
                        );
                      }
                  )
                }
              </TableBody>
            </Table>
          </TableContainer>
          </Container>


        </div>
      ) : (
        <div>
          <Login/>
        </div>
      )}
    </>
  );
};

export default Home;
