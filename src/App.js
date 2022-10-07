import './App.css';
import {BrowserRouter as Router, Route, Switch, Link, NavLink} from "react-router-dom";
import Login from "./Components/Login";
import Navbar from "./Components/NavBar";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home"
import Search from "./Components/SearchPage"

import React, {useState} from "react";

function App() {
  
  return (
    <Router>
      <Navbar/>
 
      <Route exact path="/">
        <Home/>
      </Route>
      <Route path="/stock-addition">
        <Search/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/sign-up">
        <SignUp/>
      </Route>
    </Router>
  );
}

export default App;
