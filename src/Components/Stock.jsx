import React, { useEffect, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import "./Stock.css"

function Stock(props) {
    const [contentDisplay, setDisplay] = useState({
        down: "inline",
        up: "None",
        content: '0',
        details: 'auto'
    })

    function changeDisplay() {
        if (contentDisplay.down == "None") {
            setDisplay({
                down: "inline",
                up: "None",
                content: "0"
            })
        }
        else {
            setDisplay({
                down: "None",
                up: "inline",
                content: '25vh'
            })
        }
    };

    return (
        <div className="stock-container">
            <div className="stock-name-section">
                <p className="stock-name">
                    {props.name}
                </p>
            </div>
            <div className="stock-content-section" style={{ height: contentDisplay.content }}>

            </div>
            <div className="stock-details-section" onClick={changeDisplay}>
                <div className="collapse-button">
                    <p className="stock-details">
                        <AiFillCaretDown display={contentDisplay.down} />
                        <AiFillCaretUp display={contentDisplay.up} />
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Stock;