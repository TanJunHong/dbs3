import {Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from "../../components/Navbar/Navbar";


const Schedule = () => {
  const [schedules, setSchedules] = useState("")
  useEffect(() => {
    const fetchAllSchedule = async () => {
      try {
        const res = await axios.get("http://localhost:5000/get_transaction_details");
        setSchedules(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllSchedule();
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(``);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div>
      <Navbar/>
      <Container component="main" maxWidth="s">
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Receiving Account ID</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Transaction Amount</TableCell>
                <TableCell align="right">Comment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                schedules ? schedules.map((schedule) => {
                      return (
                          <TableRow
                              key={schedule.AccountID}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell align="right">{schedule.ReceivingAccountID}</TableCell>
                            <TableCell align="right">{schedule.Date}</TableCell>
                            <TableCell align="right">{schedule.TransactionAmount}</TableCell>
                            <TableCell align="right">{schedule.Comment}</TableCell>
                          </TableRow>
                      );
                    }
                ) : ""
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  )
}

export default Schedule