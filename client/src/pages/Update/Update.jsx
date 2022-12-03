import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import UpdateEmail from "../UpdateEmail/UpdateEmail";

const Update = () => {
  return (
    <div>
      <Navbar />
        <h1>Update Email & Address</h1>
      <UpdateEmail />
    </div>
  );
};
export default Update;