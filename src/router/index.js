import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Ad from "@/components/Ads/Ad";
import List from "@/components/Ads/AdList";
import New from "@/components/Ads/NewAd";
import Login from "@/components/Auth/Login";
import Registration from "@/components/Auth/Registration";
import Orders from "@/components/User/Orders";
import authGuard from "./authGuard";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/ad/:id",
      props: true,
      name: "ad",
      component: Ad,
    },
    {
      path: "/list",
      name: "adList",
      component: List,
      beforeEnter: authGuard,
    },
    {
      path: "/new",
      name: "newAd",
      component: New,
      beforeEnter: authGuard,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/registration",
      name: "registration",
      component: Registration,
    },
    {
      path: "/orders",
      name: "orders",
      component: Orders,
      beforeEnter: authGuard,
    },
  ],
  mode: "history",
});
