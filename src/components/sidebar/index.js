import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Col, Row} from "reactstrap";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../../utils/RestContants";
import sidebarStyle from "./style.css";

const Sidebar = ({children, currentUser}) => {
    let navigate = useNavigate();


    const logout = () => {
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN);
        navigate('/')
    }
    return (
        <Row className={"row"} style={{"marginTop": "20px"}}>
            <Col md={3}>
                <nav>
                    <div className={"profile"}>
                        <div className={"img"}></div>
                        <div className={"name"}>Yusufbek</div>
                    </div>
                    <Link to="/cabinet" className="link">Cabinet</Link>
                    <ul>
                        {currentUser?.pages?.map(page =>
                            <li>
                                <span></span>
                                <Link to={`/${page.toLowerCase()}`} className="link">{page}</Link>
                            </li>
                        )}
                        <Link
                            onClick={logout}
                        >Logout</Link>
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