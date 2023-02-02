import React, { useEffect, useState } from "react";
import { FiEdit3, FiXCircle } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

import "./Stock.css";

import UserEntry from "./UserEntry"

function Stock(props) {


    const [stock, setStock] = useState();
    const [visible, setVis] = useState();
    const { currentUser } = useAuth();

    const newBuyDate = new Date(props.buyDate);
    const buyDateSimpleForm = `${newBuyDate.getDate()}/${newBuyDate.getMonth() + 1}/${newBuyDate.getFullYear()}`;
    const newSellDate = new Date(props.sellDate);
    const selLDateSimpleForm = `${newSellDate.getDate()}/${newSellDate.getMonth() + 1}/${newSellDate.getFullYear()}`;

    const gains = (props.sellPrice == "" ? props.buyPrice : props.sellPrice) - (props.buyPrice == "" ? 0 : props.buyPrice)
    const [gainsColor, setGainsColor] = useState("black")

    useEffect(() => {

        if (gains == 0) {
            setGainsColor("black")
        }
        else if (gains > 0) {
            setGainsColor("green");

        }
        else if (gains < 0) {
            setGainsColor("red");
        }
        //console.log(input)
        //console.log(gainsColor)
        //setStock(input)
    }, [])

    function printData() {
        console.log(props.sellDate);
    }

    function deleteThisEntry() {
        let user = {
            Symbol: props.Symbol
        }
        props.deleteEntry(user)
    }

    function closeWindow() {
        setVis(false);
    };

    function openWindow() {
        setVis(true);
    };

    async function editEntry(userData) {
        try {
            let user = {
                Uid: currentUser.uid,
                Symbol: props.Symbol,
                buyPrice: userData.buyPrice,
                sellPrice: userData.sellPrice,
                buyDate: userData.buyDate == "" ? "N/A" : userData.buyDate,
                sellDate: userData.sellDate == "" ? "N/A" : userData.sellDate,
            };

            await axios.post("http://localhost:3001/update/", user)
                .then((res) => {
                    console.log(res.data);
                })
            props.rerender();
            closeWindow();
        }
        catch (error) {
            console.log("Couldn't edit entry");
        }
    };
    return (
        <div className="stock-container">
            <div className="stock-name-section" onClick={printData}>
                <p className="stock-name">
                    {props.Symbol}
                </p>
            </div>
            <div className="stock-content-section">
                <div className="stock-text-area" style={{ borderTop: "4px solid #dddddd", marginTop: "2vmin" }}>
                    <p className="stock-text">Buy Price : {props.buyPrice == "" ? "N/A" : ("$" + props.buyPrice)}</p>
                    <p className="stock-text">Sell Price : {props.sellPrice == "" ? "N/A" : ("$" + props.sellPrice)}</p>

                </div>
                <div className="stock-text-area">
                    <p className="stock-text" style={{ color: gainsColor }}>Gain/Loss :
                        {
                            " $ " + ((props.sellPrice == "" ? props.buyPrice : props.sellPrice) - (props.buyPrice == "" ? 0 : props.buyPrice))

                        }
                    </p>
                </div>
                <div className="stock-text-area">
                    <p className="stock-text" >Buy Date : {buyDateSimpleForm}</p>
                </div>
                <div className="stock-text-area" >
                    <p className="stock-text" >Sell Date : {selLDateSimpleForm}</p>
                </div>
            </div>
            <div className="stock-edit-section">
                <div className="stock-element-edit-options" onClick={openWindow}>
                    <FiEdit3 className="stock-option-icon"></FiEdit3>
                    <p className="stock-option-text">Edit</p>
                </div>
                <div className="stock-element-edit-options" onClick={deleteThisEntry}>
                    <FiXCircle className="stock-option-icon"></FiXCircle>
                    <p className="stock-option-text">Delete</p>
                </div>
            </div>
            {visible &&
                <UserEntry getUsersValues={editEntry} closeWindow={closeWindow} />

            }


        </div >
    );
}

export default Stock;