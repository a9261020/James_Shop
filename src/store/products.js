import Vue from "vue";
Vue;
import axios from "axios";

export default {
  // namespaced 很重要
  namespaced: true,
  state: {
    products: []
  },
  actions: {
    getProducts(context) {
      context.commit("GETPRODUCTS");
    }
  },
  mutations: {
    GETPRODUCTS(state) {
      axios.get("http://localhost:5000/api/getProducts").then(res => {
        state.products = res.data;
      });
    }
  },
  getters: {
    products: state => state.products
  }
};
