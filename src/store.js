import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  actions: {
    login(context, token) {
      context.commit("LOGIN", token);
    },
    logout(context) {
      context.commit("LOGOUT");
    }
  },
  mutations: {
    LOGIN(state, token) {
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
  modules: {}
});
