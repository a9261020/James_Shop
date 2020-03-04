import Vue from "vue";
import VueRouter from "vue-router";

import Login from "./views/Login";
import Signup from "./views/Signup";

// 後端
import Dashbaord from "./views/Dashboard";
import CouponsManage from "./views/Admin/CouponsManage";
import OrdersManage from "./views/Admin/OrdersManage";
import ProductsManage from "./views/Admin/ProductsManage";
import MessagesManage from "./views/Admin/MessagesManage";
import UsersManage from "./views/Admin/UsersManage";

// 前端
import Layout from "./views/Layout";
import Home from "./views/Front/Home";
import ProductsList from "./views/Front/ProductsList";
import Product from "./views/Front/Product";
import CreateOrder from "./views/Front/CreateOrder";
import CouponGame from "./views/Front/CouponGame";
import Contact from "./views/Front/Contact";
import Order from "./views/Front/Order";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: "*", redirect: "/" },
    { path: "/login", component: Login },
    { path: "/signup", component: Signup },
    {
      // 後端
      path: "/dashboard",
      name: "Dashboard",
      component: Dashbaord,
      children: [
        {
          path: "couponsmanage",
          component: CouponsManage
        },
        {
          path: "ordersmanage",
          component: OrdersManage
        },
        {
          path: "productsmanage",
          component: ProductsManage
        },
        {
          path: "messagesmanage",
          component: MessagesManage
        },
        {
          path: "usersmanage",
          component: UsersManage
        }
      ]
    },
    {
      // 前端
      path: "/",
      component: Layout,
      children: [
        {
          path: "/",
          name: "Home",
          component: Home
        },
        {
          path: "productslist",
          name: "ProductsList",
          component: ProductsList
        },
        {
          path: "productslist/:productId",
          name: "Product",
          component: Product
        },
        {
          path: "createorder",
          name: "CreateOrder",
          component: CreateOrder
        },
        {
          path: "coupongame",
          name: "CouponGame",
          component: CouponGame
        },
        {
          path: "contact",
          name: "Contact",
          component: Contact
        },
        {
          path: "order",
          name: "Order",
          component: Order
        }
      ]
    }
  ]
});
