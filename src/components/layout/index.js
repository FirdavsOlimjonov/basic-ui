import React, {useEffect, useState} from "react";
import Sidebar from "../sidebar";
import {Navigate, useHistory, useLocation, useNavigate} from "react-router-dom";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../../utils/RestContants";
import axios from "axios";
import {GET_CURRENT_USER_PATH, REFRESH_TOKEN_PATH} from "../../utils/api";
import CurrentUserContext from "../../utils/CurrentUserContext";

const Layout = ({children}) => {
    //user me
    const [currentUser, setCurrentUser] = useState({pages: []});
    let navigate = useNavigate();
    const getCurrentUser = () => {
        if (localStorage.getItem(ACCESS_TOKEN))
            axios
                .get(
                    GET_CURRENT_USER_PATH,
                    {
                        headers: {
                            Authorization: localStorage.getItem(ACCESS_TOKEN)
                        }
                    }).then(res => setCurrentUser(res.data.data))
                .catch(err => {
                    axios.get(
                        REFRESH_TOKEN_PATH,
                        {
                            headers: {
                                Authorization: localStorage.getItem(ACCESS_TOKEN),
                                RefreshToken: localStorage.getItem(REFRESH_TOKEN),
                            }
                        }
                    ).then(res => {
                        localStorage.setItem(ACCESS_TOKEN, res.data.data.tokenType + res.data.data.accessToken);
                        localStorage.setItem(REFRESH_TOKEN, res.data.data.refreshToken);
                        getCurrentUser();
                    }).catch(err => {
                        localStorage.removeItem(ACCESS_TOKEN);
                        localStorage.removeItem(REFRESH_TOKEN);
                        navigate('/')
                    })
                })
    }

    useEffect(() => {
        getCurrentUser();
    }, []);

    let location = useLocation();
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return <Navigate
            to="/sign"
            state={{from: location}}
            replace/>;
    } else {
        return (
            <CurrentUserContext.Provider value={{currentUser}}>
                <Sidebar
                    children={children}
                    currentUser={currentUser}
                />
            </CurrentUserContext.Provider>
        );
    }
}

export default Layout;