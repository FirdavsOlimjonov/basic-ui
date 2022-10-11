import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Col, Row} from "reactstrap";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../../utils/RestContants";

const Sidebar = ({children, currentUser}) => {
    let navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN);
        navigate('/')
    }
    return (
        <Row style={{"marginTop": "20px"}}>
            <Col md={3}>
                <nav>
                    <ul>
                        {currentUser?.pages?.map(page =>
                            <li>
                                <Link to={`/${page.toLowerCase()}`}>{page}</Link>
                            </li>
                        )}
                        <Link
                            onClick={logout}
                        >Logout</Link>
                    </ul>
                </nav>
            </Col>

            <Col md={9}>
                {children}
            </Col>
        </Row>
    );
}

export default Sidebar;