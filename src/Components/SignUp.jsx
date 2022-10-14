import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from 'react-icons/fa';
import "./signup.css";
import axios from "axios";

function SignUp() {
    useEffect(() => {
        document.title = "Sign-up"
    });
    const [input, setInput] = useState({
        first: '',
        last: '',
        user: '',
        email: '',
        pass: '',
        confirm: ''
    })

    const [message, setMessage] = useState("")
    const [messageBox, setMessageBoxVis] = useState(false)
    const [successBox, setSucessBoxVis] = useState(false)

    //const [test, setTest] = useState("123")

    function formInput(e) {
        const { name, value } = e.target
        setInput(() => ({ ...input, [name]: value }))
    }

    function formSubmit(e) {
        e.preventDefault();
        try {
            const newUser = {
                FirstName: input.first,
                LastName: input.last,
                Username: input.user,
                Email: input.email,
                Password: input.pass
            }
            console.log(newUser)
            if (input.first == "" || input.last == "" || input.user == "" || input.email == "" || input.pass == "" || input.confirm == "") {
                setMessage("Missing field, please fill in all fields.")
                setMessageBoxVis(true);
            }
            else if (input.pass.length > 16 || input.pass.length < 8) {
                setMessage("Password is not the proper length, please try again.")
                setMessageBoxVis(true);
            }
            else if (input.pass != input.confirm) {
                setMessage("Your password does not match, please try again.")
                setMessageBoxVis(true);
            }
            else {
                axios.post("http://localhost:3001/sign-up", newUser)
                    .then((res) => {

                        if (res.data.exist == 1) {

                            setMessage("An account with this email already exists.");
                            setMessageBoxVis(true);
                        }
                        else {
                            setMessage("")
                            setMessageBoxVis(false);
                            setSucessBoxVis(true);
                        }
                    })
            }

            /*
            setMessage("")
            setMessageBoxVis(false)
            

            axios.post("http://localhost:3001/sign-up", newUser)
            setSucessBoxVis(true)
            */
            /*
            fetch("/sign-up").then((res) => {
                if (res.ok) {
                    return res.json()
                }
            }).then(foundUser => { setUser(foundUser) })
            console.log(users)*/
        }
        catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                console.log(error.response.data.errorMessage)
            }
        }
    }

    return (
        <div className="signup-container">
            <div className="register-section">
                <div className="register">
                    {!successBox && (
                        <div>
                            <div style={{ height: "2vmin" }}>
                                <p>
                                    Sign-up form
                                </p>
                            </div>
                            <form>
                                {/* 
                                <label className="form-label">
                                    First name<p className="requirement">*</p>
                                </label>
                                */}
                                <input onChange={formInput} placeholder="First name" name='first' value={input.first} autoComplete="off" className="input-form" type="text" required />

                            </form>
                            <form>
                                {/* 
                                <label className="form-label">
                                    Last name<p className="requirement">*</p>
                                </label>
                                */}
                                <input onChange={formInput} placeholder="Last name" name='last' value={input.last} autoComplete="off" className="input-form" type="text" required />
                            </form>
                            <form>
                                {/* 
                                <label className="form-label">
                                    Username<p className="requirement">*</p>
                                </label>
                                */}
                                <input onChange={formInput} placeholder="Username" name='user' value={input.user} autoComplete="off" className="input-form" type="text" required />
                            </form>
                            <form>
                                {/* 
                                <label className="form-label">
                                    Email<p className="requirement">*</p>
                                </label>
                                */}
                                <input onChange={formInput} placeholder="Email" name='email' value={input.email} autoComplete="off" className="input-form" type="text" required />
                            </form>
                            <form>
                                {/* 
                                <label className="form-label">
                                    Password<p className="requirement">*</p>
                                </label>
                                */}
                                <input onChange={formInput} placeholder="Password" name='pass' value={input.pass} autoComplete="off" className="input-form" type="password" required />
                            </form>
                            <form>
                                {/* 
                                <label className="form-label" >Confirm Password</label>
                                */}
                                <input onChange={formInput} placeholder="Confirm password" name='confirm' value={input.confirm} autoComplete="off" className="input-form" type="password" required />
                            </form>
                            <p className="description">* (required field)</p>
                            {messageBox && (
                                <div className="error-messageBox">
                                    <p className="description errorMessage">
                                        {message}
                                    </p>
                                </div>
                            )}
                            <button onClick={formSubmit} className="register-button">Sign-up</button>
                        </div>
                    )}
                    {successBox && (
                        <div>
                            <div className="success-signUp-messageBox">
                                <p className="description successMessage">
                                    Congratulations, you have successfully created an account.
                                </p>
                            </div>
                            <Link exact to="/">
                                <div className="homeButton" >
                                    <p className="homeButton-text">
                                        Go back to Home page <FaArrowRight className="button-icon" />
                                    </p>
                                </div>
                            </Link>

                        </div>
                    )}
                </div>

            </div>
        </div>

    );
}

export default SignUp;