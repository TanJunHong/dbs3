import {AppBar, IconButton, Toolbar} from "@mui/material";
import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import HomeIcon from '@mui/icons-material/Home';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';

const Navbar = () => {
  const { logout, currentUser } = useContext(AuthContext);
    const navigate = useNavigate()
    async function handleLogout() {
        await logout();
        navigate("/login");
    }
  return (
      <AppBar position="static" style={{background: "#282c34", textAlign: "center"}}>
          <Toolbar>
              <IconButton aria-label="home" color="inherit" onClick={() => navigate("/")}><HomeIcon/></IconButton>
              {/*<Typography variant="h5" component="div" sx={{flexGrow: 1}}>
                  News Summariser
              </Typography>*/}
              <IconButton aria-label="update" color="inherit" onClick={() => navigate("/update")}><UpgradeIcon/></IconButton>
              <IconButton aria-label="schedule" color="inherit" onClick={() => navigate("/schedule")}><ScheduleIcon/></IconButton>
              <IconButton aria-label="delete" color="inherit" onClick={() => navigate("/addschedule")}><ScheduleSendIcon/></IconButton>
              <IconButton aria-label="delete" color="inherit" onClick={() => navigate("/delete")}><DeleteIcon/></IconButton>
              <IconButton aria-label="logout" color="inherit" onClick={handleLogout}><LogoutIcon/></IconButton>

          </Toolbar>
      </AppBar>
    /*<div>
      <Link to="/">Home</Link>
      <Link to="/update">Update</Link>
      <Link to="/schedule">Schedule</Link>
      {currentUser ? <Link to="/login">Logout</Link> : null}
    </div>*/
  );
};

export default Navbar;
