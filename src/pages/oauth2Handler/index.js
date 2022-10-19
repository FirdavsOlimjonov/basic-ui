import React, {useEffect} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../../utils/RestContants";

const Oauth2Handler = () => {
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    let location = useLocation();


    const access = useQuery().get("accessToken");
    const refresh = useQuery().get("refreshToken");


        if (access) {
            localStorage.setItem(ACCESS_TOKEN, access)
            localStorage.setItem(REFRESH_TOKEN, refresh);
            return <Navigate
                to="/"
                state={{from: location}}
                replace/>;
        }

}

export default Oauth2Handler;