import React, { useState, useRef } from 'react'
import "./UserEntry.css"
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once
import { useEffect } from 'react';

export default function UserEntry({ getUsersValues, closeWindow }) {
    const [isOpen, setIsOpen] = useState(true);

    const [noBuy, setNoBuy] = useState(false);
    const [noSell, setNoSell] = useState(false);

    const [buyHeight, setBuyHeight] = useState(200);
    const [sellHeight, setSellHeight] = useState(200);

    const buyPriceRef = useRef(0);
    const sellPriceRef = useRef(0);

    const [userEntry, setUser] = useState();

    const newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth();
    let year = newDate.getFullYear();
    let today = new Date(year, month, date)

    const [buyDate, setBuyDate] = useState(today);
    const [sellDate, setSellDate] = useState(today);

    function buyDateSelection(selected) {
        setBuyDate(selected)
    }
    function sellDateSelection(selected) {
        setSellDate(selected)
    }
    function toggleBuy() {
        if (buyHeight == 200) {
            setNoBuy(true);
            setBuyHeight(0);
        }
        else if (buyHeight == 0) {
            setNoBuy(false);
            setBuyHeight(200);
        }
    }
    function toggleSell() {
        if (sellHeight == 200) {
            setNoSell(true);
            setSellHeight(0);
        }
        else if (sellHeight == 0) {
            setNoSell(false);
            setSellHeight(200);
        }
    }

    function getUserData() {
        let user = {
            buyPrice: noBuy ? 0 : buyPriceRef.current.value,
            sellPrice: noSell ? 0 : sellPriceRef.current.value,
            buyDate: noBuy ? "N/A" : buyDate,
            sellDate: noSell ? "N/A" : sellDate
        }
        //setUser(user);
        getUsersValues(user)
    }
    return (
        <div className="entry-container">
            <div className="entry-background" onClick={closeWindow}>

            </div>

            <div className="entry-content">
                <div className="stock-details-area">
                    <div className="stock-input-area">
                        <input
                            disabled={noBuy}
                            className="stock-input-form"
                            placeholder="Buy price ($)"
                            ref={buyPriceRef}
                        />
                        <div className="confirm-area">
                            <input
                                className="input-checkbox"
                                type="checkbox"
                                onClick={toggleBuy}
                            />
                            <p className="checkbox-input-text" >If you have not bought the stock yet</p>
                        </div>
                    </div>
                    <div className="stock-input-area">
                        <input
                            disabled={noSell}
                            className="stock-input-form"
                            placeholder="Sell price ($)"
                            ref={sellPriceRef}
                        />
                        <div className="confirm-area">
                            <input
                                className="input-checkbox"
                                type="checkbox"
                                onClick={toggleSell}
                            />
                            <p className="checkbox-input-text">If you have not sold the stock yet</p>
                        </div>
                    </div>
                </div>

                <div className="calendar-area">

                    <div className="calendar-content-area">
                        <InfiniteCalendar
                            className="calendar-content"
                            onSelect={date => buyDateSelection(date)}
                            width={500}
                            height={buyHeight}
                            selected={buyDate ? buyDate : today}
                            maxDate={today}
                        />
                    </div>

                    <div className="calendar-content-area" >

                        <InfiniteCalendar
                            className="calendar-content"
                            onSelect={date => sellDateSelection(date)}
                            width={500}
                            height={sellHeight}
                            selected={sellDate ? sellDate : today}
                            maxDate={today}

                        />
                    </div>

                </div>
                <div className="stock-submitButton-area">
                    <div className="stock-button-area">
                        <button className="stock-button" style={{ marginRight: "10vmin" }} onClick={getUserData}>Save</button>
                        <button className="stock-button" style={{ marginLeft: "10vmin" }} onClick={closeWindow}>Cancel</button>
                    </div>
                </div>
            </div>

        </div >
    )

}
