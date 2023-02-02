import { sectionFooterSecondaryContent } from "aws-amplify";

import React, { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios";

import "./home.css";
import Stock from "./Stock"
import UserEntry from "./UserEntry"

function Home() {
    const { currentUser } = useAuth();

    const [stockElement, setStock] = useState([]);

    const [lock, setLock] = useState(false);
    const [visible, setVis] = useState(true);

    useEffect(() => {
        document.title = "Home page"
        retrieve();
        console.log("retrieved");
        console.log(stockElement)
    }, []);

    const test = [
        {
            name: "Tim",
            age: "24"
        },
        {
            name: "Bob",
            age: "22"
        }
    ]
    async function retrieve() {
        let newUser = {
            Uid: currentUser.uid
        }

        try {
            await axios.post("http://localhost:3001/", newUser)
                .then(res => {
                    let data = res.data

                    if (data != "Could not load account data") {
                        setStock(data);
                    }
                })

        }
        catch (error) {
            alert(error);
            console.log(error);
        }

    }

    async function deleteEntry(userData) {
        //console.log(userData)

        let user = {
            Uid: currentUser.uid,
            Symbol: userData.Symbol
        }
        try {
            await axios.post("http://localhost:3001/delete/", user)
                .then((res) => {
                    console.log(res)
                    retrieve()

                })

        }
        catch (error) {
            console.log(error);
        }
        console.log(stockElement)
    }
    //testing purposes only
    function addNewStock() {
        //setStock(stockElement.concat(<Stock name={"RY"} price={"$24.00"} />))
        console.log(stockElement)
        console.log(currentUser.Uid)
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
                        {/*to="/stock-addition" */}
                        <Link to="/stock-addition">
                            <GrAdd className="addition-icon"></GrAdd>
                        </Link>
                    </div>
                </div>
                {stockElement &&
                    <div className="stocks-content-section">
                        {stockElement.map((data, i) => {
                            return (<Stock
                                key={i}
                                Symbol={data.Symbol}
                                buyPrice={data.BuyPrice}
                                buyDate={data.BuyDate}
                                sellPrice={data.SellPrice}
                                sellDate={data.SellDate}
                                deleteEntry={deleteEntry}
                                rerender={retrieve}
                            />);
                        })}
                    </div>

                }
                {stockElement == false &&
                    <div className="empty-stocks-page">
                        <p>NO STOCKS FOR YOU</p>
                    </div>
                }

            </div>

        </div >
    );
}

export default Home;