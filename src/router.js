import Vue from "vue";
import VueRouter from "vue-router";

import Login from "./views/Login";
import Signup from "./views/Signup";

// 後端
import Dashbaord from "./views/Dashboard";
import CouponsManage from "./views/Admin/CouponsManage";
import OrdersManage from "./views/Admin/OrdersManage";
import ProductsManage from "./views/Admin/ProductsManage";

// 前端
import Layout from "./views/Layout";
import Home from "./views/Front/Home";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
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
        }
      ]
    }
  ]
});
