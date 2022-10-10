import React from "react";
import {Link} from "react-router-dom";
import Style from "./index.css";
import image from "../../assets/images/osh.jpg"

const Home = () => {
    return (
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/sign">Sign</Link>
                    </li>
                    <li>
                        <Link to="/order">Order</Link>
                    </li>
                </ul>
            </nav>
    );
}

export default Home;