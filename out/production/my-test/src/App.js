import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import SignPage from "./pages/sign";
import Home from "./pages/home";
import OrderPage from "./pages/order/OrderPage";
import CategoryPage from "./pages/category";
import ProductPage from "./pages/product";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Promotion from "./pages/promotion";
import Discount from "./pages/discount";


const App = () => {
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
        }
    ]);

    return (
        <>
            <RouterProvider
                router={router}
            />
            <ToastContainer/>
        </>
    );
}

export default App;