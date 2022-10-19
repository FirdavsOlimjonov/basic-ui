import React, {useState} from 'react';
import axios from "axios";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../../utils/RestContants";
import {useNavigate} from "react-router-dom";
import {SIGN_IN_PATH} from "../../utils/api";
import '../../pages/sign/index.css'

const SignComponent = () => {
    const [phoneNumber, setPhoneNumber] = useState('+998');
    const [password, setPassword] = useState();

    const setPass = (e) => setPassword(e.target.value);
    const navigate = useNavigate();


    const signIn = () => {
        axios
            .post(
                SIGN_IN_PATH,
                {password, phoneNumber}
            )
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
        <>
            <div className="form-item">
                <input type="email"
                       name="email"
                       placeholder="Enter phone number"
                       onChange={(e) => setPhoneNumber(e.target.value)}
                       className="form-control"
                       value={phoneNumber}
                       required/>
            </div>
            <div className="form-item">
                <input
                    type="password"
                    name="password"
                    className="form-control" placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <div className="form-item">
                <button
                    onClick={signIn}
                    className="btn btn-block btn-primary">Login
                </button>
            </div>
        </>
    );
}

export default SignComponent;