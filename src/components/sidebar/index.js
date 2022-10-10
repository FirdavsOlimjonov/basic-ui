import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Col, Row} from "reactstrap";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../../utils/RestContants";

const Sidebar = ({children}) => {
    let navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN);
        navigate('/')
    }
    return (
        <Row style={{"marginTop":"20px"}}>
            <Col md={3}>
                <nav>
                    <ul>
                        <li>
                            <Link to="/order">Buyurtmalar</Link>
                        </li>
                        <li>
                            <Link to="/product">Maxsulotlar</Link>
                        </li>
                        <li>
                            <Link to="/category">Category</Link>
                        </li>
                        <li>
                            <Link
                                onClick={logout}
                            >Logout</Link>
                        </li>
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