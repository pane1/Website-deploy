import React, { useState } from "react"
import { Link } from "react-router-dom"
import "./Login.css"
import axios from "axios";
import { useEffect } from "react";


function Login() {
  useEffect(() => {
    document.title = "Login"
  });

  const [input, setInput] = useState({
    user: '',
    pass: ''
  })

  const [message, setMessage] = useState("");
  const [messageBox, setMessageBoxVis] = useState(false);
  const [successBox, setSucessBoxVis] = useState(false);

  function formInput(e) {
    const { name, value } = e.target
    setInput(() => ({ ...input, [name]: value }))
  }

  function formSubmit(e) {
    e.preventDefault();

    const newUser = {
      Email: input.user,
      Password: input.pass
    }
    axios.post("http://localhost:3001/login", newUser)
      .then(res => {
        if (res.data.error == 1) {
          setMessage(res.data.errorMessage);
          setMessageBoxVis(true);
        }
        else {
          setMessage("");
          setMessageBoxVis(false);
          setSucessBoxVis(true);
          setTimeout(function () {
            setSucessBoxVis(false);
          }, 3000)
        }

      })
  }

  return (
    <div className="login-container">
      <div className="login-section">
        {!successBox && (
          <div className="login">
            <div style={{ height: "5vmin" }}>
            </div>
            <form>
              {/*
              <label className="login-form-label">Username</label>
              */}
              <input onChange={formInput} placeholder="Username" name='user' value={input.user} autoComplete="off" className="login-input-form" type="text" />
            </form>
            <form>
              {/*
              <label className="login-form-label">Password</label>
              */}
              <input onChange={formInput} placeholder="Password" name='pass' value={input.pass} autoComplete="off" className="login-input-form" type="password" />
              <a className="forget-option">
                Forget password?
              </a>
            </form>
            {messageBox && (
              <div className="error-messageBox">
                <p className="errorMessage">
                  {message}
                </p>
              </div>
            )}
            <button onClick={formSubmit} className="login-button">Login</button>
            <p className="login-text">
              Don't have an account?
              {/* 
              
            */}
              <Link className="sign-up-option" exact to="/sign-up">
                Sign-up
              </Link>
            </p>

          </div>
        )}
        {successBox && (
          <div className="success-login-messageBox">
            <p className="success-login-message">
              Successfully logged-in, welcome
            </p>
          </div>
        )}
      </div>
    </div>

  );
}

export default Login;