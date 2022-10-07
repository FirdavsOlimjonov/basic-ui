import React, {useState} from 'react';
import {Col, Row} from "reactstrap";
import axios from "axios";
import {ACCESS_TOKEN,REFRESH_TOKEN} from "../../utils/RestContants";
import {useNavigate} from "react-router-dom";

const SignComponent = () => {
    const [phoneNumber, setPhoneNumber] = useState('+998');
    const [password, setPassword] = useState();

    const setPhone = (e) => setPhoneNumber(e.target.value);
    const setPass = (e) => setPassword(e.target.value);
    const navigate = useNavigate();


    let obj = {
        password, phoneNumber
    };
    const signIn = () => {
        axios
            .post('http://localhost/api/auth/v1/auth/sign-in', obj)
            .then(res => {
                    let data = res.data.data;
                    localStorage.setItem(
                        ACCESS_TOKEN,
                        data.tokenType + data.accessToken);
                    localStorage.setItem(
                        REFRESH_TOKEN,
                        data.refreshToken);
                    navigate('/order')
                }
            ).catch(err => console.log(err))
    }
    return (
        <Row>
            <Col md={8}>
                <img src="../../assets/images/SignIn.png" alt=""/>
            </Col>
            <Col md={4}>
                <h4>Please login</h4>
                <input
                    id="phoneNumber"
                    type="text"
                    onChange={setPhone}
                    placeholder="Enter phone number"
                    name="phoneNumber"
                    required={true}
                />
                <br/>
                <input
                    id="password"
                    type="password"
                    onChange={setPass}
                    placeholder="Enter password"
                    name="password"
                    required={true}
                />
                <br/>
                <button
                    onClick={signIn}
                    type={"button"}>Sign In
                </button>
            </Col>

        </Row>
    );
}

export default SignComponent;