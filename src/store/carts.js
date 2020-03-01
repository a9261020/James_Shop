import axios from "axios";

export default {
  namespaced: true,
  state: {
    carts: [],
    cartsLength: 0,
    isCartShow: false
  },
  actions: {
    getCart(context) {
      const url = "http://localhost:5000/api/getCarts/";
      axios.get(url).then(res => {
        let nowUserId = sessionStorage.getItem("userId");
        let cart = res.data.data;
        let cartLength;
        cart.forEach(item => {
          if (item.userId == nowUserId) {
            cart = item;
          }
        });
        if (cart.carts === undefined) {
          cartLength = 0;
        } else {
          cartLength = cart.carts.length;
        }
        context.commit("CART", cart);
        context.commit("CART_LENGTH", cartLength);
      });
    },
    addToCart(context, { userId, _id, qty }) {
      const cart = {
        userId: userId,
        product_id: _id,
        qty
      };
      const url = "http://localhost:5000/api/getCarts/";
      context.commit("LOADING", true, { root: true });
      axios.post(url, cart).then(res => {
        if (res) {
          const cart = res.data.cart;
          context.commit("ADD_TO_CART", cart);
          context.dispatch("getCart");
          // 新增成功，跳出提示訊息
          context.dispatch(
            "alertMessageModules/updateMessage",
            { message: res.data.message, status: "success" },
            { root: true }
          );
        } else {
          // 新增失敗，跳出提示訊息
          context.dispatch(
            "alertMessageModules/updateMessage",
            { message: res.data.message, status: "danger" },
            { root: true }
          );
        }
        context.commit("LOADING", false, { root: true });
      });
    },
    removeCartItem(context, _id) {
      const url = `http://localhost:5000/api/getCarts/${_id}`;
      let nowUserId = sessionStorage.getItem("userId");
      context.commit("LOADING", true, { root: true });
      axios.post(url, { nowUserId }).then(res => {
        if (res) {
          context.commit("LOADING", false, { root: true });
          context.dispatch("getCart");
          context.dispatch(
            "alertMessageModules/updateMessage",
            { message: res.data.message, status: "warning" },
            { root: true }
          );
        }
      });
    }
  },
  mutations: {
    CART(state, cart) {
      state.carts = cart;
    },
    CART_LENGTH(state, length) {
      state.cartsLength = length;
    },
    ADD_TO_CART(state, cart) {
      state.carts = cart;
    }
  },
  getters: {
    carts(state) {
      return state.carts;
    },
    cartsLength(state) {
      return state.cartsLength;
    },
    isCartShow(state) {
      return state.isCartShow;
    }
  }
};
