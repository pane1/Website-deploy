import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

import "./SearchPage.css"

function SearchPage(props) {
    return (
        <div className="search-container">
            <div className="search-area">
                <div className="search-space">

                </div>
                <input className="search-bar" placeholder="Search for a stock"></input>
                <div className="search-button" onClick={() => { alert("hi") }}>
                    <FiSearch className="search-icon"></FiSearch>
                </div>

            </div>
            <div className="search-result-container">
                <div className="serach-result-info">
                    <p>Search result</p>
                </div>
            </div>

        </div>
    );
}

export default SearchPage;