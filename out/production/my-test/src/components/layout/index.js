import React from "react";
import Sidebar from "../sidebar";
import {Navigate, useLocation} from "react-router-dom";
import {ACCESS_TOKEN} from "../../utils/RestContants";

const Layout=({children})=>{
    let location = useLocation();
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return <Navigate
            to="/sign"
            state={{from: location}}
            replace/>;
    } else {
        return (
            <Sidebar
                children={children}/>
        );
    }
}

export default Layout;