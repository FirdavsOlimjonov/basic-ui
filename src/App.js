import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import SignPage from "./pages/sign";
import Home from "./pages/home";
import OrderPage from "./pages/order/OrderPage";
import CategoryPage from "./pages/category";
import ProductPage from "./pages/product";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Promotion from "./pages/promotion";
import Discount from "./pages/discount";
import Chat from "./pages/chat";
import Alert from 'react-s-alert'
import Oauth2Handler from "./pages/oauth2Handler";
import Cabinet from "./pages/cabinet";


const App = () => {
    const bla = {
        path: "/",
        element: <Home/>
    };
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/sign",
            element: <SignPage/>
        },
        {
            path: "/order",
            element: <OrderPage/>
        },
        {
            path: "/category",
            element: <CategoryPage/>
        },
        {
            path: "/product",
            element: <ProductPage/>
        },
        {
            path: "/promotion",
            element: <Promotion/>
        },
        {
            path: "/discount",
            element: <Discount/>
        },
        {
            path: "/chat",
            element: <Chat/>
        },
        {
            path: "/oauth2/redirect",
            element: <Oauth2Handler/>
        },
        {
            path: "/cabinet",
            element: <Cabinet/>
        }
    ]);

    return (
        <>
            <RouterProvider
                router={router}
            />
            <Alert stack={{limit: 3}}
                   timeout={3000}
                   position='top-right' effect='slide' offset={65}/>
            {/*<ToastContainer/>*/}
        </>
    );
}

export default App;
