import Vue from "vue";
import Vuex from "vuex";

import productsModules from "./store/products";
import alertMessageModules from "./store/alertMessage";
import favoritesModules from "./store/favorites";
import cartsModules from "./store/carts";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  actions: {
    login(context, { token, userId }) {
      context.commit("LOGIN", { token, userId });
    },
    logout(context) {
      context.commit("LOGOUT");
    }
  },
  mutations: {
    LOGIN(state, { token, userId }) {
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("isLogin", true);
      state.isLogin = true;
    },
    LOGOUT(state) {
      sessionStorage.clear();
      state.isLogin = false;
    }
  },
  getters: {
    getisLogin(state) {
      return state.isLogin;
    }
  },
  modules: {
    productsModules,
    alertMessageModules,
    favoritesModules,
    cartsModules
  }
});
