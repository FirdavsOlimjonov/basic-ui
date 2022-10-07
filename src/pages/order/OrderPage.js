import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import {ACCESS_TOKEN} from "../../utils/RestContants";
import OrderComponent from "../../components/order";
import Layout from "../../components/layout";

const OrderPage = () => {
        return (
           <Layout>
               <OrderComponent/>
           </Layout>
        );
}

export default OrderPage;