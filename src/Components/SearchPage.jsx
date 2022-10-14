import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { GrAdd } from "react-icons/gr";

import "./SearchPage.css"

function SearchPage(props) {
    useEffect(() => {
        document.title = "Search page"
    });
    return (
        <div className="search-container">
            <div className="search-content">
                <div className="search-area">

                    <input className="search-bar" placeholder="Search for a stock"></input>
                    <div className="search-button" onClick={() => { alert("hi") }}>
                        <FiSearch className="search-icon"></FiSearch>
                    </div>

                </div>
                <div className="search-result-area">

                </div>

            </div>
        </div>
    );
}

export default SearchPage;