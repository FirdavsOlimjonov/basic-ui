import React from "react";
import SignComponent from "../../components/sign";
import {ACCESS_TOKEN} from "../../utils/RestContants";
import {useLocation, Navigate} from "react-router-dom";

const SignPage = () => {
    let location = useLocation();
    if (localStorage.getItem(ACCESS_TOKEN)) {
        return <Navigate
            to="/order"
            state={{from: location}}
            replace/>;
    } else {
        return (
            <SignComponent/>
        );
    }
}
export default SignPage;