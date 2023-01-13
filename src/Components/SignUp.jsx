import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from 'react-icons/fa';
import "./signup.css";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext"

function SignUp() {

    //Use effect hooks
    useEffect(() => {
        document.title = "Sign-up"
    });

    const navigate = useNavigate()
    const { signup, currentUser } = useAuth();

    //States 
    const [input, setInput] = useState({
        first: '',
        last: '',
        user: '',
        email: '',
        pass: '',
        confirm: ''
    })
    const emailRef = useRef()
    const passRef = useRef()
    const passConfRef = useRef()

    const [successBox, setSucessBoxVis] = useState(false)
    const [lockStatus, setLock] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    let newUser;

    function formInput(e) {
        const { name, value } = e.target
        setInput(() => ({ ...input, [name]: value }))
    }

    async function formSubmit(e) {
        e.preventDefault();

        //password requirements 
        if (passRef.current.value == "") {
            return setErrorMsg("Invalid password, please try again.")
        }
        else if (passRef.current.value != passConfRef.current.value) {
            return setErrorMsg("Password do not match, please try again.");
        }

        try {
            //console.log(currentUser);
            alert("created")
            setErrorMsg("");
            setLock(true)

            await signup(emailRef.current.value, passRef.current.value)
            let newUser = {
                Uid: currentUser.uid
            };
            await axios.post("http://localhost:3001/sign-up", newUser).then(res => {
                console.log(res.data)
            })


            setLock(false)
            navigate('/')
        }
        catch (error) {
            //firebase error code checks
            if (error.code == "auth/email-already-in-use") {
                setErrorMsg("Email belongs to another account, please try again.");
            }
            else if (error.code == "auth/invalid-password") {
                setErrorMsg("Invalid password, please try again.");
            }
            else if (error.code == "auth/invalid-email") {
                setErrorMsg("Invalid email, please try again.");
            }

            else {
                setErrorMsg("Could not create account, please try again.")
            }

        }

        //FETCH CODE - START
        //signup(emailRef.current.value, passRef.current.value);
        /*
        setMessage("")
        setMessageBoxVis(false)
        

        axios.post("http://localhost:3001/sign-up", newUser)
        setSucessBoxVis(true)
        
        
        
        fetch("/sign-up").then((res) => {
            if (res.ok) {
                return res.json()
            }
        }).then(foundUser => { setUser(foundUser) })
        console.log(users)
        */
        //FETCH CODE - END


    }

    return (
        <div className="signup-container">
            <div className="register-section">
                <div className="register">
                    {!successBox && (

                        <div>
                            {/*currentUser.email*/}
                            <div className="signup-form-title">
                                <p style={{ margin: 0 }}>
                                    Sign-up
                                </p>
                            </div>
                            {/* 
                            <form>
                                //comment out
                                <label className="form-label">
                                    First name<p className="requirement">*</p>
                                </label>
                                
                                <input onChange={formInput} placeholder="First name" name='first' value={input.first} autoComplete="off" className="input-form" type="text" required />

                            </form>
                            
                            <form>
                                //comment out
                                <label className="form-label">
                                    Last name<p className="requirement">*</p>
                                </label>
                            
                                <input onChange={formInput} placeholder="Last name" name='last' value={input.last} autoComplete="off" className="input-form" type="text" required />
                            </form>
                            
                            <form>
                                //comment out
                                <label className="form-label">
                                    Username<p className="requirement">*</p>
                                </label>
                                
                                <input onChange={formInput} placeholder="Username" name='user' value={input.user} autoComplete="off" className="input-form" type="text" required />
                            </form>
                            */}
                            <form>
                                {/*
                                <label className="form-label">
                                    Email<p className="requirement">*</p>
                                </label>
                                */}
                                <input onChange={formInput} ref={emailRef} placeholder="Email" name='email' value={input.email} autoComplete="off" className="input-form" type="text" required />
                            </form>
                            <form>
                                {/* 
                                <label className="form-label">
                                    Password<p className="requirement">*</p>
                                </label>
                                */}
                                <input onChange={formInput} ref={passRef} placeholder="Password" name='pass' value={input.pass} autoComplete="off" className="input-form" type="password" required />
                            </form>
                            <form>
                                {/* 
                                <label className="form-label" >Confirm Password</label>
                                */}
                                <input onChange={formInput} ref={passConfRef} placeholder="Confirm password" name='confirm' value={input.confirm} autoComplete="off" className="input-form" type="password" required />
                            </form>
                            <button disable={lockStatus} onClick={formSubmit} className="register-button">Sign-up</button>
                            {errorMsg != "" && (
                                <div className="error-messageBox">
                                    <p className="description errorMessage">
                                        {errorMsg}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                    {successBox && (
                        <div>
                            <div className="success-signUp-messageBox">
                                <p className="description successMessage">
                                    Congratulations, you have successfully created an account.
                                </p>
                            </div>
                            <Link exact={true} to="/">
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
        </div >

    );
}

export default SignUp;