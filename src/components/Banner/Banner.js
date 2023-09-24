import React from "react";
import "./Banner.css";
import "tailwindcss/tailwind.css";
import banner from "../assets/banner.jpg";

const Banner = () => {
    return(
        <div className="banner">
            <img src={banner} alt="banner" />
            <h1>NEW SEASON ARRIVALS</h1>
            <p>CHECK OUT ALL TRENDS</p>
        </div>
    )
}

export default Banner;
