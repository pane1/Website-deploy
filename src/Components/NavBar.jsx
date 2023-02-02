import "./NavBar.css"
import React from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../images/logo.png"
import { useAuth } from "../contexts/AuthContext"

function NavBar() {
  //hooks
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  async function Logout() {
    try {
      await logout();
      navigate("/login");
    }
    catch {
      alert("Issue with logout.");
    }
  }
  function showUser() {
    console.log(currentUser.uid);
  }
  return (

    <nav className='Nav-bar'>
      <div className="Nav-bar-content">
        <Link exact="true" to="/">
          <img className="nav-logo" src={logo}></img>
        </Link>
        <Link exact="true" to="/">
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
              Sign-in
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
        {false &&
          <div onClick={showUser} className="menu-tab" >
            <p className="menu-text">
              Current User
            </p>
          </div>
        }

        <div className="nav-space">

        </div>
        {currentUser &&
          <div className="logout-menu-tab" onClick={Logout}>
            <p className="logout-menu-text">
              Logout
            </p>
          </div>
        }



      </div>

    </nav>
  )
}

export default NavBar;
