import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Col, Row} from "reactstrap";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../../utils/RestContants";
import sidebarStyle from "./style.css";

const Sidebar = ({children}) => {
    let navigate = useNavigate();

    const style = {sidebarStyle}

    const logout = () => {
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN);
        navigate('/')
    }
    return (
        <Row className={"row"}>
            <Col md={3} className={"column"}>
                <nav>
                    <div className={"profile"}>
                        <div className={"img"}></div>
                        <div className={"name"}>Yusufbek</div>
                    </div>
                    <ul>
                        <li>
                            <span></span>
                            <Link className={"link"} to="/order" >Buyurtmalar</Link>
                        </li>
                        <li>
                            <span></span>
                            <Link className={"link"} to="/product">Maxsulotlar</Link>
                        </li>
                        <li>
                            <span></span>
                            <Link className={"link"} to="/category">Category</Link>
                        </li>
                        <li>
                            <span></span>
                            <Link className={"link"} to="/promotion">Promotion</Link>
                        </li>
                        <li>
                            <span></span>
                            <Link className={"link"} to="/discount">Discount</Link>
                        </li>
                        <li>
                            <Link
                                onClick={logout}
                            >Logout</Link>
                        </li>
                    </ul>
                </nav>
            </Col>

            <Col md={9} className={"column"}>
                {children}
            </Col>
        </Row>
    );
}

export default Sidebar;