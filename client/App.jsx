import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import SignUp from './components/SignUp.jsx'
import Achievements from "./components/Achievements.jsx";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/achievements" element={<Achievements />} />
        </Routes>
      </Router>
  );
}

export default App;
