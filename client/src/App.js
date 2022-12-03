
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Update from './pages/Update/Update';
import Schedule from './pages/Schedule/Schedule';
import AddSchedule from './pages/AddSchedule/AddSchedule';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route strict exact path={'/login'} element={<Login/>}></Route>
      <Route strict exact path={'/'} element={<Home/>}></Route>
      <Route strict exact path={'/update'} element={<Update/>}></Route>
      <Route strict exact path={'/schedule'} element={<Schedule/>}></Route>
      <Route strict exact path={'/addSchedule'} element={<AddSchedule/>}></Route>
     
    </Routes>
    </div>
  );
}

export default App;
