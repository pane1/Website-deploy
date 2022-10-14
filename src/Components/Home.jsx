import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { Link } from "react-router-dom"

import "./home.css";
import Stock from "./Stock"

function Home() {

    const [users, setUser] = useState([{
        Email: '',
    }]);

    const [stockElement, setStock] = useState([{
        StockName: 'RY'
    }]);

    useEffect(() => {
        document.title = "Home page"
        axios.get("http://localhost:3001/login")
            .then(res =>
                setUser(res.data)
            )
        console.log(users)
        /*
        fetch("/login").then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(jsonRes => setUser(jsonRes))
        console.log(users)*/
    });

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
                    <Link exact to="/stock-addition">
                    </Link>
                </div>

                <div className="stocks-content-section">

                    {stockElement.map(stockElements =>
                        <div>
                            <Stock name={stockElements.StockName} price={"$24.00"} />
                        </div>

                    )}
                </div>
                <div>
                    {users.map(user =>
                        <div>
                            <p>
                                {user.Email}
                            </p>
                        </div>
                    )}

                </div>
            </div>

        </div>
    );
}

export default Home;