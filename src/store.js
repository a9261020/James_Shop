import Vue from "vue";
import Vuex from "vuex";

import productsModules from "./store/products";
import alertMessageModules from "./store/alertMessage";
import favoritesModules from "./store/favorites";
import cartsModules from "./store/carts";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: {},
    isLoading: false
  },
  actions: {
    login(context, { token, userId, user }) {
      context.commit("LOGIN", { token, userId, user });
    },
    logout(context) {
      context.commit("LOGOUT");
    },
    // isLoading
    updateLoading(context, status) {
      context.commit("LOADING", status);
    }
  },
  mutations: {
    LOGIN(state, { token, userId, user }) {
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("isLogin", true);
      state.isLogin = true;
      state.user = user;
    },
    LOGOUT(state) {
      sessionStorage.clear();
      state.isLogin = false;
    },
    LOADING(state, status) {
      state.isLoading = status;
    }
  },
  getters: {
    getisLogin(state) {
      return state.isLogin;
    },
    isLoading(state) {
      return state.isLoading;
    },
    getUser(state) {
      return state.user;
    }
  },
  modules: {
    productsModules,
    alertMessageModules,
    favoritesModules,
    cartsModules
  }
});
