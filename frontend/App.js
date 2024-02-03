// import './App.css';
import {Route, Routes} from 'react-router-dom';
import { useState } from 'react';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Update from './components/Update';

function App() {
  // State to track user login status
  const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App">
      
      {/* Navigation Bar */}
      <Navbar/>

      {/* Routing for different components */}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route
          path="/Login"
          element={<Login isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />}
        />
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/Update/:userEmail" element={<Update/>}/>
      </Routes>
    </div>
  );
}

export default App;
