import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

import "./home.css";
import Stock from "./Stock"

function Home() {
    const { currentUser } = useAuth();

    const [users, setUser] = useState([{
        Email: '',
    }]);

    const [stockElement, setStock] = useState([]);

    useEffect(() => {
        document.title = "Home page"
        retrieve();
        //console.log(users)
        /*
        fetch("/login").then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(jsonRes => setUser(jsonRes))
        console.log(users)
        <div>
                    
                    {users.map(user =>
                        <div>
                            <p>
                                {user.Email}
                            </p>
                        </div>
                    )}

                </div>
                <div>
                            <Stock name={stockElements.Symbol} price={"$24.00"} />
                        </div>

                    {stockElement.map(stockElements =>

                        <p>{stockElements}</p>
                    )}
        */
    }, []);

    async function retrieve() {
        let newUser = {
            Uid: currentUser.uid
        }
        await axios.post("http://localhost:3001/", newUser)
            .then(res => {
                setStock(res.data)
            })
    }

    const addNewStock = () => {
        setStock(stockElement.concat(<Stock name={"RY"} price={"$24.00"} />))
    };

    return (
        <div className="home-container">

            <div className="home-content">

                <div className="section-title">
                    <p className="titles">
                        FAVORITES
                    </p>
                    <div className="title-space">

                    </div>
                    <div className="addition-button" onClick={addNewStock}>
                        <GrAdd className="addition-icon"></GrAdd>
                    </div>
                    <Link to="/stock-addition">
                    </Link>
                </div>

                <div className="stocks-content-section">

                    {stockElement.map(data => (
                        <div>
                            <Stock name={data} price={"$24.00"} />
                        </div>

                    ))}
                </div>

            </div>

        </div>
    );
}

export default Home;