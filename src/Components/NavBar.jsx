import "./NavBar.css"
import React from "react"
import { Link } from "react-router-dom"
import logo from "../images/logo.png"

function NavBar() {
  return (

    <nav className='Nav-bar'>
      <div className="Nav-bar-content">
        <Link exact to="/">
          <img className="nav-logo" src={logo}></img>
        </Link>
        <Link exact to="/">
          <div className="menu-tab" >
            <p className="menu-text">
              Home
            </p>
          </div>
        </Link>
        <Link to="/stock-addition">
          <div className="menu-tab" >
            <p className="menu-text">
              Stocks
            </p>
          </div>
        </Link>
        <Link to="/login">
          <div className="menu-tab" >
            <p className="menu-text">
              Login
            </p>
          </div>
        </Link>
        <Link to="/sign-up">
          <div className="menu-tab" >
            <p className="menu-text">
              Sign-up
            </p>
          </div>
        </Link>

      </div>

    </nav>
  )
}

export default NavBar;
