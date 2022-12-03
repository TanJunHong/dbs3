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
  
  return (
    <div>
      
      {schedules?.map((schedule) => {
        return (
          <>
          <h2>{schedule.ReceivingAccountID}</h2>
          <h2>{schedule.Date}</h2>
          <h2>{schedule.TransactionAmount}</h2>
          <h2>{schedule.Comment}</h2>
          </>
        )
      })}
    </div>
  )
}

export default Schedule