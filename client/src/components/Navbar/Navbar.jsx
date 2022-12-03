import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const { login, currentUser } = useContext(AuthContext);
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/update">Update</Link>
      <Link to="/schedule">Schedule</Link>
      {currentUser ? <Link to="/login">Logout</Link> : null}
    </div>
  );
};

export default Navbar;
