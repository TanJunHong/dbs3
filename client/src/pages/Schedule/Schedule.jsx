import React, { useEffect, useState } from 'react'
import axios from 'axios'


const Schedule = () => {
  const [schedules, setSchedules] = useState("")
  useEffect(() => {
    const fetchAllSchedule = async () => {
      try {
        const res = await axios.get("http://localhost:8800/schedule");
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
      
      {schedules?.map((schedule) => {
        return (
          <div key={schedule.AccountId}>
          <h2>{schedule.ReceivingAccountID}</h2>
          <h2>{schedule.Date}</h2>
          <h2>{schedule.TransactionAmount}</h2>
          <h2>{schedule.Comment}</h2>
          </div>
        )
      })}
      <div onSubmit={handleDelete}>Delete Scheduled Transaction</div>
    </div>
  )
}

export default Schedule