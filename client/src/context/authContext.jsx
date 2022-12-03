import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const navigate = useNavigate()

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
      );

      
  const login = async (inputs) => {
    const formData = new FormData();
    formData.append("username", inputs.username);
    formData.append("password", inputs.password);
    const res = await axios.post("http://localhost:5000/login", formData);
    if (Object.keys(res.data).length !== 0) {
      setCurrentUser(res.data);
      navigate("/");
    } else {
      alert("Invalid Credentials");
    }

  };

  const logout = async (inputs) => {
    await axios.post("");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  console.log(currentUser)
    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
    };


