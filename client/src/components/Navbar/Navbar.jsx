import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/schedule">Schedule</Link>
      <Link to="/addschedule">Add Schedule</Link>
      <Link to="/update">Update Email</Link>
      
      {currentUser ? <Link to="/login">Logout</Link> : null}
      
    </div>
  );
};

export default Navbar;
