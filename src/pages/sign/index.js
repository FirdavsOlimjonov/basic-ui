import React from "react";
import {ACCESS_TOKEN} from "../../utils/RestContants";
import {useLocation, Navigate, Link} from "react-router-dom";
import SignComponent from "../../components/sign";
import SocialLogin from "../../components/socialLogin";
import './index.css'


const SignPage = () => {
    let location = useLocation();
    if (localStorage.getItem(ACCESS_TOKEN)) {
        return <Navigate
            to="/order"
            state={{from: location}}
            replace/>;
    } else {
        return (
            <>
                <div className="login-container">
                    <div className="login-content">
                        <h1 className="login-title">Login to SpringSocial</h1>
                        <SocialLogin />
                        <div className="or-separator">
                            <span className="or-text">OR</span>
                        </div>
                        <SignComponent/>
                    </div>
                </div>
            </>
        );
    }
}
export default SignPage;